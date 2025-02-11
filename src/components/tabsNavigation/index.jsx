import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon } from '@ionic/react';
import React from 'react';
import HomePage from '../../pages/home';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';
import HomeIcon from '../../visuals/icons/home.svg'
import HeartIcon from '../../visuals/icons/heart.svg';
import MyFamilyPage from '../../pages/myFamily';
import SettingsPage from '../../pages/settings';
import UserIcon from '../../visuals/icons/user (4).svg';


export default function Tabs() {
    
    return(
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path="/app/home" component={HomePage}/>
                <Route exact path="/app/myfamily" component={MyFamilyPage}/>
                <Route exact path="/app/settings" component={SettingsPage}/>
                <Route exact path="/app">
                    <Redirect to="/app/home"/>
                </Route> 
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/app/home">
                    <IonIcon src={HomeIcon} />
                </IonTabButton>
                <IonTabButton tab="myfamily" href="/app/myfamily">
                    <IonIcon src={HeartIcon} />
                </IonTabButton>
                <IonTabButton tab="settings" href="/app/settings">
                    <IonIcon src={UserIcon} />
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}