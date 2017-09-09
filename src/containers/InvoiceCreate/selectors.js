import { createStructuredSelector } from 'reselect';

const REDUCER = 'InvoiceCreate';

const invoiceCreateProductsList = state => state[REDUCER].invoiceCreateProductsList;
const invoiceCreateCustomersList = state => state[REDUCER].invoiceCreateCustomersList;
const invoiceCreateFormFields = state => state[REDUCER].invoiceCreateFormFields;

export default createStructuredSelector({
    invoiceCreateProductsList,
    invoiceCreateCustomersList,
    invoiceCreateFormFields
});