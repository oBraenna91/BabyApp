import React, { useState, useEffect } from 'react';
import { IonButton, IonList, IonItem, IonLabel, IonItemSliding, IonItemOption, IonItemOptions } from '@ionic/react';
import BottomSheetModal from '../bottomSheetModal';
import CreateFamilyForm from '../forms/createFamilyForm';
import SearchFamilyForm from '../forms/searchFamilyForm';
import { useIonRouter } from '@ionic/react';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../contexts/auth';
//import { useIonViewDidEnter } from '@ionic/react';
import EditFamilyMemberForm from '../forms/editFamilyMemberForm';
import styles from './styles.module.scss';
import FallBackImage from '../../visuals/images/profile (1).png';

export default function MyFamilyList() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [memberToEdit, setMemberToEdit] = useState(null);
  const [primaryFamily, setPrimaryFamily] = useState(null);
  const [connectedFamilies, setConnectedFamilies] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useIonRouter();
  const { user, profile } = useAuth();

  useEffect(() => {
    if (user) {
      fetchFamilies();
    }
    //eslint-disable-next-line
  }, [user]);

    const fetchFamilies = async () => {
      setLoading(true);
      if (!user) {
        setLoading(false);
        return;
      }
      
      const { data: memberships, error: membershipsError } = await supabase
        .from('family_members')
        .select('family_id, role')
        .eq('user_id', user.id);
      if (membershipsError) {
        console.error('Feil ved henting av medlemskap', membershipsError);
        setLoading(false);
        return;
      }
      
      const primaryFamilyId = profile?.primary_family_id;
      if (primaryFamilyId) {
        const { data: familyData, error: familyError } = await supabase
          .from('families')
          .select('*')
          .eq('id', primaryFamilyId)
          .single();
        if (familyError) {
          console.error('Feil ved henting av primær familie', familyError);
        } else {
          setPrimaryFamily(familyData);
          fetchMembers(familyData.id);
        }
      }
      
      const connected = memberships.filter(m => m.family_id !== primaryFamilyId);
      if (connected.length > 0) {
        const { data: familiesData, error: connectedError } = await supabase
          .from('families')
          .select('*')
          .in('id', connected.map(m => m.family_id));
        if (connectedError) {
          console.error('Feil ved henting av tilknyttede familier', connectedError);
        } else {
          setConnectedFamilies(familiesData);
        }
      }
      setLoading(false);
    };

    const fetchMembers = async (familyId) => {
      const { data: membersData, error: membersError } = await supabase
        .from('family_members')
        .select('user_id, users ( id, first_name, last_name )')
        .eq('family_id', familyId);
      if (membersError) {
        console.error('Feil ved henting av familiemedlemmer', membersError);
      } else {
        setMembers(membersData);
      }
    };

    // useIonViewDidEnter(() => {
    //   if(user){
    //     fetchFamilies();
    //   }
    // })

  const handleFamilyCreated = (newFamily) => {
    setPrimaryFamily(newFamily);
    setShowModal(false);
  };

  const handleFamilyRequestSent = (selectedFamily) => {
    setShowModal(false);
  };

  const openCreateFamily = () => {
    setModalContent('create');
    setShowModal(true);
  };

  const openSearchFamily = () => {
    setModalContent('search');
    setShowModal(true);
  };

  const handleFamilyClick = (familyId) => {
    router.push(`/app/myfamily/family/${familyId}`, 'forward');
  };

  const handleEdit = (member) => {
    setMemberToEdit(member);
    setModalContent('edit');
    setShowModal(true);
  };

  const handleDelete = async (member) => {
    setMembers(prev => prev.filter(m => m.users.id !== member.users.id));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>My Family</h2>
      {primaryFamily ? (
        <>
          <div onClick={() => handleFamilyClick(primaryFamily.id)}>
            <div className={styles.familyCard}>
              <div className={styles.familyName}>{primaryFamily.family_name}</div>
              <div className={styles.arrow}></div>
            </div>
          </div>
          <h4>Family Members:</h4>
          {members && members.length > 0 ? (
            <div>
              {members.map(member => (
                <IonItemSliding key={member.users.id} 
                className={styles.notificationItem}
                >
                  <IonItem lines="none" 
                  className={styles.notificationContent}
                  >
                    <IonLabel>
                      <div 
                        className={styles.notificationText}
                      >
                        <div className={styles.imageContainer}><img src={FallBackImage} className={styles.image} alt="Profile" /></div>
                        <div className={styles.name}>
                          {member.users.first_name} {member.users.last_name}
                        </div>
                      </div>
                    </IonLabel>
                  </IonItem>
                  <IonItemOptions className={styles.options} side="end">
                    <IonItemOption color="primary" onClick={() => handleEdit(member)}>
                      Edit
                    </IonItemOption>
                    <IonItemOption color="danger" onClick={() => handleDelete(member)}>
                      Delete
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              ))}
            </div>
            
          ) : (
            <p>No family members found.</p>
          )}
        </>
      ) : (
        <>
          <p>You are not part of any primary family yet.</p>
          <IonButton onClick={openCreateFamily}>Create Family</IonButton>
          <IonButton onClick={openSearchFamily}>Search Family</IonButton>
        </>
      )}

      <h2>Connected Families</h2>
      {connectedFamilies && connectedFamilies.length > 0 ? (
        <IonList>
          {connectedFamilies.map((fam) => (
            <div className={styles.familyCard} onClick={() => handleFamilyClick(fam.id)}>
              <div className={styles.familyName}>{fam.family_name}</div>
              <div className={styles.arrow}></div>
            </div>
            // <IonItem key={fam.id} button onClick={() => handleFamilyClick(fam.id)}>
            //   <IonLabel>{fam.family_name}</IonLabel>
            // </IonItem>
          ))}
        </IonList>
      ) : (
        <p>No connected families.</p>
      )}
      <BottomSheetModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onBackdropClick={() => setShowModal(false)}
        title={
          modalContent === 'create'
            ? "Create Family"
            : modalContent === 'search'
            ? "Search Family"
            : modalContent === 'edit'
            ? "Edit Family Member"
            : ""
        }
      >
        {modalContent === 'create' && (
          <CreateFamilyForm onFamilyCreated={handleFamilyCreated} />
        )}
        {modalContent === 'search' && (
          <SearchFamilyForm onFamilyRequestSent={handleFamilyRequestSent} />
        )}
        {modalContent === 'edit' && memberToEdit && (
          <EditFamilyMemberForm 
            member={memberToEdit} 
            onClose={() => setShowModal(false)} 
            onUpdate={(updatedMember) => {
              setMembers(prev =>
                prev.map(m => m.users.id === updatedMember.users.id ? updatedMember : m)
              );
              setShowModal(false);
            }}
          />
        )}
      </BottomSheetModal>
    </div>
  );
}