import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';

const ProgressBar = ({ file, user, resetForm, metadata }) => {
  const { url, progress } = useStorage(file, user, metadata);

  useEffect(() => {
    if(url){
      resetForm();
    }
  }, [url, resetForm]);

  return (
    <div className="progress-bar" style={{ width: progress + '%' }}></div>
  )
}

export default ProgressBar;