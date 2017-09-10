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
export const fetchIncomes = () => {
    return dispatch => {
        if (!localStorage.getItem('IncomesList')) {
            dispatch({
                type: 'FETCH_INCOMES_FAIL'
            })
        }
        else {
            dispatch({
                type: 'FETCH_INCOMES_SUCCESS',
                data: JSON.parse(localStorage.getItem('IncomesList'))
            })
        }
    }
};
export const fetchCategories = () => {
    return dispatch => {
        if (!localStorage.getItem('CategoriesList')) {
            dispatch({
                type: 'FETCH_CATEGORIES_FAIL'
            })
        }
        else {
            dispatch({
                type: 'FETCH_CATEGORIES_SUCCESS',
                data: JSON.parse(localStorage.getItem('CategoriesList'))
            })
        }
    }
};
export const selectCategory = category_name => {
    return {
        type: 'SELECT_CATEGORY',
        category_name
    }
};