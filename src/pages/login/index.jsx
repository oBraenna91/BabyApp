import React from 'react';
import { IonContent, IonPage, useIonRouter } from '@ionic/react';
import LoginForm from '../../components/forms/loginForm';
import styles from './styles.module.scss';
//import { supabase } from '../../supabaseClient';

export default function LoginPage() {
  const router = useIonRouter();
  //const [loading, setLoading] = useState(false);
  //const [redirected, setRedirected] = useState(false);

  // useEffect(() => {
  //   const checkUserSession = async () => {
  //     setLoading(true);
  //     const { data, error } = await supabase.auth.getSession();
  
  //     if (error) {
  //       console.error("Error checking session:", error);
  //       setLoading(false);
  //       return;
  //     }
  
  //     if (data?.session && !redirected) {
  //       // Hent brukerinfo
  //       const { data: { user } } = await supabase.auth.getUser();
        
  //       // Sjekk om brukerprofil finnes i "users"-tabellen
  //       const { data: profile, error: profileError } = await supabase
  //         .from('users')
  //         .select('*')
  //         .eq('id', user.id)
  //         .single();
  
  //       if (profileError || !profile) {
  //         router.push('/setup-user', 'forward');
  //       } else {
  //         router.push('/app', 'root');
  //       }
  //       setRedirected(true); // Sett flagget slik at vi ikke gjør redirect igjen
  //     } else {
  //       setLoading(false);
  //     }
  //   };
  
  //   checkUserSession();
  // }, [router, redirected]);

  // useEffect(() => {
  //   const checkUserSession = async () => {
  //     setLoading(true);
  //     const { data, error } = await supabase.auth.getSession();
  
  //     if (error) {
  //       console.error("Error checking session:", error);
  //       setLoading(false);
  //       return;
  //     }
  
  //     if (data?.session) {
  //       // Hent brukerinfo
  //       const { data: { user } } = await supabase.auth.getUser();
        
  //       // Sjekk om brukerprofil finnes i "users"-tabellen
  //       const { data: profile, error: profileError } = await supabase
  //         .from('users')
  //         .select('*')
  //         .eq('id', user.id)
  //         .single();
  
  //       if (profileError || !profile) {
  //         router.push('/setup-user', 'forward');
  //       } else {
  //         router.push('/app', 'root');
  //       }
  //     } else {
  //       setLoading(false);
  //     }
  //   };
  
  //   checkUserSession();
  // }, [router]);
  

  const redirectToSignUpPage = () => {
    router.push('/sign-up', 'forward'); // Naviger til sign-up siden med forward-animasjon
  };

  const redirectToForgotPassword = () => {
    router.push('/reset-password', 'forward'); // Naviger til reset-password siden med forward-animasjon
  };

  //if (loading) return null; 

  return (
    <IonPage className="page-top-padding">
        <IonContent style={{ '--padding-top': 'env(safe-area-inset-top)' }}>
            <div>
                <h1 className="text-center">LOG IN</h1>
                <LoginForm />
                <div className={`${styles.forgotPasswordContainer}`}>
                    <div>Forgot your password?</div>
                    <div className={styles.redirectWriting} onClick={redirectToForgotPassword}>
                    Click here
                    </div>
                </div>
                <div className={styles.signUpContainer}>
                    <div>Not yet signed up?</div>
                    <div className={styles.redirectWriting} onClick={redirectToSignUpPage}>
                    Click here
                    </div>
                </div>
            </div>
        </IonContent>
    </IonPage>
    
  );
}
