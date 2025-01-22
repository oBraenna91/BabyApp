import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import styles from './styles.module.scss';
import AddGameForm from '../../forms/addGame';
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding } from '@ionic/react';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import BottomSheetModal from '../../bottomSheetModal';

const GamesList = ({ isAdmin }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bottomsSheetModalOpen, setBottomSheetModalOpen] = useState(false);

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

  const openBottomSheetModal = () => {
    setBottomSheetModalOpen(true);
  }

  const handleModalClose = () => {
    setBottomSheetModalOpen(false);
  };

  if(isAdmin) {
    return(
        <div>
            <div className={styles.adminCardsContainer}>
                <div onClick={openBottomSheetModal}>
                    Legg til ny gren
                </div>
                {loading ? (
                    <p>Laster grener...</p>
                ) : (
                    games.map((game) => (
                    <div key={game.id} className={`d-flex flex-column align-items-center`}>
                        <IonItemSliding className={`${styles.adminCard} col-10 shadow rounded-5`} key={game.id}>
                            <IonItem lines="none" className={`${styles.flexContainer}`} style={{ backgroundImage: `url(${game.picture_url})` }}>
                            </IonItem>
                            <IonItemOptions className="rounded-5" side="end">
                                <IonItemOption className={styles.roundedLeft} color="primary">
                                <IonIcon slot="icon-only" icon={pencilOutline} />
                                </IonItemOption>
                                <IonItemOption className={styles.roundedRight} color="danger">
                                <IonIcon slot="icon-only" icon={trashOutline} />
                                </IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>
                        <h3 className="text-center">{game.title}</h3>
                    </div>
                    ))
                )}
            </div>
            <BottomSheetModal title="Legg til ny gren" isOpen={bottomsSheetModalOpen} onClose={handleModalClose} onBackdropClick={handleModalClose} breakpoints={[0.95]} initialBreakpointIndex={1}>
                <AddGameForm />
            </BottomSheetModal>
        </div>
    )
  }

  return (
    <div>
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
