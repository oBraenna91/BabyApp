import React, { useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { useAuth } from '../../../contexts/auth';

function CreateEventForm({ childId, onEventCreated, onClose }) {
    const [eventType, setEventType] = useState('');
    const [description, setDescription] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user, profile } = useAuth();
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
      const { data: eventData, error: eventError } = await supabase
        .from('child_events')
        .insert({
          child_id: childId,
          created_by: user.id,
          event_type: eventType,
          description: description,
          event_date: eventDate,
          family_id: familyId
        })
        .select('*')
        .single();
  
      if (eventError) {
        console.error('Feil ved opprettelse av hendelse', eventError);
        setIsLoading(false);
        return;
      }

      if (onEventCreated) {
        onEventCreated(eventData);
      }
  
      console.log('Event opprettet:', eventData);
      alert('Event created 🎉')
      setEventType('');
      setDescription('');
      setEventDate('');
      if (onClose) onClose();
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    return (
      <form className="test-form col-10 m-auto" onSubmit={handleCreateEvent}>
        <label className="label-input-container">Event type</label>
        <input
          type="text"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          placeholder="f.eks. 'first_step' eller 'birthday'"
          required
          className="form-input"
        />
  
        <label className="label-input-container">Event date</label>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="form-input"
        />
  
        <label className="label-input-container">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
        />
  
        <button className="submit-button" type="submit">Create Event</button>
      </form>
    );
  }
  
  export default CreateEventForm;