import React from 'react';
import { IonPage, IonFooter } from '@ionic/react';
import Header from '../components/header';

export default function Layout({ title, children }) {
  return (
    <IonPage>
        {children}
      <IonFooter>
        <Header />
      </IonFooter>
    </IonPage>
  );
}