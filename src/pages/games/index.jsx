import { IonTitle, IonToolbar, IonPage, IonHeader, IonContent } from '@ionic/react';
import React from 'react';
import GamesList from '../../components/lists/games';
import useUserIsAdmin from '../../hooks/useIsAdmin';
import AddGameForm from '../../components/forms/addGame';

export default function GamesPage() {

    const isAdmin = useUserIsAdmin();

    if(isAdmin === null) {
        return(
            <div>Laster...</div>
        )
    }

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Games</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {isAdmin && (
                    <div>
                        <AddGameForm />
                    </div>
                )}
                <div className="">
                    <GamesList />
                </div>
            </IonContent>
        </IonPage>
    )
}