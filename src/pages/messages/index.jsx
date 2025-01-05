import { IonPage, IonContent } from '@ionic/react';
import React, {useEffect} from 'react';
import { useAuthCheck } from '../../checkAuth.js';

export default function MessagesPage() {

    const { checkAuth } = useAuthCheck();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);


    return(
        <IonPage>
            <IonContent>
                <div>MESSAGES</div>
            </IonContent>
        </IonPage>
    )
}