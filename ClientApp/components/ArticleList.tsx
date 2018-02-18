import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as ArticlesState from '../store/Articles';
import { Highlight } from 'react-highlight';
// var Highlight = require('react-highlight');


// At runtime, Redux will merge together...
type ArticleListProps =
    ArticlesState.ArticlesState        // ... state we've requested from the Redux store
    & typeof ArticlesState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ }>; // ... plus incoming routing parameters

class ArticleList extends React.Component<ArticleListProps, {}> {
    componentWillMount() {
        this.props.requestArticles();
    }

    public render() {
        return (
            <div>
                <h1>Статьи</h1>
                <p>Я сделяль...</p>
                { this.renderArticles() }
            </div>
        ); 
    }
    
    private renderArticles() {
        return this.props.articles.map(a => (
            <div key={a.id}>
                <h2>{a.title} </h2>
                <p>{a.createDateTime} </p>
                <p>{a.text} </p>
                <Highlight className='js'>{"var test = 'hello'"}</Highlight>
            </div>
        ));
    }
}

export default connect(
    (state: ApplicationState) => state.articles, // Selects which state properties are merged into the component's props
    ArticlesState.actionCreators                  // Selects which action creators are merged into the component's props
)(ArticleList) as typeof ArticleList;
