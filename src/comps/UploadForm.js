import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

const UploadForm = ({ user }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Personal');
  const [tags, setTags] = useState('');

  const types = ['image/png', 'image/jpeg'];

  const categories = [
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

  const changeHandler = (e) => {
    let selected = e.target.files[0];

    if(selected && types.includes(selected.type)){
      setFile(selected);
      setError('');
    }
    else{
      setFile(null);
      setError('Please select an image file (png or jpeg)');
    }
  };

  const resetForm = () => {
    setFile(null);
    setTitle('');
    setCategory('Personal');
    setTags('');
  };

  return (
    <form className="upload-form">
      <div className="upload-meta">
        <input 
          type="text"
          placeholder="Image title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input 
          type="text"
          placeholder="Tags: trip, friends, college"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <label>
        <input type="file" onChange={changeHandler}/>
        <span>+</span>
      </label>

      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}

        {file && (
          <ProgressBar 
            file={file}
            user={user}
            resetForm={resetForm}
            metadata={{ title, category, tags }}
          />
        )}
      </div>
    </form>
  );
};

export default UploadForm;