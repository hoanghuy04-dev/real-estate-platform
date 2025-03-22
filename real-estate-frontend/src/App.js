import './App.css';
import Login from "./pages/Login";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Register from "./pages/Register";
import Home from "./pages/Home";
import {AuthProvider} from "./components/AuthContext";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/register"} element={<Register/>}/>
                </Routes>
            </Router>
        </AuthProvider>)
}

export default App;
