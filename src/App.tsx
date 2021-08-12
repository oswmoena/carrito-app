import { FC } from 'react';
import { Redirect, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { AboutUs, HomePage } from './views';
import RouteLayout from './layouts/RouteLayout';
import { CartProvider } from './context/CartContext';

const hist = createBrowserHistory();

const App: FC = () => {
  return (
    <>
      <CartProvider>
        <Router history={hist}>
          <Switch>
            <RouteLayout fullCover={false} component={HomePage} exact path="/" />
            <RouteLayout fullCover={false} component={AboutUs} exact path="/about-us" />
            <RouteLayout path="*">
              <Redirect to="/" />
            </RouteLayout>
          </Switch>
        </Router>
      </CartProvider>
    </>
  );
};

export default App;
