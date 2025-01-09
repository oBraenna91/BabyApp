import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import React from 'react';

export default function MessagesPage() {

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>MESSAGES</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div>Message page</div>
            </IonContent>
        </IonPage>
    )
}