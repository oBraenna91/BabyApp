import React, { useState, useEffect } from 'react';
import { IonInput, IonItem, IonList, IonButton } from '@ionic/react';
import { supabase } from '../../supabaseClient';
import debounce from 'lodash/debounce';
import InviteUserModalForm from '../forms/inviteUserForm';
import BottomSheetModal from '../bottomSheetModal';
import styles from './styles.module.scss';

const InviteUser = ({ familyId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Funksjon for å hente brukere basert på søketerm
  const fetchUsers = async (term) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('users_public')
      .select('id, first_name, last_name, full_name')
      .ilike('full_name', `%${term}%`);
    if (error) {
      console.error('Feil under henting av brukere:', error);
    } else {
      setUsers(data);
    }
    setLoading(false);
  };

  // Debounce søk slik at det ikke trigges for ofte
  const debouncedFetch = debounce((term) => {
    if (term.trim() !== '') {
      fetchUsers(term);
    } else {
      setUsers([]);
    }
  }, 300);

  useEffect(() => {
    debouncedFetch(searchTerm);
    return () => debouncedFetch.cancel();
    //eslint-disable-next-line
  }, [searchTerm]);

  const openInviteModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  return (
    <div className={styles.parent}>
      <div className={styles.container1}>
        <div className={styles.label}>
            <div>Search for a user</div>
        </div>
        <div className={styles.input}>
            <IonInput
            className={styles.customInput}
            value={searchTerm}
            onIonInput={(e) => setSearchTerm(e.detail.value)}
            placeholder="Write name..."
            />
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {users.length > 0 && (
        <IonList>
          {users.map((user) => (
            <IonItem key={user.id}>
              <div style={{ flex: 1 }}>
                <p>{user.full_name}</p>
              </div>
              <IonButton onClick={() => openInviteModal(user)}>
                Invite
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      )}
      <BottomSheetModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Chose role & add a message"
      >
        {selectedUser && (
          <InviteUserModalForm
            invitedUser={selectedUser}
            familyId={familyId}
            onInviteSent={() => {
            }}
            onClose={() => setModalOpen(false)}
          />
        )}
      </BottomSheetModal>
    </div>
  );
};

export default InviteUser;