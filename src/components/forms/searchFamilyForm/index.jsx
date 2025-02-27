// SearchFamilyForm.jsx
import React, { useState, useEffect } from 'react';
import { IonInput, IonItem, IonList, IonLabel } from '@ionic/react';
import debounce from 'lodash/debounce';
import { supabase } from '../../../supabaseClient';

const SearchFamilyForm = ({ onFamilyRequestSent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFamilies = async (term) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('families')
      .select('*')
      .ilike('family_name', `%${term}%`);
    if (error) {
      console.error('Error fetching families:', error);
    } else {
      setFamilies(data);
    }
    setLoading(false);
  };

  // Debounce for å redusere antall kall
  useEffect(() => {
    const debouncedFetch = debounce(() => {
      if (searchTerm.trim() !== '') {
        fetchFamilies(searchTerm);
      } else {
        setFamilies([]);
      }
    }, 300);
    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [searchTerm]);

  // Når en bruker ønsker å be om å bli med i en familie
  const handleJoinRequest = async (family) => {
    // Hent senderens bruker-id
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase
      .from('family_requests')
      .insert({
        sender_id: user.id,
        receiver_id: null, // Her kan du la det stå null, eller om det er aktuelt, sette en annen verdi
        family_id: family.id,
        role: 'viewer',  // For eksempel, dersom man skal ha en default rolle
        status: 'pending',
        message: 'Request to join family'
      });
    if (error) {
      console.error('Error sending family request:', error);
    } else {
      alert('Family request sent!');
      if (onFamilyRequestSent) {
        onFamilyRequestSent(family);
      }
    }
  };

  return (
    <div className="test-form double-test" style={{ padding: '1rem' }}>
      <IonItem>
        <IonLabel>Søk etter familie</IonLabel>
        <IonInput
          value={searchTerm}
          onIonInput={(e) => setSearchTerm(e.detail.value)}
          placeholder="Skriv familienavn..."
        />
      </IonItem>
      {loading && <p>Loading...</p>}
      {families.length > 0 ? (
        <IonList>
          {families.map((fam) => (
            <IonItem key={fam.id} button onClick={() => handleJoinRequest(fam)}>
              <IonLabel>{fam.family_name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      ) : (
        <p>No families found.</p>
      )}
    </div>
  );
};

export default SearchFamilyForm;
