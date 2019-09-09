import React from 'react';
import { HashRouter, BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './components/signin/SignIn';
import AppLayout from './components/layout/AppLayout';
import ProductContextProvider from './context/ProductContext';

function App() {
  return (
    <HashRouter basename="/">
      <div className="App">
        <Switch>
          <ProductContextProvider>
            <Route exact path="/" component={SignIn} />
            <Route path="/products" component={AppLayout} />
          </ProductContextProvider>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
