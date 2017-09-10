import { createStructuredSelector } from 'reselect';

const REDUCER = 'Spending';

const spendingList = state => state[REDUCER].spendingList;
const categoriesList = state => state[REDUCER].categoriesList;
const spendingFormFields = state => state[REDUCER].spendingFormFields;

export default createStructuredSelector({
    spendingList,
    categoriesList,
    spendingFormFields
});