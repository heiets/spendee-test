/** **********************************************
 * Add all reducers to this file for combine it. *
 *************************************************/

import { combineReducers } from 'redux';

import Main from './containers/Main/reducers';
import Incomes from './containers/Incomes/reducers';
import Spending from './containers/Spending/reducers';
import Categories from './containers/Categories/reducers';

const rootReducer = combineReducers({
    Main,
    Incomes,
    Spending,
    Categories
});

export default rootReducer;
