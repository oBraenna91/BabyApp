import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, useIonRouter } from '@ionic/react';
import LoginForm from '../../components/forms/loginForm';
import styles from './styles.module.scss';
import { supabase } from '../../supabaseClient';

export default function LoginPage() {
  const router = useIonRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkUserSession = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error checking session:", error);
      }

      if (data?.session) {
        router.push('/app', 'root'); 
      } else {
        setLoading(false);
      }
    };

    checkUserSession();
  }, [router]);

  const redirectToSignUpPage = () => {
    router.push('/sign-up', 'forward'); // Naviger til sign-up siden med forward-animasjon
  };

  const redirectToForgotPassword = () => {
    router.push('/reset-password', 'forward'); // Naviger til reset-password siden med forward-animasjon
  };

  if (loading) return null; 

  return (
    <IonPage className="page-top-padding">
        <IonContent>
            <div>
                <h1 className="text-center my-5">LOG IN</h1>
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
