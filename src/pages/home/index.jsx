import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import React from 'react';
import LogoutButton from '../../components/logout-button';
import AddProviderForm from '../../components/forms/addProvider';

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
                <div className="my-5">
                    <LogoutButton />
                </div>
                <div className="my-5">
                    <AddProviderForm />
                </div>
            </IonContent>
        </IonPage>
    )
}