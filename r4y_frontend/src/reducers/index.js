import { combineReducers } from 'redux';
import homepage from './homepage';
import auth from './auth';

const rootReducer = combineReducers({
    homepage: homepage,
    auth: auth,
});

export default rootReducer;