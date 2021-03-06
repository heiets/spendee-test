import { createStructuredSelector } from 'reselect';

const REDUCER = 'Incomes';

const incomesList = state => state[REDUCER].incomesList;
const categoriesList = state => state[REDUCER].categoriesList;
const incomesFormFields = state => state[REDUCER].incomesFormFields;

export default createStructuredSelector({
    incomesList,
    categoriesList,
    incomesFormFields
});