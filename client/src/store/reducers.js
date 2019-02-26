import * as actionTypes from './actions';
const initialState = {}

const reducers = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.REMOVE_TRADE:
            return {}
        case actionTypes.ADD_TRADE:
            return {}
        default:
            return {}
    }
    return state;
}

export default reducers;
