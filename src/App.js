import React from 'react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import HomePage from './pages/home';
import ProfilePage from './pages/profile';
import MessagesPage from './pages/messages';
import DiscoverPage from './pages/discover';
import SettingsPage from './pages/settings';
import LoginPage from './pages/login';
import UpdatePasswordPage from './pages/updatePassword';
import ResetPasswordPage from './pages/resetPassword';
import SignUpPage from './pages/signUp';
import ProtectedRoute from './protectedRoutes';

function App() {
  return (
    <IonApp>
      <IonReactRouter>
          <IonRouterOutlet>
            {/* Offentlige ruter */}
          <Route path="/login" component={LoginPage} exact />
          <Route path="/sign-up" component={SignUpPage} exact />
          <Route path="/reset-password" component={ResetPasswordPage} exact />
          <Route path="/update-password" component={UpdatePasswordPage} exact />

          {/* Beskyttede ruter */}
          <ProtectedRoute path="/home" component={HomePage} exact />
          <ProtectedRoute path="/profile" component={ProfilePage} exact />
          <ProtectedRoute path="/messages" component={MessagesPage} exact />
          <ProtectedRoute path="/discover" component={DiscoverPage} exact />
          <ProtectedRoute path="/settings" component={SettingsPage} exact />

          {/* Hvis brukeren går til '/', redirect til /home */}
          <Redirect exact from="/" to="/home" />
          </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
