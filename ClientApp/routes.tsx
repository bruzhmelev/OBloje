import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
import ArticleList from './components/ArticleList';
import Admin from './components/Admin';

export const routes = 
<Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata/:startDateIndex?' component={ FetchData } />
    <Route path='/articles/' component={ ArticleList } />
    <Route path='/admin/' component={ Admin } />
</Layout>;
