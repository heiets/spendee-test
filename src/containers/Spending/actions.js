export const fetchSpending = () => {
    return dispatch => {
        if (!localStorage.getItem('SpendingList')) {
            dispatch({
                type: 'FETCH_SPENDING_FAIL'
            })
        }
        else {
            dispatch({
                type: 'FETCH_SPENDING_SUCCESS',
                data: JSON.parse(localStorage.getItem('SpendingList'))
            })
        }
    }
};
export const addSpending = (jsonToPost) => {
    return dispatch => {
        localStorage.setItem('SpendingList', JSON.stringify(jsonToPost));
        dispatch({
            type: 'POST_SPENDING_SUCCESS',
            returnData: jsonToPost
        })
    }
};
export const deleteSpending = (jsonToPost) => {
    return dispatch => {
        localStorage.setItem('SpendingList',  JSON.stringify(jsonToPost));
        dispatch({
            type: 'DELETE_SPENDING_SUCCESS',
            returnData: jsonToPost
        })
    }
};
export const editField = (field, value) => {
    return {
        type: 'EDIT_FIELD_SPENDING',
        field,
        value
    }
};
