// import React, { useEffect, useState } from 'react';
// import { supabase } from './supabaseClient.js';
// import { Redirect } from 'react-router-dom';

// export default function ProtectedRoute({ children }) {
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSession = async () => {
//       const { data } = await supabase.auth.getSession();
//       setSession(data?.session || null);
//       setLoading(false);
//     };

//     fetchSession();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; 
//   }

//   if (!session) {
//     return <Redirect to="/login" />;
//   }

//   return <>{children}</>;
// }

// import React, { useEffect, useState } from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { supabase } from './supabaseClient';
// import Layout from './layout';

// export default function ProtectedRoute({ component: Component, ...rest }) {
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSession = async () => {
//       const { data } = await supabase.auth.getSession();
//       setSession(data?.session || null);
//       setLoading(false);
//     };
//     fetchSession();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         session ? (
//           <Layout>
//             <Component {...props} />
//           </Layout>
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
//   );
// }

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Layout from './layout';
import { useAuth } from './contexts/auth';

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { user, loading } = useAuth(); // <-- Bruker user og loading fra context

  if (loading) {
    return <div>Loading...</div>; // Viser spinner eller lignende
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

