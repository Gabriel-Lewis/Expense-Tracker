import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import expenseReducer from './expense_reducer';
import reportReducer from './report_reducer';

const RootReducer = combineReducers({
  session: sessionReducer,
  expense: expenseReducer,
  report: reportReducer
});

export default RootReducer;
