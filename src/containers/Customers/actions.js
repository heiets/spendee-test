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
export const addCustomer = (jsonToPost) => {
    return dispatch => {
        dispatch({
            type: 'POST_CUSTOMER_REQUEST'
        });
        fetch('/api/customers', {
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
                    type: 'POST_CUSTOMER_SUCCESS',
                    returnData: json
                })
            })
    }
};
export const deleteCustomer = (id) => {
    return dispatch => {
        dispatch({
            type: 'DELETE_CUSTOMER_REQUEST'
        });
        fetch(`/api/customers/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        }).then(function(response) {
            return response.json();
        })
            .then(function(json) {
                dispatch({
                    type: 'DELETE_CUSTOMER_SUCCESS',
                    returnData: json
                })
            })
    }
};
export const editField = (field, value) => {
    return {
        type: 'EDIT_FIELD_CUSTOMERS',
        field,
        value
    }
};
