import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import UpdatePassword from '../../components/forms/updatePassword';

export default function UpdatePasswordPage() {
    return(
        <IonPage className="page-top-padding">
            <IonContent style={{ '--padding-top': 'env(safe-area-inset-top)' }}>
                <UpdatePassword />
            </IonContent>
        </IonPage>
    )
}