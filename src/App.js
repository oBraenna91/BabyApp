import React from 'react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import LoginPage from './pages/login';
import ResetPasswordPage from './pages/resetPassword';
import SignUpPage from './pages/signUp';
import Tabs from './components/tabsNavigation';
import DetailsOnlyPage from './pages/detailsOnly';

function App() {
  return (
    <IonApp>
      <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/" component={LoginPage}/>
            <Route path="/reset-password" component={ResetPasswordPage}/>
            <Route path="/sign-up" component={SignUpPage} />
            <Route path="/app" component={Tabs} />
            <Route path="/detailsonly" component={DetailsOnlyPage}/>
          </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;





  // {/* Offentlige ruter */}
  // <Route path="/login" component={LoginPage} exact />
  // <Route path="/sign-up" component={SignUpPage} exact />
  // <Route path="/reset-password" component={ResetPasswordPage} exact />
  // <Route path="/update-password" component={UpdatePasswordPage} exact />

  // {/* Beskyttede ruter */}
  // <ProtectedRoute path="/home" component={HomePage} exact />
  // <ProtectedRoute path="/profile" component={ProfilePage} exact />
  // <ProtectedRoute path="/messages" component={MessagesPage} exact />
  // <ProtectedRoute path="/discover" component={DiscoverPage} exact />
  // <ProtectedRoute path="/settings" component={SettingsPage} exact />
  