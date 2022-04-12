import { Route, Navigate } from "react-router-dom";
import BookDetail from "./pages/BookDetail";
import Search from "./pages/Search";
export function PrivateRoute({ path, ...props }) {
  // getData(path, setLogin);
  // console.log(login);
  return localStorage.getItem("accessToken") ? (
    <Route path={path} element={<BookDetail />}></Route>
  ) : (
    <Navigate replace={true} to="/" />
  );
}
