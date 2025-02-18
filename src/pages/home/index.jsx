// import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
// import React from 'react';
// import styles from './styles.module.scss';

// export default function HomePage() {

//     return(
//         <IonPage className="page-top-padding">
//             <IonHeader>
//                 <IonToolbar>
//                     <IonTitle>HOME</IonTitle>
//                 </IonToolbar>
//             </IonHeader>
//             <IonContent className="main-container">
//                 <div className='d-flex flex-column align-items-center pt-4'>
//                     <div className={`${styles.overskrift} text-center col-11`}>FEED WILL COME HERE</div>
//                 </div>
//             </IonContent>
//         </IonPage>
//     )
// }

// import React, { useEffect, useState } from 'react';
// import { supabase } from '../../supabaseClient';
// import MultiStepForm from '../../components/forms/createUserForm';
// import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, useIonRouter } from '@ionic/react';
// import styles from './styles.module.scss';

// const HomePage = () => {
//   const [profileExists, setProfileExists] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useIonRouter();

//   useEffect(() => {
//     const checkProfile = async () => {
//       const { data: { user }, error: userError } = await supabase.auth.getUser();
//       if (userError || !user) {
//         console.error('Feil ved henting av bruker:', userError);
//         setLoading(false);
//         return;
//       }

//       const { data, error } = await supabase
//         .from('users')
//         .select('*')
//         .eq('id', user.id)
//         .single();

//       if (error || !data) {
//         console.log('Ingen brukerprofil funnet.');
//         setProfileExists(false);
//       } else {
//         console.log('true')
//         setProfileExists(true);
//       }
//       setLoading(false);
//     };

//     checkProfile();
//   }, []);

//   if(!profileExists) {
//     router.push('/setup-user', 'forward');
//   }

//   if (loading) {
//     return (
//       <IonPage>
//         <IonContent>
//           <p>Laster...</p>
//         </IonContent>
//       </IonPage>
//     );
//   }

// //   if (!profileExists) {
// //     return (
// //       <IonPage>
// //         <IonContent className={styles.fullContainer}>
// //           <MultiStepForm
// //             onComplete={async (answers) => {
// //               const { data: { user } } = await supabase.auth.getUser();
// //               const { data: userEntry, error } = await supabase
// //                 .from('users')
// //                 .insert({
// //                   id: user.id,
// //                   first_name: answers[1],
// //                   last_name: answers[2], 
// //                 })
// //                 .select('*')
// //                 .single();
// //               if (error) {
// //                 console.error('Feil ved oppretting av bruker:', error);
// //               } else {
// //                 console.log('Bruker opprettet:', userEntry);
// //               }
// //             }}
// //           />
// //         </IonContent>
// //       </IonPage>
// //     );
// //   }

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>Home</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent className="ion-padding">
//         <p>Velkommen til appen!</p>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default HomePage;

import React from 'react';
//import MultiStepForm from '../../components/forms/createUserForm';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
//import styles from './styles.module.scss';

const HomePage = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Welcome to the app!</p>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;