import { IonTitle, IonToolbar, IonPage, IonHeader, IonContent } from '@ionic/react';
import React from 'react';

export default function ContestantsPage() {
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Contestants</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                Her kommer contestants
            </IonContent>
        </IonPage>
    )
}