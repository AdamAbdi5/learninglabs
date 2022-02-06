import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home";
import Student from "./Pages/Student"
import B1 from "./Pages/h1"
import { createClient, Provider } from "urql"
import { getAccessToken } from "./accessToken.js";



const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: () =>{
    const accessToken = getAccessToken();
    console.log(`Access Token = ${accessToken}`)
    return {
      credentials: "include",
      headers: {authorization: accessToken ? `bearer ${accessToken}` : ""}
    }
  }
  
})

function App() {
  return (
    <Provider value={client}>
       <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/studentlogin" element={<Student />}></Route>
          <Route path="/h1" element={<B1/>}></Route>
        </Routes>
      </Router>
    </Provider>
     
    
  );
}

export default App;
