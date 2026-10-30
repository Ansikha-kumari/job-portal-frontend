import { BrowserRouter as Router, Route } from "react-router-dom";
import { createContext, useState } from "react";

import Home from "./component/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Profile from "./component/Profile";
import Applications from "./component/Applications";
import Logout from "./component/Logout";
import Welcome from "./component/Welcome";

// Global Popup Context
export const SetPopupContext = createContext();

function App() {
  const [popup, setPopup] = useState(null);

  return (
    <SetPopupContext.Provider value={setPopup}>
      <Router>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/signup">
          <Signup />
        </Route>

        <Route exact path="/profile">
          <Profile />
        </Route>

        <Route exact path="/applications">
          <Applications />
        </Route>

        <Route exact path="/logout">
          <Logout />
        </Route>

        <Route exact path="/welcome">
          <Welcome />
        </Route>
      </Router>
    </SetPopupContext.Provider>
  );
}

export default App;