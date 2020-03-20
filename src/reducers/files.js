import { FILE_CREATED } from "../types";

export default function files(state = {}, action = {}) {
  switch (action.type) {
    case FILE_CREATED:
      return action.files;
    default:
      return state;
  }
}