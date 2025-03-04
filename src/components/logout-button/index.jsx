import React from 'react';
import { supabase } from '../../supabaseClient';
import { useIonRouter } from '@ionic/react';
import { IonButton } from '@ionic/react';
import styles from './styles.module.scss';

export default function LogoutButton() {
    const router = useIonRouter();

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to log out?');

    if (confirmed) {
      await supabase.auth.signOut();
      alert('You are now logged out!')
      router.push('/login', 'back');
    }
  };

  return <IonButton className={styles.button} onClick={handleLogout}>Log out</IonButton>
}