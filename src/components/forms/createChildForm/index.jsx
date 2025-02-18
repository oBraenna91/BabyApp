import React, { useState } from 'react';
import { supabase } from '../../../supabaseClient';

const CreateChildForm = ({ onChildCreated, onClose }) => {
  const [childName, setChildName] = useState('');
  const [dob, setDob] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreateChild(e) {
    e.preventDefault();
    setIsLoading(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Feil ved henting av bruker', userError);
      setIsLoading(false);
      return;
    }

    const { data: childData, error: childError } = await supabase
      .from('children')
      .insert({
        name: childName,
        date_of_birth: dob,
        created_by: user.id,
      })
      .select('*')
      .single();

    if (childError) {
      console.error('Feil ved opprettelse av barn', childError);
      alert('Wops! Something went wrong!');
      setIsLoading(false);
      return;
    }

    //eslint-disable-next-line
    const { data: memberData, error: memberError } = await supabase
      .from('child_members')
      .insert({
        user_id: user.id,
        child_id: childData.id,
        role: 'admin',
      })
      .select('*')
      .single();

    if (memberError) {
      console.error('Feil ved opprettelse av medlem (admin-roll)', memberError);
      setIsLoading(false);
      return;
    }

    alert('Child created!');
    setIsLoading(false);
    setChildName('');
    setDob('');

    if (onChildCreated) {
      onChildCreated(childData);
    }
    if (onClose) {
      onClose();
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form className="test-form col-10 m-auto" onSubmit={handleCreateChild}>
      <label className="label-input-container">Name</label>
      <input
        type="text"
        value={childName}
        onChange={(e) => setChildName(e.target.value)}
        required
        className="form-input"
      />

      <label className="label-input-container">Date of birth</label>
      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        className="form-input"
      />

      <button className="submit-button" type="submit">
        Create child
      </button>
      <div className="bottom-sheet-content"></div>
    </form>
  );
};

export default CreateChildForm;