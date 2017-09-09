import { combineReducers } from 'redux';

const initialState = {
    customersList: [
    ],
    customersFormFields: {
        name: '',
        address: '',
        phone: ''
    }
};
const customersList = (state = initialState.customersList, action) => {
    switch (action.type) {
        case 'FETCH_CUSTOMERS_SUCCESS':
            const newCustomers = Object.keys(action.data).reduce((prev, curr) => ({
                ...prev,
                [action.data[curr].id]: {
                    ...action.data[curr]
                }
            }), {});
            return newCustomers;
        case 'POST_CUSTOMER_SUCCESS':
            return {
                ...state,
                [action.returnData.id]: {
                    id: action.returnData.id,
                    name: action.returnData.name,
                    address: action.returnData.address,
                    phone: action.returnData.phone,
                    createdAt: action.returnData.createdAt,
                    updatedAt: action.returnData.updatedAt
                }
            };
        case 'DELETE_CUSTOMER_SUCCESS':
            let newCustomersListDelete = {...state};
            delete newCustomersListDelete[action.returnData.id];
            return newCustomersListDelete;
        default:
            return state;
    }
};
const customersFormFields = (state = initialState.customersFormFields, action) => {
    switch (action.type) {
        case 'EDIT_FIELD_CUSTOMERS':
            return {
                ...state,
                [action.field]: action.value
            };
        case 'POST_CUSTOMER_SUCCESS':
            return {
                name: '',
                address: '',
                phone: ''
            };
        default:
            return state;
    }
};

export default combineReducers({
    customersList,
    customersFormFields
})
