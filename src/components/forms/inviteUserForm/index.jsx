import React, { useState } from 'react';
import {
  IonItem,
  IonButton,
  IonLabel,
  IonTextarea
} from '@ionic/react';
import { supabase } from '../../../supabaseClient';
import styles from './styles.module.scss';

// Komponent for invitasjonsform i modalen
const InviteUserModalForm = ({ invitedUser, familyId, onInviteSent, onClose }) => {
  const [role, setRole] = useState('viewer');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Hent senderens bruker-id fra auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    
    const { error } = await supabase
      .from('family_requests')
      .insert({
        sender_id: user.id,
        receiver_id: invitedUser.id,
        family_id: familyId,
        role: role, // f.eks. "admin" eller "viewer"
        status: 'pending',
        message: message,
        child_id: null, 
      });
    if (error) {
      console.error('Feil ved sending av invitasjon:', error);
    } else {
      alert('Invitation sent!');
      if (onInviteSent) onInviteSent();
      onClose();
    }
    setLoading(false);
  };

  return (
    <form className="test-form double-test" onSubmit={handleSubmit} style={{ padding: '1rem' }}>
      <IonItem>
        <IonLabel>Chose role</IonLabel>
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
          className={styles.select}
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Message</IonLabel>
        <IonTextarea
          value={message}
          onIonInput={(e) => setMessage(e.detail.value)}
          placeholder="Write a message..."
        />
      </IonItem>
      <IonButton expand="block" type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send invite'}
      </IonButton>
    </form>
  );
};

export default InviteUserModalForm;