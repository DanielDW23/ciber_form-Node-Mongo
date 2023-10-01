import { useContext } from "react";
import { AuthContext } from "../AuthContext";

function Dashboard() {
  const { jwt } = useContext(AuthContext);

  return (
    <div>
      <h1>Profile</h1>
      <p>Your secret token is: {jwt}</p>
    </div>
  );
}

export default Dashboard;