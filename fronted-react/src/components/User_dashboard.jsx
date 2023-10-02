import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import Home from "./Home.jsx";

function User_dashboard() {
  const { jwt } = useContext(AuthContext);
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/form', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // suponiendo que necesitas enviar el JWT en los headers
            'Authorization': `Bearer ${jwt}`
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setForms(data);
      } catch (error) {
        console.error('Fetching forms failed', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jwt]);

  if (loading) return <p>Loading...</p>;
  
  const cardStyle = {
    width: '300px', // or whatever width you want
    boxShadow: '0px 4px 6px #ccc',
    padding: '10px',
    margin: '10px',
    borderRadius: '5px', 
    background: '#ffffff', 
    textAlign: 'left'
  }

  return (
    <div>
      <Home/>
      <h1 style={{textAlign:'center'}}>USER PANEL</h1>
      {forms.length === 0 && <p>No forms available!</p>}
      <div style={{ display: 'flex',  flexWrap: 'wrap', justifyContent:'center' }}>
        {forms.map(form => (
          <div key={form._id} style={cardStyle}>
            <p><strong>Email:</strong> {form.email}</p>
            <p><strong>Name:</strong> {form.name}</p>
            <p><strong>Subject:</strong> {form.subject}</p>
            <p><strong>Message:</strong> {form.message}</p>
            <p><strong>Fecha de envío:</strong> {new Date(form.createdAt).toLocaleString('es-ES')}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
  };


export default User_dashboard;
