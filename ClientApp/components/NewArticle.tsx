import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as ArticlesState from '../store/Articles';
import {Article} from '../store/Articles';
import Input from "./Primiteves/Input";


// At runtime, Redux will merge together...
type NewArticleProps =
    ArticlesState.ArticlesState        // ... state we've requested from the Redux store
    & typeof ArticlesState.actionCreators;      // ... plus action creators we've requested

class NewArticle extends React.Component<NewArticleProps, {}> {

    state = {
        title: "",
        text: ""
    };
    
    public render() {
        return (
            <div>
                <h1>Новая статья</h1>
                <label> Название:
                    <input type='text' onChange={this.handleTitleChange}/>
                </label>
                <label> Текст:
                    <textarea rows={40} cols={90} onChange={this.handleTextChange}/>
                </label>
                <button onClick={this.handleSave}>Save</button>
            </div>
        );
    }
    
    private handleSave = () =>{
        this.props.addNewArticle(
            new Article(this.state.title, this.state.text)
        );
    }

    private handleTitleChange = (ev:any) =>{
        //TODO: Как обернуть input в свой Input, чтобы инкапсулировать Валидацию, работу с ev, кастомизировать возвращаемые объекты на события onChange
        this.setState({title: ev.target.value});
    }

    private handleTextChange = (ev:any) =>{
        this.setState({text: ev.target.value});
    }
}

export default connect(
    (state: ApplicationState) => state.articles, // Selects which state properties are merged into the component's props
    ArticlesState.actionCreators                  // Selects which action creators are merged into the component's props
)(NewArticle) as any; //as typeof NewArticle;
