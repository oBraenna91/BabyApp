import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import React, {useEffect} from 'react';
import LogoutButton from '../../components/logout-button';
import { useAuthCheck } from '../../checkAuth.js';

export default function HomePage() {

    const { checkAuth } = useAuthCheck();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);


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
            </IonContent>
        </IonPage>
    )
}