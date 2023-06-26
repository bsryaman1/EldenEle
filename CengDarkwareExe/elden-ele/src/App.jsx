
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Cards from "./components/Card";
import UserLiked from './pages/userLiked';
import NewAdvert from "./pages/NewAdvert";
import ProfilePage from "./pages/ProfilePage";
import UpdatePage from "./pages/UpdatePage";



function App() {
  return (
    <BrowserRouter> 
    <Routes>
    
      <Route exact path = "/login" element={<Login />}/>
      <Route exact path = "/signup" element={<Signup />}/>
      <Route exact path = "/" element={<Home />}/>  
      <Route path="/ilan/:id" element={<Cards />} />
      <Route exact path = "/mylist" element={<UserLiked />}/>
      <Route exact path = "/ilanekle" element={<NewAdvert />}/>
      <Route exact path = "/profile" element={<ProfilePage />}/>
      <Route exact path = "/ilanguncelle" element={<UpdatePage />}/>
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
