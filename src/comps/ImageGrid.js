import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { projectFirestore } from '../firebase/config';
import { motion } from 'framer-motion';

const ImageGrid = ({ setSelectedImg, user, activeTab, searchTerm, categoryFilter }) => {
  const { docs, loading } = useFirestore('images', user);

  let filteredDocs = docs;

  if(activeTab === 'favorites'){
    filteredDocs = filteredDocs.filter(doc => doc.isFavorite);
  }

  if(categoryFilter && categoryFilter !== 'All'){
    filteredDocs = filteredDocs.filter(doc => doc.category === categoryFilter);
  }

  if(searchTerm){
    filteredDocs = filteredDocs.filter(doc => {
      const title = doc.title ? doc.title.toLowerCase() : '';
      const tags = doc.tags ? doc.tags.join(' ').toLowerCase() : '';
      const query = searchTerm.toLowerCase();

      return title.includes(query) || tags.includes(query);
    });
  }

  const toggleFavorite = async (e, doc) => {
    e.stopPropagation();

    await projectFirestore.collection('images').doc(doc.id).update({
      isFavorite: !doc.isFavorite
    });
  };

  const deleteImage = async (e, doc) => {
    e.stopPropagation();

    const confirmDelete = window.confirm('Are you sure you want to delete this image?');

    if(confirmDelete){
      await projectFirestore.collection('images').doc(doc.id).delete();
    }
  };

  if(loading){
    return (
      <div className="img-grid">
        {[1, 2, 3, 4, 5, 6].map(item => (
          <div className="skeleton-card" key={item}></div>
        ))}
      </div>
    );
  }

  return (
    <>
      {filteredDocs.length === 0 && (
        <div className="empty-state">
          <h3>No images here yet</h3>
          <p>
            {activeTab === 'favorites'
              ? 'Mark some images as favorite by clicking the heart icon.'
              : 'Upload your first image using the plus button above.'}
          </p>
        </div>
      )}

      <div className="img-grid">
        {filteredDocs && filteredDocs.map(doc => (
          <motion.div 
            className="img-wrap" 
            key={doc.id}
            layout
            whileHover={{ opacity: 1 }}
            onClick={() => setSelectedImg(doc.url)}
          >
            <button 
              className={doc.isFavorite ? 'fav-btn active' : 'fav-btn'}
              onClick={(e) => toggleFavorite(e, doc)}
            >
              ♥
            </button>

            <button 
              className="delete-btn"
              onClick={(e) => deleteImage(e, doc)}
            >
              ×
            </button>

            <div className="image-info">
              <h3>{doc.title || 'Untitled'}</h3>
              <p>{doc.category || 'Personal'}</p>
            </div>

            <motion.img 
              src={doc.url} 
              alt={doc.title || 'uploaded pic'}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }} 
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default ImageGrid;