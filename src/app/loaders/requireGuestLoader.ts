import { redirect, type LoaderFunctionArgs } from "react-router-dom";
import { selectIsAuthenticated } from "../../features/Users/userSlice";
import store from "../store";

export function requireGuestLoader(_: LoaderFunctionArgs) {
  const state = store.getState();

  const isAuthenticated = selectIsAuthenticated(state);

  if (isAuthenticated) {
    throw redirect('/');
  }

  return null;
};
