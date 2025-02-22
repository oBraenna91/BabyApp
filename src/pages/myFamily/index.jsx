import {
  IonContent,
  IonPage,
} from '@ionic/react';
import React from 'react';
import MyChildrenList from '../../components/childList';
import MyFamilyList from '../../components/familyList';

export default function MyFamilyPage() {
  
  return (
    <IonPage className="page">
      <IonContent style={{ '--padding-top': 'env(safe-area-inset-top)' }}>
        <div>
          <MyChildrenList />
        </div>
        <div>
          <MyFamilyList />
        </div>
      </IonContent>
    </IonPage>
  );
}