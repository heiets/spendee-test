import { createStructuredSelector } from 'reselect';

const REDUCER = 'Customers';

const customersList = state => state[REDUCER].customersList;
const customersFormFields = state => state[REDUCER].customersFormFields;

export default createStructuredSelector({
    customersList,
    customersFormFields
});