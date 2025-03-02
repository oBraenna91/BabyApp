import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent
} from '@ionic/react';
import React from 'react';
import MyChildrenList from '../../components/childList';
import MyFamilyList from '../../components/familyList';
import { useAuth } from '../../contexts/auth';

export default function MyFamilyPage() {

  const { user } = useAuth();

  const handleRefresh = (event) => {
    setTimeout(() => {
      console.log("Data oppdatert!");
      event.detail.complete();
    }, 2000);
  };
  
  return (
    <IonPage className="page-padding">
      <IonContent style={{ '--padding-top': 'env(safe-area-inset-top)' }}>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <div>
          <MyChildrenList />
        </div>
        <div>
          <MyFamilyList key={user?.id} />
        </div>
      </IonContent>
    </IonPage>
  );
}