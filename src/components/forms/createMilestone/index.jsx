import React, { useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { useAuth } from '../../../contexts/auth';

function CreateMilestoneForm({ childId, onMilestoneCreated, onClose }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [milestoneDate, setMilestoneDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { profile, user } = useAuth();
    const familyId = profile?.primary_family_id;
  
    async function handleCreateEvent(e) {
      e.preventDefault();
      setIsLoading(true);
  
      if (!user || !familyId) {
        console.error("Bruker er ikke logget inn eller primary_family_id mangler");
        setIsLoading(false);
        return;
      }
  
      // Opprett hendelse i child_events
      const { data: milestoneData, error: eventError } = await supabase
        .from('child_milestones')
        .insert({
          child_id: childId,
          created_by: user.id,
          family_id: familyId,
          name,
          description,
          milestone_date: milestoneDate
        })
        .select('*')
        .single();
  
      if (eventError) {
        console.error('Feil ved opprettelse av hendelse', eventError);
        setIsLoading(false);
        return;
      }

      if (onMilestoneCreated) {
        onMilestoneCreated(milestoneData);
      }
  
      console.log('Event opprettet:', milestoneData);
      alert('Milestone created 🏆')
      setName('');
      setDescription('');
      setMilestoneDate('');
      if (onClose) onClose();
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    return (
      <form className="test-form col-10 m-auto" onSubmit={handleCreateEvent}>
        <label className="label-input-container">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="f.eks. 'first_step' eller 'birthday'"
          required
          className="form-input"
        />
  
        <label className="label-input-container">Milestone date</label>
        <input
          type="date"
          value={milestoneDate}
          onChange={(e) => setMilestoneDate(e.target.value)}
          className="form-input"
        />
  
        <label className="label-input-container">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
        />
  
        <button className="submit-button" type="submit">Create Milestone</button>
      </form>
    );
  }
  
  export default CreateMilestoneForm;