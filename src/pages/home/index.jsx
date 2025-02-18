import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import React from 'react';
import styles from './styles.module.scss';

export default function HomePage() {

    return(
        <IonPage className="page-top-padding">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>HOME</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="main-container">
                <div className='d-flex flex-column align-items-center pt-4'>
                    <div className={`${styles.overskrift} text-center col-11`}>FEED WILL COME HERE</div>
                </div>
            </IonContent>
        </IonPage>
    )
}