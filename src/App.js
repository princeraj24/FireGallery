import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import UploadForm from './comps/UploadForm';
import ImageGrid from './comps/ImageGrid';
import Modal from './comps/Modal';
import AuthForm from './comps/AuthForm';
import ProfilePanel from './comps/ProfilePanel';
import PrivateRoute from './comps/PrivateRoute';
import { projectAuth } from './firebase/config';

const GalleryDashboard = ({ user, logoutHandler }) => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const [showSearchOptions, setShowSearchOptions] = useState(false);

  const categories = [
    'All',
    'Personal',
    'Travel',
    'College',
    'Design',
    'Nature',
    'Friends',
    'Family',
    'Work',
    'Other'
  ];

  const tabTitles = {
    home: 'Recent Uploads',
    uploads: 'My Uploads',
    cloud: 'Cloud Gallery',
    favorites: 'Favorites',
    profile: 'Profile'
  };

  return (
    <div className="App main-mode">
      <div className="gallery-page">
        <div className="gallery-shell">

          <aside className="sidebar">
            <div className="brand">
              <div className="brand-icon">F</div>
              <h1>FireGallery</h1>
            </div>

            <div className="profile-card">
              <div className="avatar">
                {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
              </div>
              <h3>{user.email}</h3>
              <p>Private Photo Space</p>
            </div>

            <nav className="side-nav">
              <button className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>
                Home
              </button>

              <button className={activeTab === 'uploads' ? 'active' : ''} onClick={() => setActiveTab('uploads')}>
                My Uploads
              </button>

              <button className={activeTab === 'cloud' ? 'active' : ''} onClick={() => setActiveTab('cloud')}>
                Cloud Gallery
              </button>

              <button className={activeTab === 'favorites' ? 'active' : ''} onClick={() => setActiveTab('favorites')}>
                Favorites
              </button>

              <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
                Profile
              </button>
            </nav>

            <button className="logout-btn" onClick={logoutHandler}>
              Logout
            </button>
          </aside>

          <main className="content-area">
            <section className="hero-card">
              <div className="hero-content">
                <p className="eyebrow">PRIVATE CLOUD GALLERY</p>
                <h2>Your Pictures</h2>
                <p>
                  Upload, collect, and revisit your favorite visual memories in one beautiful place.
                </p>

                <UploadForm user={user} />
              </div>
            </section>

            <section className="gallery-section">
              <div className="section-head">
                <div>
                  <p className="eyebrow">PERSONAL COLLECTION</p>
                  <h2>{tabTitles[activeTab]}</h2>
                </div>
                <span>Cloudinary + Firebase</span>
              </div>

              {activeTab !== 'profile' && (
                <>
                  <div className="filter-bar">
                  <div className="search-box-wrap">
                    <input
                      type="text"
                      placeholder="Search by title, tags, or choose category..."
                      value={searchTerm}
                      onFocus={() => setShowSearchOptions(true)}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {showSearchOptions && (
                      <div className="search-suggestions">
                        <p>Quick Categories</p>

                        <div className="suggestion-list">
                          {categories.map(cat => (
                            <button
                              key={cat}
                              type="button"
                              onMouseDown={() => {
                                setCategoryFilter(cat);
                                setSearchTerm('');
                                setShowSearchOptions(false);
                              }}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <select 
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                  <ImageGrid 
                    setSelectedImg={setSelectedImg} 
                    user={user} 
                    activeTab={activeTab}
                    searchTerm={searchTerm}
                    categoryFilter={categoryFilter}
                  />
                </>
              )}

              {activeTab === 'profile' && <ProfilePanel user={user} />}
            </section>
          </main>

        </div>
      </div>

      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setAuthReady(true);
    });

    return () => unsub();
  }, []);

  const logoutHandler = () => {
    projectAuth.signOut();
  };

  if(!authReady){
    return (
      <div className="auth-loading">
        <div></div>
        <p>Loading FireGallery...</p>
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <Route path="/login">
          {user ? <Redirect to="/gallery" /> : (
            <div className="App auth-mode">
              <AuthForm />
            </div>
          )}
        </Route>

        <PrivateRoute path="/gallery" user={user}>
          <GalleryDashboard user={user} logoutHandler={logoutHandler} />
        </PrivateRoute>

        <Route path="/">
          <Redirect to={user ? "/gallery" : "/login"} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;