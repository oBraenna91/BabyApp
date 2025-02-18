import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import LogoutButton from '../../components/logout-button';

export default function SettingsPage() {
    return(
        <IonPage className="page-top-padding">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>SETTINGS</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="main-container">
                <div className="col-12 d-flex justify-content-center mt-5">
                    <LogoutButton />
                </div>
            </IonContent>
        </IonPage>
    )
}