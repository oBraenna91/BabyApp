import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/react';
import React from 'react';
import LogoutButton from '../../components/logout-button';
import { useIonRouter } from '@ionic/react';
import AddProviderForm from '../../components/forms/addProvider';

export default function HomePage() {

    const router = useIonRouter();

    const navigateToDetailsOnly = () => {
        router.push('/detailsonly', 'forward');
    }

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
                    <IonButton onClick={navigateToDetailsOnly}>
                        Details only view
                    </IonButton>
                </div>
                <div className="my-5">
                    <AddProviderForm />
                </div>
            </IonContent>
        </IonPage>
    )
}