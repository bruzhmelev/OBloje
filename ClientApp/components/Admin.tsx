import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import NewArticle from "./NewArticle";


// At runtime, Redux will merge together...
type AdminProps = RouteComponentProps<{ }>; // ... plus incoming routing parameters

export default class Admin extends React.Component<AdminProps, {}> {

    public render() {
        return ( 
            <div>
                <NewArticle />
            </div>
        );
    }
}
