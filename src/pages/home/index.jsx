import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import React from 'react';
import useUserIsAdmin from '../../hooks/useIsAdmin';
import styles from './styles.module.scss';
import LogoutButton from '../../components/logout-button';

export default function HomePage() {

    const isAdmin = useUserIsAdmin();

    if(isAdmin === null) {
        return(
            <div>Laster...</div>
        )
    }

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>HOME</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="main-container">
                {/* <div>
                    Hei! Det er så fint at du er her!
                    {isAdmin && (
                        <div>
                            Du er admin!
                        </div>
                    )}
                </div> */}
                <div className='d-flex flex-column align-items-center pt-4'>
                    <div className={`${styles.overskrift} text-center col-11`}>FEED WILL COME HERE</div>
                </div>
                <div className="">
                    <LogoutButton />
                </div>
            </IonContent>
        </IonPage>
    )
}