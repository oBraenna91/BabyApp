import {
  IonContent,
  IonPage,
} from '@ionic/react';
import React from 'react';
import MyChildrenList from '../../components/childList';
import MyFamilyList from '../../components/familyList';
import { useAuth } from '../../contexts/auth';

export default function MyFamilyPage() {

  const { user } = useAuth();
  
  return (
    <IonPage className="page">
      <IonContent style={{ '--padding-top': 'env(safe-area-inset-top)' }}>
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