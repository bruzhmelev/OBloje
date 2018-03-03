import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as ArticlesState from '../store/Articles';
import {Article} from '../store/Articles';
import Input from "./Primiteves/Input";


// At runtime, Redux will merge together...
type NewArticleProps =
typeof ArticlesState.actionCreators;      // ... plus action creators we've requested

interface NewArticleState {
    title: string;
    text: string;
}

class NewArticle extends React.Component<NewArticleProps, NewArticleState> {

    state = {
        title: "",
        text: ""
    };
    
    public render() {
        return (
            <form>
                <h2>Новая статья</h2>
                <div className="form-group">
                    <label htmlFor="article-name">Название</label>
                    <input id='article-name' className='form-control' type='text' value={this.state.title} onChange={this.handleTitleChange}/>
                </div>
                <div className="form-group">
                    <label>Текст</label>
                    <textarea className='form-control' rows={40} cols={90} value={this.state.text} onChange={this.handleTextChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.handleSave}>Save</button>
            </form>
        );
    }
    
    private handleSave = () =>{
        this.props.addNewArticle(
            new Article(this.state.title, this.state.text)
        );
        this.setState({title: "", text: ""})
    }

    private handleTitleChange = (ev:any) =>{
        //TODO: обернуть input в свой Input, чтобы инкапсулировать Валидацию, работу с ev, кастомизировать возвращаемые объекты на события onChange
        this.setState({title: ev.target.value});
    }

    private handleTextChange = (ev:any) =>{
        this.setState({text: ev.target.value});
    }
}

export default connect(
    null, // Selects which state properties are merged into the component's props
    ArticlesState.actionCreators                  // Selects which action creators are merged into the component's props
)(NewArticle) as any; //as typeof NewArticle;
