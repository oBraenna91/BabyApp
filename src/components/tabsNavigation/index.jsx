import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton } from '@ionic/react';
import React from 'react';
import HomePage from '../../pages/home';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';
import ProfilePage from '../../pages/profile';
import DiscoverPage from '../../pages/discover';
import {ReactComponent as HomeIcon} from '../../visuals/icons/chat (1).svg';
import MessagesPage from '../../pages/messages';

export default function Tabs() {
    
    return(
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path="/app/home" component={HomePage}/>
                <Route exact path="/app/profile" component={ProfilePage}/>
                <Route exact path="/app/discover" component={DiscoverPage} />
                <Route exact path="/app/messages" component={MessagesPage} />
                <Route exact path="/app">
                    <Redirect to="/app/home"/>
                </Route> 
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/app/home">
                    <div>Home</div>
                </IonTabButton>
                <IonTabButton tab="profile" href="/app/profile">
                    <div>Profile</div>
                </IonTabButton>
                <IonTabButton tab="discover" href="/app/discover">
                    <div>Discover</div>
                </IonTabButton>
                <IonTabButton tab="messages" href="/app/messages">
                    <div>
                        <HomeIcon />
                    </div>
                    <div>Discover</div>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}