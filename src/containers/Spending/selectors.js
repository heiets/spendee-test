import { createStructuredSelector } from 'reselect';

const REDUCER = 'Spending';

const spendingList = state => state[REDUCER].spendingList;
const spendingFormFields = state => state[REDUCER].spendingFormFields;

export default createStructuredSelector({
    spendingList,
    spendingFormFields
});