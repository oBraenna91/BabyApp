import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

export default function DetailsOnlyPage() {
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/app/home"/>
                    </IonButtons>
                    <IonTitle>DETAILS</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                CONTENT
            </IonContent>
        </IonPage>
    )
}