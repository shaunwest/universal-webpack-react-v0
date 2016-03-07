import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Main from './main';
import Home from './home';
import Foo from './foo';
import NoMatch from './nomatch';

export const routes = (
    <Route path='/' component={ Main }>
        <IndexRoute component={ Home } />
        <Route path='home' component={ Home } />
        <Route path='foo' component={ Foo } />
    </Route>
);
