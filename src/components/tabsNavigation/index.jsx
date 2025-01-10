import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon } from '@ionic/react';
import React from 'react';
import HomePage from '../../pages/home';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';
import ProfilePage from '../../pages/profile';
import DiscoverPage from '../../pages/discover';
import ChatIcon from '../../visuals/icons/chat (1).svg';
import HomeIcon from '../../visuals/icons/home.svg'
import ProfileIcon from '../../visuals/icons/user (4).svg';
import DiscoverIcon from '../../visuals/icons/compass.svg';
import SettingsIcon from '../../visuals/icons/settings.svg';
import MessagesPage from '../../pages/messages';
import SettingsPage from '../../pages/settings';

export default function Tabs() {
    
    return(
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path="/app/home" component={HomePage}/>
                <Route exact path="/app/profile" component={ProfilePage}/>
                <Route exact path="/app/discover" component={DiscoverPage} />
                <Route exact path="/app/messages" component={MessagesPage} />
                <Route exact path="/app/settings" component={SettingsPage} />
                <Route exact path="/app">
                    <Redirect to="/app/home"/>
                </Route> 
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/app/home">
                    <IonIcon src={HomeIcon} />
                </IonTabButton>
                <IonTabButton tab="profile" href="/app/profile">
                    <IonIcon src={ProfileIcon} />
                </IonTabButton>
                <IonTabButton tab="discover" href="/app/discover">
                    <IonIcon src={DiscoverIcon} />
                </IonTabButton>
                <IonTabButton tab="messages" href="/app/messages">
                    <IonIcon src={ChatIcon} />
                </IonTabButton>
                <IonTabButton tab="settings" href="/app/settings">
                    <IonIcon src={SettingsIcon} />
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}