import React, { useState } from 'react';
import ProfileDetailsModal from './ProfileDetailsModal';
import ProfileMapModal from './ProfileMapModal';
import AddProfileModal from './AddProfileModal';
import '../Styles/ProfileViewer.css';

const ProfileViewer = () => {
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "John Doe",
      description: "Software Engineer",
      address: "123 Tech Street, San Francisco, CA",
      lat: 37.7749,
      lng: -122.4194,
      image: "https://images.pexels.com/photos/4965012/pexels-photo-4965012.jpeg",
      interests: ["Coding", "Hiking", "Photography"],
      contact: {
        email: "john@example.com",
        phone: "(555) 123-4567"
      }
    },
    {
      id: 2,
      name: "Jane Smith",
      description: "UX Designer",
      address: "456 Design Ave, New York, NY",
      lat: 40.7128,
      lng: -74.0060,
      image: "https://images.pexels.com/photos/832998/pexels-photo-832998.jpeg",
      interests: ["Design", "Art", "Travel"],
      contact: {
        email: "jane@example.com",
        phone: "(555) 987-6543"
      }
    }
  ]);

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showAddProfileModal, setShowAddProfileModal] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Filter profiles based on search term
  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (profile) => {
    setSelectedProfile(profile);
    setShowDetailsModal(true);
  };

  const handleViewMap = (profile) => {
    setSelectedProfile(profile);
    setShowMapModal(true);
  };

  const handleAddProfile = (newProfile) => {
    setProfiles([...profiles, { ...newProfile, id: profiles.length + 1 }]);
  };

  const handleEditProfile = (updatedProfile) => {
    setProfiles(profiles.map(p => (p.id === updatedProfile.id ? updatedProfile : p)));
  };

  const handleDeleteProfile = (id) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Profile Directory</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search profiles by name, description, or address..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isAdminMode && (
            <button className="add-button" onClick={() => setShowAddProfileModal(true)}>
              Add Profile
            </button>
          )}
        </div>
        <button
          className="admin-toggle"
          onClick={() => setIsAdminMode(!isAdminMode)}
        >
          {isAdminMode ? 'Exit Admin Mode' : 'Enter Admin Mode'}
        </button>
      </header>

      <div className="profile-grid">
        {filteredProfiles.map(profile => (
          <div key={profile.id} className="profile-card">
            {isAdminMode && (
              <div className="admin-controls">
                <button className="delete-button" onClick={() => handleDeleteProfile(profile.id)}>Delete</button>
                <button className="edit-button" onClick={() => {
                  setSelectedProfile(profile);
                  setShowDetailsModal(true);
                }}>Edit</button>
              </div>
            )}
            <div className="profile-header">
              <img src={profile.image} alt={profile.name} className="profile-image" />
              <h2 className="profile-name">{profile.name}</h2>
              <p className="profile-description">{profile.description}</p>
            </div>
            <div className="profile-footer">
              <button className="map-button" onClick={() => handleViewMap(profile)}>View on Map</button>
              <button className="details-button" onClick={() => handleViewDetails(profile)}>View Details</button>
            </div>
          </div>
        ))}
      </div>

      {showDetailsModal && (
        <ProfileDetailsModal
          profile={selectedProfile}
          onSave={selectedProfile ? handleEditProfile : handleAddProfile}
          onClose={() => setShowDetailsModal(false)}
        />
      )}

      {showMapModal && selectedProfile && (
        <ProfileMapModal
          profile={selectedProfile}
          onClose={() => setShowMapModal(false)}
        />
      )}

      {showAddProfileModal && (
        <AddProfileModal
          onSave={handleAddProfile}
          onClose={() => setShowAddProfileModal(false)}
        />
      )}
    </div>
  );
};

export default ProfileViewer;

