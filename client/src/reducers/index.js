import { combineReducers } from "redux";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import errorsReducer from "./errorsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  errors: errorsReducer
});

export default rootReducer;
