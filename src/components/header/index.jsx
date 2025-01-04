import React from 'react';
import styles from './styles.module.scss';
import { FaHome, FaUser, FaEnvelope, FaSearch, FaCog } from 'react-icons/fa';
import { useIonRouter } from '@ionic/react';

export default function Header() {
  const router = useIonRouter();

  const navigate = (path) => {
    router.push(path, 'forward'); // Bruk 'forward' for å indikere fremover-animasjon
  };

  return (
    <div className={`${styles.navbar} col-12 d-flex align-items-center justify-content-center px-3`}>
      <div className={`${styles.innerBar} d-flex align-items-center justify-content-between rounded-4 px-4 py-3 col-12 bg-primary`}>
        <div onClick={() => navigate('/home')}>
          <FaHome className={`${styles.icon}`} />
        </div>
        <div onClick={() => navigate('/profile')}>
          <FaUser className={`${styles.icon}`} />
        </div>
        <div onClick={() => navigate('/messages')}>
          <FaEnvelope className={`${styles.icon}`} />
        </div>
        <div onClick={() => navigate('/discover')}>
          <FaSearch className={`${styles.icon}`} />
        </div>
        <div onClick={() => navigate('/settings')}>
          <FaCog className={`${styles.icon}`} />
        </div>
      </div>
    </div>
  );
}