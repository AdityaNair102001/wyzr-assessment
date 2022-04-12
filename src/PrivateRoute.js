import { Route, Navigate } from "react-router-dom";
import Search from "./pages/Search";
export function PrivateRoute({ path, ...props }) {
  // getData(path, setLogin);
  // console.log(login);
  return localStorage.getItem("accessToken") ? (
    <Route path="/search" element={<Search />}></Route>
  ) : (
    <Navigate replace={true} to="/" />
  );
}
