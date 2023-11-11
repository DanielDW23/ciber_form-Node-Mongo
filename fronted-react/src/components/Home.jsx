import { useContext } from "react";
import { AuthContext } from "../AuthContext";

function Home() {
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  return (
    
    <div style={{ marginBottom: '40px', display:'flex', justifyContent: 'flex-end' , marginRight: '5px' }}>
     
      {isLoggedIn ? (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', textAlign: 'center'}}>
          <h4>Welcome, <span style={{color: 'white', fontWeight: 'bold'}}>{user.name}</span>!<br/> You are logged.</h4>
          <button onClick={logout} style={{borderRadius:'5px'}}>Logout</button>
        </div>
      ) : (
        <p>Please log in to access more features.</p>
      )}
    </div>
  );
}

export default Home;