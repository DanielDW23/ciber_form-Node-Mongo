import { useContext } from "react";
import { AuthContext } from "../AuthContext";

function Home() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    
    <div style={{ marginBottom: '25px', display:'flex', justifyContent: 'flex-end' , margin:'25px' }}>
     
      {isLoggedIn ? (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', textAlign: 'center'}}>
          <h4>Welcome!<br/> You are logged.</h4>
          <button onClick={logout} style={{borderRadius:'5px'}}>Logout</button>
        </div>
      ) : (
        <p>Please log in to access more features.</p>
      )}
    </div>
  );
}

export default Home;