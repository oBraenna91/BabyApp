import React, { useState } from 'react';
//import MultiStepForm from '../../components/forms/createUserForm';
import { IonPage, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';
import styles from './styles.module.scss';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../contexts/auth';
import { useIonViewDidEnter } from '@ionic/react';

const HomePage = () => {

  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState([]);
  const { user } = useAuth();

  const fetchFeedItems = async () => {
    setLoading(true);
    try {
      const { data: memberships, error: memError } = await supabase
        .from('family_members')
        .select('family_id')
        .eq('user_id', user.id)
      if(memError) {
        throw memError;
      }
      const familyIds = memberships.map((m) => m.family_id);

      const { data:eventsData, error: eventsError } = await supabase
        .from('child_events')
        .select('*')
        .in('family_id', familyIds)
        .order('created_at', {ascending: false});
      if(eventsError) throw eventsError;

      const { data:mileStonesData, error: mileStonesError } = await supabase
        .from('child_milestones')
        .select('*')
        .in('family_id', familyIds)
        .order('created_at', {ascending: false});
      if(mileStonesError) throw mileStonesError;

      const combinedFeed = [...(eventsData || []), ...(mileStonesData || [])];
      combinedFeed.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));

      setFeedItems(combinedFeed);
    } catch(error) {
      console.error(error);
    }
    setLoading(false);
  }

  useIonViewDidEnter(() => {
    if(user) fetchFeedItems();
  });

  return (
    <IonPage>
      <IonContent style={{ '--padding-top': 'env(safe-area-inset-top)' }}>
        <div className={styles.container}>
          <h1>Welcome to the app!</h1>
          {loading ? (
          <p>Loading feed...</p>
        ) : feedItems.length === 0 ? (
          <p>No recent events or milestones.</p>
        ) : (
          <IonList>
            {feedItems.map((item) => (
              <IonItem key={item.id}>
                <IonLabel>
                  <h3>{item.title || item.name || 'Untitled'}</h3>
                  <p>{item.description || 'No description'}</p>
                  <small>{new Date(item.created_at).toLocaleString()}</small>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;