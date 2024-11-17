import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import '../Styles/ProfileMapModal.css';

const ProfileMapModal = ({ profile, onClose }) => {
  const mapContainerStyle = { width: '100%', height: '400px' };
  const center = { lat: profile.lat, lng: profile.lng };

  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDJCFhdRvC19mQ1_J5Op8z2XaBpjf8QOoo'
  });

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{profile.name}'s Location</h2>
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
          <Marker position={center} />
        </GoogleMap>
      </div>
    </div>
  );
};

export default ProfileMapModal;
