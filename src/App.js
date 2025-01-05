import React from 'react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import HomePage from './pages/home';
import ProfilePage from './pages/profile';
import MessagesPage from './pages/messages';
import DiscoverPage from './pages/discover';
import SettingsPage from './pages/settings';
import Layout from './layout';
import LoginPage from './pages/login';
import UpdatePasswordPage from './pages/updatePassword';
import ResetPasswordPage from './pages/resetPassword';
import SignUpPage from './pages/signUp';

function App() {
  return (
    <IonApp>
      <IonReactRouter>
          <IonRouterOutlet>
            <Layout>
              <Route path="/home" component={HomePage} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/messages" component={MessagesPage} />
              <Route path="/discover" component={DiscoverPage} />
              <Route path="/settings" component={SettingsPage} />
            </Layout>
            <Route path="/login" component={LoginPage}/>
            <Route path="/update-password" component={UpdatePasswordPage}/>
            <Route path="/reset-password" component={ResetPasswordPage}/>
            <Route path="/sign-up" component={SignUpPage}/>
            <Redirect exact from="/" to="/home" />
          </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
