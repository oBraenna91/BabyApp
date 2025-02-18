import React from 'react';
import { supabase } from '../../supabaseClient';
import MultiStepForm from '../../components/forms/createUserForm';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, useIonRouter } from '@ionic/react';

const SetupUserPage = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Setup User</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
          <MultiStepForm onComplete={async (answers) => {
            const { data: { user } } = await supabase.auth.getUser();
            const { data: userEntry, error } = await supabase
              .from('users')
              .insert({
                id: user.id,
                first_name: answers[1],
                last_name: answers[2],    
              })
              .select('*')
              .single();
            if (error) {
              console.error('Feil ved oppretting av bruker:', error);
            } else {
              console.log('Bruker opprettet:', userEntry);
              alert('User updated! You can always change this information in the settings page.')
              router.push('/app', 'forward');
            }
          }} />
      </IonContent>
    </IonPage>
  );
};

export default SetupUserPage;
