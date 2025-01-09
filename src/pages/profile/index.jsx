import { IonContent, IonButton, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useIonRouter } from '@ionic/react';

export default function ProfilePage() {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);

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
                <div>
                    {services.map((service) => (
                    <div key={service.id} style={{ border: '1px solid #ccc', margin: '1em', padding: '1em' }}>
                        <h3>{service.title}</h3>
                        <p>Pris: {service.price}</p>
                        {service.tags && service.tags.length > 0 && (
                        <p>Tags: {service.tags.join(', ')}</p>
                        )}
                    </div>
                    ))}
                </div>
                )}
                <div className="my-5">
                    <IonButton onClick={navigateToDetailsOnly}>
                        Add services
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    )
}