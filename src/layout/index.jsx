import React from 'react';
import { IonPage, IonHeader, IonContent } from '@ionic/react';
import Header from '../components/header';

export default function Layout({ children }) {
  return (
    <IonPage>
      <IonHeader>
        <Header />
      </IonHeader>
      <IonContent>
        {children}
      </IonContent>
    </IonPage>
  );
}