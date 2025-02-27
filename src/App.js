// import React from 'react';
// import { IonApp, IonRouterOutlet } from '@ionic/react';
// import { IonReactRouter } from '@ionic/react-router';
// import { Route } from 'react-router-dom';
// import LoginPage from './pages/login';
// import ResetPasswordPage from './pages/resetPassword';
// import SignUpPage from './pages/signUp';
// import Tabs from './components/tabsNavigation';
// import DetailsOnlyPage from './pages/detailsOnly';
// import ChildInfoPage from './pages/childDetails';
// import SetupUserPage from './pages/setupUser';

// function App() {
//   return (
//     <IonApp>
//       <IonReactRouter>
//           <IonRouterOutlet>
//             <Route exact path="/" component={LoginPage}/>
//             <Route path="/login" component={LoginPage}/>
//             <Route path="/reset-password" component={ResetPasswordPage}/>
//             <Route path="/sign-up" component={SignUpPage} />
//             <Route path="/detailsonly" component={DetailsOnlyPage}/>
//             <Route path="/setup-user" component={SetupUserPage} />
//             <Route path="/app" component={Tabs} />
//             <Route path="/child-info/:childId" component={ChildInfoPage}/>
//           </IonRouterOutlet>
//       </IonReactRouter>
//     </IonApp>
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import { IonApp, IonRouterOutlet } from '@ionic/react';
// import { IonReactRouter } from '@ionic/react-router';
// import { Route, Redirect } from 'react-router-dom';
// import { supabase } from './supabaseClient';
// import LoginPage from './pages/login';
// import ResetPasswordPage from './pages/resetPassword';
// import SignUpPage from './pages/signUp';
// import Tabs from './components/tabsNavigation';
// import DetailsOnlyPage from './pages/detailsOnly';
// import ChildInfoPage from './pages/childDetails';
// import SetupUserPage from './pages/setupUser';

// function App() {
//   const [loading, setLoading] = useState(true);
//   const [session, setSession] = useState(null);
//   const [profileExists, setProfileExists] = useState(false);

//   useEffect(() => {
//     const getSessionAndProfile = async () => {
//       const { data, error } = await supabase.auth.getSession();
//       if (error) {
//         console.error("Error checking session:", error);
//         setLoading(false);
//         return;
//       }
//       if (data?.session) {
//         setSession(data.session);
//         const { data: user, error: userError } = await supabase.auth.getUser();
//         if (userError || !user) {
//           setProfileExists(false);
//         } else {
//           const { data: profile } = await supabase
//             .from('users')
//             .select('*')
//             .eq('id', user.user.id) // Merk: user.user.id fordi getUser returnerer { user }
//             .single();
//           setProfileExists(!!profile);
//         }
//       }
//       setLoading(false);
//     };

//     getSessionAndProfile();

//     // Lytter etter endringer i auth state
//     const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
//       setSession(session);
//     });

//     return () => {
//       authListener.subscription.unsubscribe();
//     };
//   }, []);

//   if (loading) return null; // Eller en spinner

//   return (
//     <IonApp>
//       <IonReactRouter>
//         <IonRouterOutlet>
//           {session ? (
//             profileExists ? (
//               <>
//                 <Route path="/app" component={Tabs} />
//                 <Route path="/child-info/:childId" component={ChildInfoPage} />
//                 <Route path="/detailsonly" component={DetailsOnlyPage} />
//                 <Redirect exact from="/" to="/app" />
//               </>
//             ) : (
//               <>
//                 <Route path="/setup-user" component={SetupUserPage} />
//                 <Redirect exact from="/" to="/setup-user" />
//               </>
//             )
//           ) : (
//             <>
//               <Route exact path="/login" component={LoginPage} />
//               <Route path="/reset-password" component={ResetPasswordPage} />
//               <Route path="/sign-up" component={SignUpPage} />
//               <Redirect exact from="/" to="/login" />
//             </>
//           )}
//         </IonRouterOutlet>
//       </IonReactRouter>
//     </IonApp>
//   );
// }

// export default App;

import React from 'react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import LoginPage from './pages/login';
import ResetPasswordPage from './pages/resetPassword';
import SignUpPage from './pages/signUp';
import Tabs from './components/tabsNavigation';
import DetailsOnlyPage from './pages/detailsOnly';
import ChildInfoPage from './pages/childDetails';
import SetupUserPage from './pages/setupUser';
import { AuthProvider } from './contexts/auth';
import ProtectedRoute from './privateRoute/privateRoute';
import FamilyDetails from './pages/familyDetails';
import { RequestCountProvider } from './contexts/RequestCount';
import IndexRedirect from './pages/indexRedirect';

function App() {
  return (
    <IonApp>
      <AuthProvider>
        <RequestCountProvider>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route exact path="/" component={IndexRedirect} />
              <Route path="/login" component={LoginPage} />
              <Route path="/reset-password" component={ResetPasswordPage} />
              <Route path="/sign-up" component={SignUpPage} />
              <Route path="/detailsonly" component={DetailsOnlyPage} />
              {/* <Route path="/setup-user" component={SetupUserPage} />
              <Route path="/app" component={Tabs} />
              <Route path="/child-info/:childId" component={ChildInfoPage} /> */}
              <ProtectedRoute path="/setup-user" component={SetupUserPage} />
              <ProtectedRoute path="/app" component={Tabs} />
              <ProtectedRoute path="/child-info/:childId" component={ChildInfoPage} />
              <ProtectedRoute path="/family/:familyId" component={FamilyDetails} />
            </IonRouterOutlet>
          </IonReactRouter>
        </RequestCountProvider>
      </AuthProvider>
    </IonApp>
  );
}

export default App;