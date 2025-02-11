import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

export default function MyFamilyPage() {
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>My Family</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="main-container">
                MY FAMILY!
            </IonContent>
        </IonPage>
    )
}