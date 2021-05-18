import * as Types from '../constants/ActionType';

const initialState = {}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGIN_SUCCESS: {
            let userData = action.payload;
            return {...userData};
        }

        default:
            return state;
    }
}

export default auth;