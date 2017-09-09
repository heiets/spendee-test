export const fetchProducts = () => {
    return dispatch => {
        dispatch({
            type: 'FETCH_PRODUCTS_REQUEST'
        });
        fetch('/api/products').then(function(response) {
            return response.json();
        })
            .then(function(json) {
                dispatch({
                    type: 'FETCH_PRODUCTS_SUCCESS',
                    data: json
                })
            })
    }
};
export const fetchCustomers = () => {
    return dispatch => {
        dispatch({
            type: 'FETCH_CUSTOMERS_REQUEST'
        });
        fetch('/api/customers').then(function(response) {
            return response.json();
        })
            .then(function(json) {
                dispatch({
                    type: 'FETCH_CUSTOMERS_SUCCESS',
                    data: json
                })
            })
    }
};
export const addInvoice = (jsonToPost) => {
    return dispatch => {
        dispatch({
            type: 'POST_PRODUCTS_REQUEST'
        });
        fetch('/api/invoices', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(jsonToPost)
        }).then(function(response) {
            return response.json();
        })
        .then(function(json) {
            dispatch({
                type: 'POST_PRODUCTS_SUCCESS',
                returnData: json
            })
        })
    }
};
export const selectCustomer = (customer) => {
    return {
        type: 'SELECT_CUSTOMER',
        customer
    }
};
export const editQuantity = (id, value) => {
    return {
        type: 'EDIT_QUANTITY',
        id,
        value
    }
};
export const editField = (field, value) => {
    return {
        type: 'EDIT_FIELD_INVOICE',
        field,
        value
    }
};
