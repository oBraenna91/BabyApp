import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon} from '@ionic/react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import React from 'react';
import HomePage from '../../pages/home';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';
import HomeIcon from '../../visuals/icons/home.svg'
import HeartIcon from '../../visuals/icons/heart.svg';
import MyFamilyPage from '../../pages/myFamily';
import SettingsPage from '../../pages/settings';
import RequestsList from '../../pages/requestPage';
import SettingsTabButton from '../settingsTabButton';
import ChildInfoPage from '../../pages/childDetails';
import FamilyDetails from '../../pages/familyDetails';


export default function Tabs() {

    const location = useLocation();

    const hideTabBarPrefixes = [
        '/app/myfamily/child-info/',
        '/app/myfamily/family/'
      ];

      const shouldHideTabBar = hideTabBarPrefixes.some(prefix =>
        location.pathname.startsWith(prefix)
      );
    
    return(
        <IonTabs>
            <IonRouterOutlet>
                <Route exact path="/app/home" component={HomePage}/>
                <Route exact path="/app/myfamily" component={MyFamilyPage}/>
                <Route exact path="/app/settings" component={SettingsPage}/>
                <Route pat="/app/requests" component={RequestsList}/>
                <Route exact path="/app/myfamily/child-info/:childId" component={ChildInfoPage} />
                <Route exact path="/app/myfamily/family/:familyId" component={FamilyDetails} />
                <Route exact path="/app">
                    <Redirect to="/app/home"/>
                </Route> 
            </IonRouterOutlet>
            <IonTabBar slot="bottom" style={{ display: shouldHideTabBar ? 'none' : 'flex' }}>
                <IonTabButton tab="home" href="/app/home">
                    <IonIcon src={HomeIcon} />
                </IonTabButton> 
                <IonTabButton tab="myfamily" href="/app/myfamily">
                    <IonIcon src={HeartIcon} />
                </IonTabButton>
                <IonTabButton tab="settings" href="/app/settings">
                    <SettingsTabButton />
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}