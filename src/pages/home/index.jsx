import React, { useState, useEffect } from 'react';
//import MultiStepForm from '../../components/forms/createUserForm';
import { IonPage, IonContent, IonList, IonRefresher, IonRefresherContent } from '@ionic/react';
import styles from './styles.module.scss';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../contexts/auth';
//import { useIonViewDidEnter } from '@ionic/react';
import FallBackImage from '../../visuals/images/profile (1).png';
import { formatRelativeTime } from '../../components/counter';

const HomePage = () => {

  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
      if (user) {
        fetchFeedItems();
      }
      //eslint-disable-next-line
    }, [user]);

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

  // useIonViewDidEnter(() => {
  //   if(user) fetchFeedItems();
  // });

  const handleRefresh = (event) => {
    setTimeout(() => {
      console.log("Data oppdatert!");
      event.detail.complete();
    }, 2000);
  };

  return (
    <IonPage className="page-padding">
      <IonContent style={{ '--padding-top': 'env(safe-area-inset-top)' }}>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <div className={styles.container}>
          <h1>Welcome to the app!</h1>
          {loading ? (
          <p>Loading feed...</p>
        ) : feedItems.length === 0 ? (
          <p>No recent events or milestones.</p>
        ) : (
          <IonList>
            {feedItems.map((item) => (
              <div className={styles.familyCard} key={item.id}>
                <div className={styles.imageContainer}>
                  <img className={styles.image} alt="profile" src={FallBackImage}/>
                </div>
                <div className={styles.col2}>
                  <div className={styles.top}>
                    <div className={styles.title}>{item.title || item.name || 'Untitled'}</div>
                    <div className={styles.time}>{formatRelativeTime(item.created_at)}</div>
                  </div>
                  <div className={styles.bottom}>
                    <div>{item.description || 'No description'}</div>
                  </div>
                </div>
              </div>
            ))}
          </IonList>
        )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;