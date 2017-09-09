import { createStructuredSelector } from 'reselect';

const REDUCER = 'Categories';

const categoriesList = state => state[REDUCER].categoriesList;
const categoriesFormFields = state => state[REDUCER].categoriesFormFields;

export default createStructuredSelector({
    categoriesList,
    categoriesFormFields
});