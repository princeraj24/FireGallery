import React from 'react';
import useFirestore from '../hooks/useFirestore';

const ProfilePanel = ({ user }) => {
  const { docs, loading } = useFirestore('images', user);

  if(loading){
    return (
      <div className="profile-grid">
        <div className="skeleton-stat"></div>
        <div className="skeleton-stat"></div>
        <div className="skeleton-stat"></div>
      </div>
    );
  }

  const totalUploads = docs.length;
  const favoriteCount = docs.filter(doc => doc.isFavorite).length;

  const categories = {};
  docs.forEach(doc => {
    const category = doc.category || 'Other';
    categories[category] = (categories[category] || 0) + 1;
  });

  const mostUsedCategory = Object.keys(categories).length
    ? Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b)
    : 'None';

  return (
    <div className="profile-panel">
      <div className="profile-hero">
        <div className="avatar large">
          {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
        </div>

        <div>
          <p className="eyebrow">USER PROFILE</p>
          <h2>{user.email}</h2>
          <p>Your private cloud gallery statistics.</p>
        </div>
      </div>

      <div className="profile-grid">
        <div className="stat-card">
          <h3>{totalUploads}</h3>
          <p>Total Uploads</p>
        </div>

        <div className="stat-card">
          <h3>{favoriteCount}</h3>
          <p>Favorites</p>
        </div>

        <div className="stat-card">
          <h3>{mostUsedCategory}</h3>
          <p>Top Category</p>
        </div>
      </div>

      <div className="category-breakdown">
        <h3>Category Breakdown</h3>

        {Object.keys(categories).length === 0 && (
          <p>No uploads yet.</p>
        )}

        {Object.keys(categories).map(category => (
          <div className="category-row" key={category}>
            <span>{category}</span>
            <strong>{categories[category]}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePanel;