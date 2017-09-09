import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import configureStore from './store/configureStore';

import Incomes from './containers/Incomes/Incomes';
import Spending from './containers/Spending/Spending';
import Categories from './containers/Categories/Categories';
import InvoiceCreate from './containers/InvoiceCreate/InvoiceCreate';
import Home from './containers/Home/Home';


export const store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Home}>
                <IndexRoute component={Incomes} />
                <Route path="/create-invoice" component={InvoiceCreate}/>
                <Route path="/spending" component={Spending}/>
                <Route path="/categories" component={Categories}/>
                {/*<Route path="/customers" component={Customers}/>*/}
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root'),
);