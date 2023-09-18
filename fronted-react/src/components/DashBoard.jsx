import { useContext } from "react";
import { AuthContext } from "../AuthContext";

function Dashboard() {
  const { token } = useContext(AuthContext);

  return (
    <div>
      <h1>Profile</h1>
      <p>Your secret token is: {token}</p>
    </div>
  );
}

export default Dashboard;