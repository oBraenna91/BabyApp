import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import LogoutButton from '../../components/logout-button';
import { supabase } from '../../supabaseClient';
import RequestsButton from '../../components/requestsButton';

export default function SettingsPage() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: user, error } = await supabase
                .from('users')
                .select('first_name, last_name')
                .eq('id', (await supabase.auth.getUser()).data?.user?.id)
                .single();

            if (error) {
                console.error("Error fetching user data:", error);
            } else {
                console.log(user);
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
                <div className="">
                    {userData ? (
                        <>
                            Name:<h2>{userData.first_name} {userData.last_name}</h2>
                        </>
                    ) : (
                        <p>Laster brukerinfo...</p>
                    )}
                    <div>
                    <RequestsButton />
                    </div>
                    <LogoutButton />
                </div>
            </IonContent>
        </IonPage>
    )
}