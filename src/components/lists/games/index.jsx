import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import styles from './styles.module.scss';

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching games:', error.message);
      } else {
        setGames(data);
      }
      setLoading(false);
    };

    fetchGames();
  }, []);

  return (
    <div>
      <h2>Grener</h2>
        <div className={styles.cardsContainer}>
            {loading ? (
                <p>Laster grener...</p>
            ) : (
                games.map((game) => (
                <div key={game.id} className={`${styles.card} rounded-5 p-3 d-flex flex-column align-items-center`}>
                    <div
                        className={styles.imageParent}
                        style={{ backgroundImage: `url(${game.picture_url})` }}
                    ></div>
                    <h3 className="text-center">{game.title}</h3>
                </div>
                ))
            )}
        </div>
    </div>
  );
};

export default GamesList;
