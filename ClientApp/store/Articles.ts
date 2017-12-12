import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ArticlesState {
    isLoading: boolean;
    isLoaded: boolean;
    articles: Article[];
    newArticle: Article | null;
}

export interface Article {
    id: number;
    title: string;
    text: string;
    createDateTime: Date;
}




// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestArticlesAction {
    type: 'REQUEST_ARTICLES__START';
}

interface AddNewArticleAction {
    type: 'ADD_NEW_ARTICLE__START';
}

interface RequestArticlesActionSuccess {
    type: 'REQUEST_ARTICLES__SUCCESS';
    articles: Article[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestArticlesAction | RequestArticlesActionSuccess;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestArticles: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        
        if (!getState().articles.isLoaded) {
            let fetchTask = fetch(`api/Article/Article`)
                .then(response => response.json() as Promise<Article[]>)
                .then(data => {
                    dispatch({ type: 'REQUEST_ARTICLES__SUCCESS', articles: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_ARTICLES__START' });
        }
    },
    addNewArticle: () => <AddNewArticleAction>{ type: 'ADD_NEW_ARTICLE__START' },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ArticlesState = { articles: [], isLoading: false, isLoaded: false , newArticle: null};

export const reducer: Reducer<ArticlesState> = (state: ArticlesState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_ARTICLES__START':
            return {
                articles: state.articles,
                isLoading: true,
                isLoaded: false,
                newArticle: state.newArticle
            };
        case 'REQUEST_ARTICLES__SUCCESS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                articles: action.articles,
                isLoading: false,
                isLoaded: true,
                newArticle: state.newArticle
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
