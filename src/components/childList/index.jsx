import React, { useState, useEffect } from 'react';
import { IonCard, IonButton, IonSkeletonText , IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
//import { useHistory } from 'react-router-dom';
import styles from './styles.module.scss';
import CreateChildForm from '../forms/createChildForm';
import BottomSheetModal from '../bottomSheetModal';
import { supabase } from '../../supabaseClient';
import fallBackImage from '../../visuals/images/profile (1).png';
import { useIonRouter } from '@ionic/react';

const MyChildrenList = () => {
  //const history = useHistory();
  const [showCreateChildModal, setShowCreateChildModal] = useState(false);
  const [childrenList, setChildrenList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useIonRouter();

  const handleChildCardClick = (childId) => {
    //history.push(`/child-info/${childId}`);
    router.push(`/app/myfamily/child-info/${childId}`, 'forward')
  };

  const handleChildCreated = (newChild) => {
    const newMember = { relation: 'admin', children: newChild };
    setChildrenList((prevList) => [...prevList, newMember]);
  };

  useEffect(() => {
    const fetchUserChildren = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error('Feil ved henting av bruker', userError);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('child_members')
        .select(`
          relation,
          children ( id, name, date_of_birth, created_at )
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Feil ved henting av barn', error);
      } else {
        setChildrenList(data);
      }
      setLoading(false);
    };

    fetchUserChildren();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.headerContainer}>
        <h1>My Children</h1>
        <IonButton onClick={() => setShowCreateChildModal(true)}>
          Create New Child
        </IonButton>
      </div>
      <div className={styles.cardContainer}>
      {loading ? (
          <div className={styles.skeletonContainer}>
            {[1, 2, 3].map((item) => (
              <IonCard className={styles.card} key={item}>
                <IonCardHeader>
                  <IonCardTitle className={styles.imageContainer}>
                    <IonSkeletonText animated style={{ height: '100px', width: '100px' }} />
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonSkeletonText animated style={{ height: '20px', width: '50%' }} />
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        ) : childrenList && childrenList.length > 0 ? (
          childrenList.map((member) => (
            <IonCard className={styles.card} key={member.children.id}>
              <IonCardHeader>
                <IonCardTitle className={styles.imageContainer}>
                  <img className={styles.image} alt="profile" src={fallBackImage} />
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div>{member.children.name}</div>
                <IonButton 
                  color="primary" 
                  className={`border-radius-1 ${styles.button}`} 
                  onClick={() => handleChildCardClick(member.children.id)}
                >
                  View profile
                </IonButton>
              </IonCardContent>
            </IonCard>
          ))
        ) : (
          <p>No children found.</p>
        )}
      </div>
      <BottomSheetModal
          isOpen={showCreateChildModal}
          onClose={() => setShowCreateChildModal(false)}
          onBackdropClick={() => setShowCreateChildModal(false)}
        >
          <CreateChildForm
            onChildCreated={handleChildCreated}
            onClose={() => setShowCreateChildModal(false)}
          />
        </BottomSheetModal>
    </div>
  );
};

export default MyChildrenList;