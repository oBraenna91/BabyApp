import { IonContent, IonPage } from '@ionic/react';
import React, {useEffect} from 'react';
import { useAuthCheck } from '../../checkAuth';

export default function SettingsPage() {

    const { checkAuth } = useAuthCheck();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);
    
    return(
        <IonPage>
            <IonContent>
                <div>SETTINGS</div>
            </IonContent>
        </IonPage>
    )
}