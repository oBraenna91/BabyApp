import React, { useState } from 'react';
import { IonButton, IonList, IonItem, IonLabel } from '@ionic/react';
import BottomSheetModal from '../bottomSheetModal';
import CreateFamilyForm from '../forms/createFamilyForm';
import SearchFamilyForm from '../forms/searchFamilyForm';
import { useIonRouter } from '@ionic/react';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../contexts/auth';
import { useIonViewDidEnter } from '@ionic/react';

export default function MyFamilyList() {
  const [showFamilyModal, setShowFamilyModal] = useState(false);
  const [modalContent, setModalContent] = useState(null); // 'create' eller 'search'
  const [primaryFamily, setPrimaryFamily] = useState(null);
  const [connectedFamilies, setConnectedFamilies] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useIonRouter();
  const { user, profile } = useAuth();

    const fetchFamilies = async () => {
      setLoading(true);
      if (!user) {
        setLoading(false);
        return;
      }
      
      // Hent alle medlemskap for brukeren
      const { data: memberships, error: membershipsError } = await supabase
        .from('family_members')
        .select('family_id, role')
        .eq('user_id', user.id);
      if (membershipsError) {
        console.error('Feil ved henting av medlemskap', membershipsError);
        setLoading(false);
        return;
      }
      
      // Hent primærfamilie basert på profil
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
      
      // Finn tilknyttede familier der bruker er medlem, men som ikke er primær
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

useIonViewDidEnter(() => {
  if(user){
    fetchFamilies();
  }
})

  // Callback for når en familie opprettes
  const handleFamilyCreated = (newFamily) => {
    setPrimaryFamily(newFamily);
    setShowFamilyModal(false);
    // Eventuelt oppdater også brukerprofilen med primary_family_id her.
  };

  // Callback for når en family request er sendt/valgt fra søk
  const handleFamilyRequestSent = (selectedFamily) => {
    setShowFamilyModal(false);
    // Du kan vise en bekreftelse eller navigere til family details.
  };

  // Åpne modalen med "Create Family"
  const openCreateFamily = () => {
    setModalContent('create');
    setShowFamilyModal(true);
  };

  // Åpne modalen med "Search Family"
  const openSearchFamily = () => {
    setModalContent('search');
    setShowFamilyModal(true);
  };

  // Naviger til family-detaljer-siden ved klikk
  const handleFamilyClick = (familyId) => {
    router.push(`/family/${familyId}`, 'forward');
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
            <h3>{primaryFamily.family_name}</h3>
          </div>
          <h4>Family Members:</h4>
          {members && members.length > 0 ? (
            <IonList>
              {members.map((member) => (
                <IonItem key={member.users.id}>
                  <IonLabel>
                    {member.users.first_name} {member.users.last_name}
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
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
            <IonItem key={fam.id} button onClick={() => handleFamilyClick(fam.id)}>
              <IonLabel>{fam.family_name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      ) : (
        <p>No connected families.</p>
      )}

      <BottomSheetModal
        isOpen={showFamilyModal}
        onClose={() => setShowFamilyModal(false)}
        onBackdropClick={() => setShowFamilyModal(false)}
        title={modalContent === 'create' ? "Create Family" : "Search Family"}
      >
        {modalContent === 'create' ? (
          <CreateFamilyForm onFamilyCreated={handleFamilyCreated} />
        ) : (
          <SearchFamilyForm onFamilyRequestSent={handleFamilyRequestSent} />
        )}
      </BottomSheetModal>
    </div>
  );
}