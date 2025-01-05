import { IonContent, IonPage } from '@ionic/react';
import React, {useEffect} from 'react';
import { useAuthCheck } from '../../checkAuth.js';

export default function ProfilePage() {

    const { checkAuth } = useAuthCheck();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return(
        <IonPage>
            <IonContent>
                <div>PROFILEPAGE</div>
            </IonContent>
        </IonPage>
    )
}