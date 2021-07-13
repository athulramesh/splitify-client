import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { FriendsProvider } from "../contexts/FriendsContext";
import "../styles/App.css";
import Login from "./Authentication/Login";
import SignUp from "./Authentication/SignUp";
import Dashboad from "./Home/Dashboad";
import PrivateRouter from "./PrivateRouter";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <FriendsProvider>
            <Switch>
              <PrivateRouter exact path="/" component={Dashboad} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/login" component={Login} />
            </Switch>
          </FriendsProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
