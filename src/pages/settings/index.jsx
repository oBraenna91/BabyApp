import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

export default function SettingsPage() {
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>SETTINGS</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="main-container">
                Settings
            </IonContent>
        </IonPage>
    )
}