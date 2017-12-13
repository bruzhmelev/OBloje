import * as React from 'react';
import {ChangeEventHandler} from "react";


// type InputProps =
//     ArticlesState.ArticlesState;
type InputProps = {
    type: string,
    onChange: () => any
}

export default class Input extends React.Component<InputProps, {}> {
    
    
    render () {
        return <input type={this.props.type} onChange={this.props.onChange}/>
    }
}