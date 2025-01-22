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
                <div key={game.id} className={`${styles.card} rounded-5 p-3`}>
                    <h3>{game.title}</h3>
                    <p>{game.description}</p>
                    <p>Type: {game.type}</p>
                    <p>Historisk: {game.is_historical ? 'Ja' : 'Nei'}</p>
                    <p>Kombiner runder: {game.combine_rounds ? 'Ja' : 'Nei'}</p>
                    <p>Poengtype: {game.score_type}</p>
                </div>
                ))
            )}
        </div>
    </div>
  );
};

export default GamesList;
