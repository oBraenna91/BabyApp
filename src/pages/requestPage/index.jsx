import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
import { supabase } from '../../supabaseClient';
import { useRequestCount } from '../../contexts/RequestCount';

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchCount } = useRequestCount();

  // Hent alle pending requests for den nåværende brukeren
  const fetchRequests = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    
    const { data, error } = await supabase
      .from('family_requests')
      .select('*')
      .eq('receiver_id', user.id)
      .eq('status', 'pending');
    
    if (error) {
      console.error('Error fetching requests:', error);
    } else {
      setRequests(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Når en invitasjon aksepteres, oppdateres både family_requests og family_members
  const handleAccept = async (request) => {
    // Oppdater status til accepted
    const { error: updateError } = await supabase
      .from('family_requests')
      .update({ status: 'accepted' })
      .eq('id', request.id);
    if (updateError) {
      console.error('Error updating request:', updateError);
      return;
    }
    // Legg mottakeren til i family_members
    const { data: { user } } = await supabase.auth.getUser();
    const { error: insertError } = await supabase
      .from('family_members')
      .insert({
        family_id: request.family_id,
        user_id: user.id,
        role: request.role,
      });
    if (insertError) {
      console.error('Error adding user to family_members:', insertError);
    }
    alert('You are now part of the family! Congratulations 🎉')
    fetchRequests();
    fetchCount();
  };

  // Avvis en invitasjon
  const handleReject = async (requestId) => {
    const { error } = await supabase
      .from('family_requests')
      .update({ status: 'rejected' })
      .eq('id', requestId);
    if (error) {
      console.error('Error rejecting request:', error);
    }
    alert('Invitation declined ⛔️')
    fetchRequests();
    fetchCount();
  };

  return (
    <IonPage>
        <IonHeader>
                <IonToolbar color="primary">
                  <IonButtons slot="start">
                    <IonBackButton defaultHref="/app/settings" />
                  </IonButtons>
                  <IonTitle>
                    Requests
                  </IonTitle>
                </IonToolbar>
              </IonHeader>
      <IonContent className="ion-padding">
        <h2>Pending Family Requests</h2>
        {loading ? (
          <p>Loading requests...</p>
        ) : requests.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          <IonList>
            {requests.map((req) => (
              <IonItem key={req.id}>
                <IonLabel>
                  {/* Her kan du vise mer informasjon hvis du har lagret for eksempel senderens navn */}
                  Invitation to join family <strong>{req.family_id}</strong> as <strong>{req.role}</strong>
                  <br />
                  Message: {req.message}
                </IonLabel>
                <IonButton color="success" onClick={() => handleAccept(req)}>
                  Accept
                </IonButton>
                <IonButton color="danger" onClick={() => handleReject(req.id)}>
                  Reject
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default RequestsList;