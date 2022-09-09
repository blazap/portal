import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';


function App() {

  const { loginWithPopup, loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0()

  function callApi() {
    axios
    .get("http://localhost:4000/")
    .then(response => console.log(response.data))
    .catch(error => console.log(error.message))

  }

  async function callProtectedApi() {
    try{

      const token = await getAccessTokenSilently();
      const response = await axios.get('http://localhost:4000/protected', {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      console.log(response.data);
    } catch(error) {
      console.log(error.message);
    }
  }
  return (
    <div className="App">

          <button onClick={loginWithRedirect}>Login</button>

          <button onClick={logout}>Logout</button>

      <h3>User is { isAuthenticated ? "Logged in" : "Not logged in" }</h3>

          <button onClick={callApi}>API Route</button>

          <button onClick={callProtectedApi}>Protected API Route</button>

        { isAuthenticated && (
          <pre style={{textAlign: 'start'}}>{JSON.stringify(user.nickname, null, 2)}</pre>
        )}
    </div>
  );
}

export default App;
