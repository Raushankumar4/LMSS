

import { Outlet} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContex";
const App = () => {
  const {isAuthenticated} = useAuth()
  useEffect(()=>{
   if(!isAuthenticated){
    window.location.href="/signIn"
   }
  },[])
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default App