import React, { useState } from 'react';
import '../Styles/ProfileDetailsModal.css';

const AddProfileModal = ({ onClose, onSave }) => {
  const [newProfile, setNewProfile] = useState({
    name: "",
    description: "",
    address: "",
    lat: "",
    lng: "",
    image: "", // Add image property
    interests: [],
    contact: {
      email: "",
      phone: ""
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('contact.')) {
      const contactField = name.split('.')[1];
      setNewProfile((prevProfile) => ({
        ...prevProfile,
        contact: {
          ...prevProfile.contact,
          [contactField]: value
        }
      }));
    } else {
      setNewProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value
      }));
    }
  };

  // Handle saving the new profile
  const handleSave = () => {
    const profileToSave = {
      ...newProfile,
      lat: newProfile.lat ? parseFloat(newProfile.lat) : 37.7749,
      lng: newProfile.lng ? parseFloat(newProfile.lng) : -122.4194,
    };

    onSave(profileToSave);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        
        <h2>Add Profile</h2>
        
        {/* Form fields for creating a new profile */}
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newProfile.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={newProfile.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="contact.email"
            value={newProfile.contact.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="contact.phone"
            value={newProfile.contact.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={newProfile.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Latitude:</label>
          <input
            type="number"
            name="lat"
            value={newProfile.lat}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Longitude:</label>
          <input
            type="number"
            name="lng"
            value={newProfile.lng}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label> {/* New input for image URL */}
          <input
            type="text"
            name="image"
            value={newProfile.image}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Interests:</label>
          <input
            type="text"
            name="interests"
            value={newProfile.interests.join(', ')}
            onChange={(e) =>
              setNewProfile((prevProfile) => ({
                ...prevProfile,
                interests: e.target.value.split(',').map((item) => item.trim())
              }))
            }
          />
        </div>
        
        <button className="save-button" onClick={handleSave}>Save</button>
        <button className="cancel-button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddProfileModal;



