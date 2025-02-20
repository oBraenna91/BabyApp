// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { IonPage, IonHeader, IonButtons, IonBackButton, IonToolbar, IonTitle, IonContent } from '@ionic/react';
// import { supabase } from '../../supabaseClient';

// const ChildInfoPage = () => {
//   // Hent barnets id fra URL-parametere (f.eks. /child/childId)
//   const { childId } = useParams();
//   const [childData, setChildData] = useState(null);
//   const [events, setEvents] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!childId) return;

//     // Hent barnets detaljer
//     const fetchChildDetails = async () => {
//       const { data, error } = await supabase
//         .from('children')
//         .select('*')
//         .eq('id', childId)
//         .single();
//       if (error) {
//         console.error('Feil ved henting av barn:', error);
//         setError(error);
//       } else {
//         setChildData(data);
//       }
//     };

//     // Hent hendelser for barnet
//     const fetchChildEvents = async () => {
//       const { data, error } = await supabase
//         .from('child_events')
//         .select('*')
//         .eq('child_id', childId)
//         .order('event_date', { ascending: true });
//       if (error) {
//         console.error('Feil ved henting av hendelser:', error);
//         setError(error);
//       } else {
//         setEvents(data);
//       }
//     };

//     fetchChildDetails();
//     fetchChildEvents();
//   }, [childId]);

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar color="primary">
//             <IonButtons slot="start">
//                 <IonBackButton defaultHref="/app/myFamily"/>
//             </IonButtons>
//             <IonTitle>DETAILS</IonTitle>
//         </IonToolbar>
//     </IonHeader>
//       <IonContent className="ion-padding">
//         {childData ? (
//           <div>
//             <h2>{childData.name}</h2>
//             <p>Fødselsdato: {childData.date_of_birth}</p>
//           </div>
//         ) : (
//           <p>Laster barnedetaljer…</p>
//         )}

//         <h3>Hendelser</h3>
//         {events && events.length > 0 ? (
//           <ul>
//             {events.map(event => (
//               <li key={event.id}>
//                 <strong>{event.event_type}</strong>: {event.description} – {event.event_date}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>Ingen hendelser funnet.</p>
//         )}

//         {error && <p style={{ color: 'red' }}>Noe gikk galt: {error.message}</p>}
//       </IonContent>
//     </IonPage>
//   );
// };

// export default ChildInfoPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  IonPage, 
  IonHeader, 
  IonButtons, 
  IonBackButton, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton 
} from '@ionic/react';
import { supabase } from '../../supabaseClient';
import BottomSheetModal from '../../components/bottomSheetModal';
import CreateEventForm from '../../components/forms/createEvent';
import CreateMilestoneForm from '../../components/forms/createMilestone';

const ChildInfoPage = () => {
  const { childId } = useParams();
  const [childData, setChildData] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    if (!childId) return;

    const fetchChildDetails = async () => {
      const { data, error } = await supabase
        .from('children')
        .select('*')
        .eq('id', childId)
        .single();
      if (error) {
        console.error('Feil ved henting av barn:', error);
        setError(error);
      } else {
        setChildData(data);
      }
    };

    const fetchChildEvents = async () => {
      const { data, error } = await supabase
        .from('child_events')
        .select('*')
        .eq('child_id', childId)
        .order('event_date', { ascending: true });
      if (error) {
        console.error('Feil ved henting av hendelser:', error);
        setError(error);
      } else {
        setEvents(data);
      }
    };

    const fetchChildMilestones = async () => {
      const { data, error } = await supabase
        .from('child_milestones')
        .select('*')
        .eq('child_id', childId)
        .order('milestone_date', { ascending: true});
        if(error){
          console.error(error);
          setError(error);
        } else {
          setMilestones(data);
        }
    }

    fetchChildDetails();
    fetchChildEvents();
    fetchChildMilestones();
  }, [childId]);

  const handleOpenModal = (type) => setModalType(type);
  const handleCloseModal = () => setModalType(null);

  const handleEventCreated = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const handleMilestoneCreated = (newMilestone) => {
    setEvents((prevMilestones) => [...prevMilestones, newMilestone]);
  };

  return (
    <IonPage className="page-top-padding">
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/myFamily" />
          </IonButtons>
          <IonTitle>{childData ? childData.name : 'Child Details'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {childData ? (
          <div>
            <h2>{childData.name}</h2>
            <p>Date of Birth: {childData.date_of_birth}</p>
          </div>
        ) : (
          <p>Loading child's details…</p>
        )}
        <IonButton onClick={() => handleOpenModal("event")}>
          Create New Event
        </IonButton>

        <h3>🎉 Events 🎉</h3>
        {events && events.length > 0 ? (
          <ul>
            {events.map(event => (
              <li key={event.id}>
                <strong>{event.event_type}</strong>: {event.description} – {event.event_date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events found 😔</p>
        )}
        {error && <p style={{ color: 'red' }}>Something went wrong: {error.message}</p>}
        <h3>🎉 Milestones 🎉</h3>
        {milestones && milestones.length > 0 ? (
          <ul>
            {milestones.map(m => (
              <li key={m.id}>
                <strong>{m.name}</strong>: {m.description} – {m.milestone_date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No milestones found 😔</p>
        )}
        {error && <p style={{ color: 'red' }}>Something went wrong: {error.message}</p>}
        <IonButton onClick={() => handleOpenModal("milestone")}>
          Create New Milestone
        </IonButton>
        <BottomSheetModal
  isOpen={modalType !== null}
  onClose={handleCloseModal}
  onBackdropClick={handleCloseModal}
>
  {modalType === "event" && (
    <CreateEventForm 
      childId={childId} 
      onEventCreated={handleEventCreated}
      onClose={handleCloseModal} 
    />
  )}
  {modalType === "milestone" && (
    <CreateMilestoneForm 
      childId={childId} 
      onMilestoneCreated={handleMilestoneCreated}
      onClose={handleCloseModal} 
    />
  )}
</BottomSheetModal>
      </IonContent>
    </IonPage>
  );
};

export default ChildInfoPage;

