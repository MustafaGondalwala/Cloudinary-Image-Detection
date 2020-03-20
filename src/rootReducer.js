import { combineReducers } from "redux";

import user from "./reducers/user";
import files from "./reducers/files"


export default combineReducers({
  user,
  files
});