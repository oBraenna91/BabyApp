import React, { useState } from 'react';
import { IonButton, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';

export default function EditFamilyMemberForm({ member, onUpdate, onClose }) {
  // Sett initial rolle basert på member (default til "viewer" om ikke definert)
  const [role, setRole] = useState(member.role || 'viewer');

  const handleSubmit = () => {
    // Opprett en oppdatert versjon av medlemmet med den nye rollen
    const updatedMember = { ...member, role };
    onUpdate(updatedMember);
  };

  return (
    <div className="test-form double-test">
      <IonItem>
        <IonLabel>Role</IonLabel>
        <IonSelect value={role} onIonChange={(e) => setRole(e.detail.value)}>
          <IonSelectOption value="admin">Admin</IonSelectOption>
          <IonSelectOption value="family-member">Family Member</IonSelectOption>
          <IonSelectOption value="viewer">Viewer</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonButton expand="block" onClick={handleSubmit}>
        Save
      </IonButton>
      <IonButton expand="block" color="light" onClick={onClose}>
        Cancel
      </IonButton>
    </div>
  );
}
