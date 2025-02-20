import React from 'react';
//import MultiStepForm from '../../components/forms/createUserForm';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
//import styles from './styles.module.scss';

const HomePage = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Welcome to the app!</h1>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;