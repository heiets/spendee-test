import { combineReducers } from 'redux';

const initialState = {
    invoiceCreateProductsList: [
    ],
    invoiceCreateCustomersList: [
    ],
    invoiceCreateFormFields: {
        customer: {
            customer_id: '',
            customer_name: ''
        },
        total: 0,
        discount: 0
    }
};
const invoiceCreateProductsList = (state = initialState.invoiceCreateProductsList, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCTS_SUCCESS':
            const newProducts = Object.keys(action.data).reduce((prev, curr) => ({
                ...prev,
                [action.data[curr].id]: {
                    ...action.data[curr],
                    quantity: 0,
                    total: 0
                    }
                }), {});
            return newProducts;
        case 'POST_PRODUCTS_SUCCESS':
            const clearedProducts = Object.keys(state).reduce((prev, curr) => ({
                ...prev,
                [state[curr].id]: {
                    ...state[curr],
                    quantity: 0,
                    total: 0
                }
            }), {});
            return clearedProducts;
        case 'EDIT_QUANTITY':
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    quantity: +action.value,
                    total: +action.value*state[action.id].price.toFixed(2)
                }
            };
        default:
            return state;
    }
};
const invoiceCreateCustomersList = (state = initialState.invoiceCreateCustomersList, action) => {
    switch (action.type) {
        case 'FETCH_CUSTOMERS_SUCCESS':
            return action.data;
        default:
            return state;
    }
};
const invoiceCreateFormFields = (state = initialState.invoiceCreateFormFields, action) => {
    switch (action.type) {
        case 'SELECT_CUSTOMER':
            return {
                ...state,
                customer: {
                    customer_id: action.customer.customer_id,
                    customer_name: action.customer.customer_name
                }
            };
        case 'POST_PRODUCTS_SUCCESS':
            return initialState.invoiceCreateFormFields;
        case 'EDIT_FIELD_INVOICE':
            return {
                ...state,
                [action.field]: action.value
            };
        default:
            return state;
    }
};
export default combineReducers({
    invoiceCreateProductsList,
    invoiceCreateCustomersList,
    invoiceCreateFormFields
})
