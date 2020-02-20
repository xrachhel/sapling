import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Product from "./pages/Product";
import Results from "./pages/Results";
import Dashboard from "./pages/Dashboard";
import { StoreProvider } from "./utils/GlobalState";


function App() {

  return (
    <Router>
      <div>
        <StoreProvider>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/home" component={Landing}/>
            <Route exact path="/product/:itemId/:upc" component={Product}/>
            <Route exact path="/results" component={Results}/>
            <Route exact path="/dashboard" component={Dashboard}/>
          </Switch>
        </StoreProvider>
      </div>
    </Router>
  );
}





export default App;
