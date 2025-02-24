import React, { useState } from 'react';
import BottomSheetModal from '../bottomSheetModal';
import CreateFamilyForm from '../forms/createFamilyForm';
import { IonButton } from '@ionic/react';

export default function MyFamilyList(){
    const [modalOpen, setModalOpen] = useState(false);
    const [families, setFamilies] = useState([]);

    // Callback som mottar den opprettede familien
    const handleFamilyCreated = (family) => {
      // Oppdater listen over familier
      setFamilies(prev => [...prev, family]);
      // Lukk modalen
      setModalOpen(false);
    };

    return(
        <div>
            <h2>My Family</h2>
            <IonButton onClick={() => setModalOpen(true)}>Create Family</IonButton>
            <BottomSheetModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <CreateFamilyForm onFamilyCreated={handleFamilyCreated} />
            </BottomSheetModal>
            <div>
              {families.length > 0 ? (
                families.map((family) => (
                  <div key={family.id}>
                    <h3>{family.family_name}</h3>
                  </div>
                ))
              ) : (
                <p>No families created yet.</p>
              )}
            </div>
        </div>
    )
}
