import React from 'react';
import { IonButton, IonBadge } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import styles from './styles.module.scss';
import { useRequestCount } from '../../contexts/RequestCount';

const RequestsButton = () => {
    const router = useIonRouter();
    const { count } = useRequestCount();

  const redirectToReq = () => {
    router.push('/app/requests', 'forward');
  }

  return (
    <IonButton className={styles.buttonContainer} onClick={redirectToReq}>
      <div>
        Requests
      </div> 
      <div>
        {count > 0 && <IonBadge color="danger">{count}</IonBadge>}
      </div>
    </IonButton>
  );
};

export default RequestsButton;
