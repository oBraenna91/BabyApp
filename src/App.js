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

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <Layout>
          <IonRouterOutlet>
            <Route path="/home" component={HomePage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/messages" component={MessagesPage} />
            <Route path="/discover" component={DiscoverPage} />
            <Route path="/settings" component={SettingsPage} />
            <Redirect exact from="/" to="/home" />
          </IonRouterOutlet>
        </Layout>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
