import { redirect, type LoaderFunctionArgs } from "react-router-dom";
import { selectIsAuthenticated } from "../../features/Users/userSlice";
import store from "../store";

export function requireAuthLoader({ request }: LoaderFunctionArgs) {
  const state = store.getState();
  const isAuthenticated = selectIsAuthenticated(state);

  if (!isAuthenticated) {
    const url = new URL(request.url);
    const redirectTo = `${url.pathname}${url.search}`;

    throw redirect(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  return null;
};
