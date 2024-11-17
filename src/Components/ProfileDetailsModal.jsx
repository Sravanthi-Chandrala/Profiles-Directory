import React, { useState } from 'react';
import '../Styles/ProfileDetailsModal.css';

const ProfileDetailsModal = ({ profile, onClose, onSave }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
      contact: {
        ...prevProfile.contact,
        [name.startsWith('contact.') ? name.split('.')[1] : name]: value
      }
    }));
  };

  // Handle saving the edited profile
  const handleSave = () => {
    onSave(editedProfile);
    setIsEditMode(false); 
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        
        {!isEditMode ? (
          
          <>
            <h2>{profile.name}</h2>
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p>Email: {profile.contact.email}</p>
              <p>Phone: {profile.contact.phone}</p>
            </div>
            <div className="location-info">
              <h3>Location</h3>
              <p>Address: {profile.address}</p>
              <p>Latitude: {profile.lat}</p>
              <p>Longitude: {profile.lng}</p>
            </div>
            <div className="interests">
              <h3>Interests</h3>
              {profile.interests.map((interest, index) => (
                <span key={index} className="interest-tag">{interest}</span>
              ))}
            </div>
            <button className="edit-button" onClick={() => setIsEditMode(true)}>Edit</button>
          </>
        ) : (
          
          <>
            <h2>Edit Profile</h2>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editedProfile.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="contact.email"
                value={editedProfile.contact.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="tel"
                name="contact.phone"
                value={editedProfile.contact.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={editedProfile.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Latitude:</label>
              <input
                type="number"
                name="lat"
                value={editedProfile.lat}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Longitude:</label>
              <input
                type="number"
                name="lng"
                value={editedProfile.lng}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Interests:</label>
              <input
                type="text"
                name="interests"
                value={editedProfile.interests.join(', ')}
                onChange={(e) => setEditedProfile({
                  ...editedProfile,
                  interests: e.target.value.split(',').map(item => item.trim())
                })}
              />
            </div>
            <button className="save-button" onClick={handleSave}>Save</button>
            <button className="cancel-button" onClick={() => setIsEditMode(false)}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileDetailsModal;

