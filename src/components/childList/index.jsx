import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const MyChildrenList = ({ onChildSelect, selectedChildId }) => {
  const [childrenList, setChildrenList] = useState([]);

  useEffect(() => {
    const fetchUserChildren = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error('Feil ved henting av bruker', userError);
        return;
      }

      const { data, error } = await supabase
        .from('child_members')
        .select(`
          relation,
          children ( id, name, date_of_birth, created_at )
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Feil ved henting av barn', error);
      } else {
        setChildrenList(data);
      }
    };

    fetchUserChildren();
  }, []);

  return (
    <div>
      <h2>My children</h2>
      {childrenList.length === 0 ? (
        <p>Ingen barn funnet.</p>
      ) : (
        <ul>
          {childrenList.map((member) => {
            const isSelected = selectedChildId === member.children.id;
            return (
              <li
                key={member.children.id}
                onClick={() => onChildSelect(member.children.id)}
                style={{ 
                  cursor: 'pointer',
                  fontWeight: isSelected ? 'bold' : 'normal',
                  backgroundColor: isSelected ? '#e0e0e0' : 'transparent'
                }}
              >
                {member.children.name} ({member.relation})
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MyChildrenList;
