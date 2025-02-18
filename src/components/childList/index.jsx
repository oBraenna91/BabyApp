import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const MyChildrenList = ({ childrenList }) => {
  const history = useHistory();

  const handleCardClick = (childId) => {
    history.push(`/child-info/${childId}`);
  };

  return (
    <div>
      <h2>My Children</h2>
      {childrenList && childrenList.length > 0 ? (
        childrenList.map((member) => (
          <IonCard key={member.children.id} onClick={() => handleCardClick(member.children.id)}>
            <IonCardHeader>
              <IonCardTitle>{member.children.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Fødselsdato: {member.children.date_of_birth} <br />
              Relation: {member.relation}
            </IonCardContent>
          </IonCard>
        ))
      ) : (
        <p>No children found.</p>
      )}
    </div>
  );
};

export default MyChildrenList;