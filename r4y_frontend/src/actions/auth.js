import * as Types from '../constants/ActionType';

export const loginSuccess = (user) => {
    return {
        type: Types.LOGIN_SUCCESS,
        payload: user,
    }
}