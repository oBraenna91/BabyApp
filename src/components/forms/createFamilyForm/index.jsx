import React, { useState } from 'react';
import { IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import { supabase } from '../../../supabaseClient';
const CreateFamilyForm = ({ onFamilyCreated }) => {
    const [familyName, setFamilyName] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setLoading(true);
  
      try {
        // Opprett en ny familie i families-tabellen
        const { data: familyData, error: familyError } = await supabase
          .from('families')
          .insert({ family_name: familyName })
          .select()
          .single();
        if (familyError) throw familyError;
  
        // Hent nåværende bruker fra auth
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) throw userError || new Error("Bruker ikke funnet");
  
        // Legg til brukeren i family_members som admin med en passende relasjon
        const { error: memberError } = await supabase
          .from('family_members')
          .insert({
            family_id: familyData.id,
            user_id: user.id,
            role: 'admin',
            relation: 'founder'  // Kan endres til et passende begrep
          });
        if (memberError) throw memberError;
  
        // Kall callback for å informere om at familien er opprettet
        if (onFamilyCreated) {
          onFamilyCreated(familyData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    return (
          <form className={`test-form bottom-padding`} onSubmit={handleSubmit}>
            <IonItem>
              <IonLabel position="stacked">Family Name</IonLabel>
              <IonInput
                value={familyName}
                onIonChange={(e) => setFamilyName(e.detail.value)}
                required
              />
            </IonItem>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <IonButton type="submit" expand="block" disabled={loading}>
              {loading ? 'Creating...' : 'Create Family'}
            </IonButton>
          </form>
    );
  };
  

export default CreateFamilyForm;
