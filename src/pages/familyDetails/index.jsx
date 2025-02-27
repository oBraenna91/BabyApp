import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { IonPage, IonHeader, IonButtons, IonBackButton, IonTitle, IonContent, IonToolbar } from '@ionic/react';
import InviteUser from '../../components/InviteUserDropdown';

export default function FamilyDetails() {
    const { familyId } = useParams();


    return(
        <IonPage className="page-top-padding">
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/myFamily" />
          </IonButtons>
          <IonTitle>
            {/* {childData ? childData.name : 'Child Details'} */}
            Family
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div>
            <InviteUser familyId={familyId} />
        </div>
      </IonContent>
    </IonPage>
    )
}