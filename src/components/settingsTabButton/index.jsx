import React from 'react';
import { IonIcon, IonBadge } from '@ionic/react';
import UserIcon from '../../visuals/icons/user (4).svg';
import { useRequestCount } from '../../contexts/RequestCount';

const SettingsTabButton = () => {
//   const [count, setCount] = useState(0);

//   const fetchRequestCount = async () => {
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) return;
//     const { error, count: requestCount } = await supabase
//       .from('family_requests')
//       .select('id', { count: 'exact', head: true })
//       .eq('receiver_id', user.id)
//       .eq('status', 'pending');
//     if (error) {
//       console.error('Error fetching request count:', error);
//     } else {
//       setCount(requestCount ?? 0);
//     }
//   };

//   useEffect(() => {
//     fetchRequestCount();
//   }, []);

const { count } = useRequestCount();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      <IonIcon src={UserIcon} 
        style={{ width: '30px', height: '30px' }} 
        />
      {count > 0 && (
        <IonBadge
          color="danger"
          style={{
            position: 'absolute',
            top: '0.2rem',
            right: '3rem',
            fontSize: '1em'
          }}
        >
          {count}
        </IonBadge>
      )}
    </div>
  );
};

export default SettingsTabButton;
