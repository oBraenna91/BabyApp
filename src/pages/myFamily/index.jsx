import { IonContent, IonButton, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import CreateChildForm from '../../components/forms/createChildForm';
import CreateEventForm from '../../components/forms/createEvent';
import MyChildrenList from '../../components/childList';
import { useHistory } from 'react-router-dom';
import BottomSheetModal from '../../components/bottomSheetModal';

export default function MyFamilyPage() {
  const [selectedChildId, setSelectedChildId] = useState(null);
  const history = useHistory();
  const [showCreateChildModal, setShowCreateChildModal] = useState(false);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);

  const redirectToChildDetail = () => {
    if (selectedChildId) {
      history.push(`/child-info/${selectedChildId}`);
    }
  };

  const toggleSelectedChild = (childId) => {
    if (selectedChildId === childId) {
      setSelectedChildId(null);
    } else {
      setSelectedChildId(childId);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Family</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="main-container">
        <MyChildrenList
          onChildSelect={toggleSelectedChild}
          selectedChildId={selectedChildId}
        />

        <div style={{ marginTop: '20px' }}>
          <IonButton onClick={() => setShowCreateChildModal(true)}>
            Create New Child
          </IonButton>
          {selectedChildId && (
            <>
                <IonButton onClick={() => setShowCreateEventModal(true)}>
                Create New Event
                </IonButton>
                <IonButton onClick={redirectToChildDetail}>
                See Child's Events
            </IonButton>
            </>
          )}
        </div>

        {/* Bottom sheet for creating a child */}
        <BottomSheetModal
          isOpen={showCreateChildModal}
          onClose={() => setShowCreateChildModal(false)}
          onBackdropClick={() => setShowCreateChildModal(false)}
        >
          <CreateChildForm onClose={() => setShowCreateChildModal(false)} />
        </BottomSheetModal>

        {/* Bottom sheet for creating an event */}
        <BottomSheetModal
          isOpen={showCreateEventModal}
          onClose={() => setShowCreateEventModal(false)}
        >
          <CreateEventForm childId={selectedChildId} onClose={() => setShowCreateEventModal(false)} />
        </BottomSheetModal>
      </IonContent>
    </IonPage>
  );
}