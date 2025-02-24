import React from 'react';
//import MultiStepForm from '../../components/forms/createUserForm';
import { IonPage, IonContent } from '@ionic/react';
import styles from './styles.module.scss';

const HomePage = () => {

  return (
    <IonPage>
      <IonContent style={{ '--padding-top': 'env(safe-area-inset-top)' }}>
        <div className={styles.container}>
          <h1>Welcome to the app!</h1>
          <div className={styles.sub1}>
            Your feed will come here
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;