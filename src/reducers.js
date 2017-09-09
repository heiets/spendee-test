/** **********************************************
 * Add all reducers to this file for combine it. *
 *************************************************/

import { combineReducers } from 'redux';

import Incomes from './containers/Incomes/reducers';
import Spending from './containers/Spending/reducers';
import Categories from './containers/Categories/reducers';
import InvoiceCreate from './containers/InvoiceCreate/reducers';

const rootReducer = combineReducers({
    Incomes,
    Spending,
    Categories,
    InvoiceCreate
});

export default rootReducer;
