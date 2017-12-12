import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as ArticlesState from '../store/Articles';


// At runtime, Redux will merge together...
type NewArticleProps =
    ArticlesState.ArticlesState        // ... state we've requested from the Redux store
    & typeof ArticlesState.actionCreators;      // ... plus action creators we've requested

class NewArticle extends React.Component<NewArticleProps, {}> {

    public render() {
        return (
            <div>
                <h1>Новая статья</h1>
                <label> Название:
                    <input type='text' />
                </label>
                <label> Текст:
                    <textarea rows={40} cols={90} />
                </label>
                <button onClick={this.handleSave}>Save</button>
            </div>
        );
    }
    
    private handleSave = () =>{
        
    }
}

export default connect(
    (state: ApplicationState) => state.articles, // Selects which state properties are merged into the component's props
    ArticlesState.actionCreators                  // Selects which action creators are merged into the component's props
)(NewArticle) as any; //as typeof NewArticle;
