import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import LogoutButton from '../../components/logout-button';
import { supabase } from '../../supabaseClient';

export default function SettingsPage() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: user, error } = await supabase
                .from('users')
                .select('first_name, last_name, auth_users:auth(email)')
                .eq('id', (await supabase.auth.getUser()).data?.user?.id)
                .single();

            if (error) {
                console.error("Error fetching user data:", error);
            } else {
                setUserData({
                    first_name: user?.first_name || '',
                    last_name: user?.last_name || '',
                    email: user?.auth_users?.email || ''
                });
            }
        };

        fetchUserData();
    }, []);

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>SETTINGS</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="col-12 d-flex flex-column align-items-center mt-5">
                    {userData ? (
                        <>
                            <h2>{userData.first_name} {userData.last_name}</h2>
                            <p>{userData.email}</p>
                        </>
                    ) : (
                        <p>Laster brukerinfo...</p>
                    )}
                    <LogoutButton />
                </div>
            </IonContent>
        </IonPage>
    )
}