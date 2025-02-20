import {
  IonContent,
  IonButton,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import CreateChildForm from '../../components/forms/createChildForm';
import MyChildrenList from '../../components/childList';
import BottomSheetModal from '../../components/bottomSheetModal';
import { supabase } from '../../supabaseClient';

export default function MyFamilyPage() {
  const [childrenList, setChildrenList] = useState([]);
  const [showCreateChildModal, setShowCreateChildModal] = useState(false);

  useEffect(() => {
    const fetchUserChildren = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error('Feil ved henting av bruker', userError);
        return;
      }

      const { data, error } = await supabase
        .from('child_members')
        .select(`
          relation,
          children ( id, name, date_of_birth, created_at )
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Feil ved henting av barn', error);
      } else {
        setChildrenList(data);
      }
    };

    fetchUserChildren();
  }, []);

  const handleChildCreated = (newChild) => {
    const newMember = { relation: 'admin', children: newChild };
    setChildrenList((prevList) => [...prevList, newMember]);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Family</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <MyChildrenList
          childrenList={childrenList}
        />
        <div style={{ marginTop: '20px' }}>
          <IonButton onClick={() => setShowCreateChildModal(true)}>
            Create New Child
          </IonButton>
        </div>
        <BottomSheetModal
          isOpen={showCreateChildModal}
          onClose={() => setShowCreateChildModal(false)}
          onBackdropClick={() => setShowCreateChildModal(false)}
        >
          <CreateChildForm
            onChildCreated={handleChildCreated}
            onClose={() => setShowCreateChildModal(false)}
          />
        </BottomSheetModal>
      </IonContent>
    </IonPage>
  );
}