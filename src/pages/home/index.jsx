import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import React from 'react';

export default function HomePage() {
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>HOME</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div>HOME PAGE</div>
            </IonContent>
        </IonPage>
    )
}