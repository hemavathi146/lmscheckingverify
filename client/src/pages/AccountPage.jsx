import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function AccountPage() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return <div>Account Page for {user.firstName}</div>;
}
