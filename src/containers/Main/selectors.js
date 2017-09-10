import { createStructuredSelector } from 'reselect';

const REDUCER = 'Main';

const selectedCategory = state => state[REDUCER].selectedCategory;
const incomesList = state => state[REDUCER].incomesList;
const spendingList = state => state[REDUCER].spendingList;
const categoriesList = state => state[REDUCER].categoriesList;

export default createStructuredSelector({
    selectedCategory,
    incomesList,
    spendingList,
    categoriesList
});