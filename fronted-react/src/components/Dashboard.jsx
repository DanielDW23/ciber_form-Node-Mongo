import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import Home from "./Home.jsx";

function Dashboard() {
  const { jwt } = useContext(AuthContext);

  return (
    <div>
      <Home/>
      <h1>Profile</h1>
      <p>Your secret token is: a</p>
    </div>
  );
}

export default Dashboard;