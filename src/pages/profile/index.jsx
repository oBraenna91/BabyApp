import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonButton, IonIcon, IonAlert } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useIonRouter } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';

export default function ProfilePage() {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const [serviceToDelete, setServiceToDelete] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
          setLoading(true);
          setErrorMsg(null);
          
          // 1. Hent den innloggede brukeren
          const {
            data: { user },
            error: userError,
          } = await supabase.auth.getUser();
    
          if (userError || !user) {
            setErrorMsg('Ingen bruker funnet eller feil ved henting av bruker.');
            setLoading(false);
            return;
          }
    
          // 2. Hent provider knyttet til den innloggede brukeren
          const { data: provider, error: providerError } = await supabase
            .from('providers')
            .select('id')
            .eq('user_id', user.id)
            .single();
    
          if (providerError || !provider) {
            setErrorMsg('Kunne ikke finne tilknyttet provider for brukeren.');
            setLoading(false);
            return;
          }
    
          // 3. Hent alle services for denne provideren
          const { data: servicesData, error: servicesError } = await supabase
            .from('services')
            .select('*')
            .eq('provider_id', provider.id);
    
          if (servicesError) {
            setErrorMsg('Feil ved henting av tjenester: ' + servicesError.message);
          } else {
            setServices(servicesData || []);
          }
    
          setLoading(false);
        };
    
        fetchServices();
      }, []);

      const router = useIonRouter();

    const navigateToDetailsOnly = () => {
        router.push('/detailsonly', 'forward');
    }

    const confirmDeleteService = (service) => {
        setServiceToDelete(service);
        setShowAlert(true);
      };

    const handleDeleteService = async () => {
    if (!serviceToDelete) return;

    const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceToDelete.id);

    if (error) {
        console.error('Feil ved sletting av tjeneste:', error.message);
        alert('Kunne ikke slette tjeneste: ' + error.message);
    } else {
        // Oppdater lokale tjenester etter sletting
        setServices(services.filter(service => service.id !== serviceToDelete.id));
        alert('Tjeneste slettet!');
    }

    // Nullstill tilstand
    setServiceToDelete(null);
    setShowAlert(false);
    };

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>MY SERVICES</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {loading && <p>Laster tjenester...</p>}
                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

                {!loading && !errorMsg && services.length === 0 && (
                <p>Ingen tjenester funnet for denne provider.</p>
                )}

                {!loading && services.length > 0 && (
                        <IonList>
                            {services.map((service) => (
                            <IonItemSliding key={service.id}>
                                <IonItem>
                                <IonLabel>
                                    <h3>{service.title}</h3>
                                    <p>Pris: {service.price}</p>
                                    {service.tags && service.tags.length > 0 && (
                                    <p>Tags: {service.tags.join(', ')}</p>
                                    )}
                                </IonLabel>
                                </IonItem>
                                <IonItemOptions side="end">
                                <IonItemOption color="danger" onClick={() => confirmDeleteService(service)}>
                                    <IonIcon slot="icon-only" icon={trashOutline} />
                                </IonItemOption>
                                </IonItemOptions>
                            </IonItemSliding>
                            ))}
                        </IonList>
                    )}
                <div className="my-5">
                    <IonButton onClick={navigateToDetailsOnly}>
                        Add services
                    </IonButton>
                </div>
                <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Bekreft sletting'}
          message={`Er du sikker på at du vil slette tjenesten "${serviceToDelete?.title}"?`}
          buttons={[
            {
              text: 'Avbryt',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                setShowAlert(false);
              },
            },
            {
              text: 'Slett',
              handler: () => {
                handleDeleteService();
              },
            },
          ]}
        />
            </IonContent>
        </IonPage>
    )
}