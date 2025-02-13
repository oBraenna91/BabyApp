import React, { useState } from 'react';
import { supabase } from '../../../supabaseClient';

const CreateChildForm = () => {
    const [childName, setChildName] = useState('');
    const [dob, setDob] = useState('');

    async function handleCreateChild(e) {
        e.preventDefault();


        const {
            data: { user },
            error: userError
        } = await supabase.auth.getUser();

        console.log('user', user);

        if(userError || !user) {
            console.error('Bruker ikke logget inn eller feil ved henting av bruker', userError);
        }

        const { data: childData, error: childError } = await supabase
            .from('children')
            .insert({
                name: childName,
                date_of_birth: dob,
                created_by: user.id
            })
            .select('*')
            .single();


            console.log(childData);


            if(childError) {
                console.error('Feil ved opprettelse av barn', childError);
                return;
            }

        const { data: memberData, error: memberError } = await supabase
            .from('child_members')
            .insert({
                user_id: user.id,
                child_id: childData.id,
                role: 'admin'
            })
            .select('*')
            .single();

            console.log(memberData);

            if(memberError) {
                console.error('Feil ved opprettelse av medlem (admin-roll)', memberError);
                return;
            }

            console.log('Barn opprettet:', childData);
            console.log('Admin-role lagt til for bruker:', memberData);

            setChildName('');
            setDob('');
    }

    return(
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

            <button className="submit-button" type="submit">Create child</button>
            <div className="bottom-sheet-content"></div>
        </form>
    )
}

export default CreateChildForm;