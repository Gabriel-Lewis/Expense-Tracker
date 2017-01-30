import { combineReducers } from 'redux';
import sessionReducer from './session_reducer'
import expenseReducer from './expense_reducer'

const RootReducer = combineReducers({
 session: sessionReducer,
 expense: expenseReducer
});

export default RootReducer;
