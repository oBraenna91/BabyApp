import React, { useState } from 'react';
import { IonButton } from '@ionic/react';
import { supabase } from '../../../supabaseClient';
import { useAuth } from '../../../contexts/auth';
const CreateFamilyForm = ({ onFamilyCreated }) => {
    const [familyName, setFamilyName] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { fetchProfile } = useAuth();
  
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
          });
        if (memberError) throw memberError;

        const { error: updateProfileError } = await supabase
        .from('users')
        .update({ primary_family_id: familyData.id })
        .eq('id', user.id);
      if (updateProfileError) throw updateProfileError;

      await fetchProfile(user);

      alert('Family created 🧑‍🧑‍🧒')
  
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
          <form className={`test-form double-test my-5 bottom-padding`} onSubmit={handleSubmit}>
            <label className="label-input-container">Family name</label>
            <input 
              type="text"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              required
              className='form-input'
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <IonButton type="submit" expand="block" disabled={loading}>
              {loading ? 'Creating...' : 'Create Family'}
            </IonButton>
          </form>
    );
  };
  

export default CreateFamilyForm;
