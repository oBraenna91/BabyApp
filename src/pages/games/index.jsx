import { IonTitle, IonToolbar, IonPage, IonHeader, IonContent } from '@ionic/react';
import React from 'react';

export default function GamesPage() {
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Games</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                Her kommer games
            </IonContent>
        </IonPage>
    )
}