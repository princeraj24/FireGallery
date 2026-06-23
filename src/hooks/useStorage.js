import { useState, useEffect } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

const useStorage = (file, user, metadata) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!file || !user) return;

    const cloudName = 'dvomrscpq';
    const uploadPreset = 'firegram_unsigned';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const storageRef = new XMLHttpRequest();

    storageRef.open(
      'POST',
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
    );

    storageRef.upload.onprogress = (snap) => {
      let percentage = (snap.loaded / snap.total) * 100;
      setProgress(percentage);
    };

    storageRef.onload = async () => {
      if(storageRef.status === 200){
        const data = JSON.parse(storageRef.responseText);

        const imageUrl = data.secure_url;
        const createdAt = timestamp();

        const tagArray = metadata.tags
          ? metadata.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
          : [];

        await projectFirestore.collection('images').add({
          url: imageUrl,
          publicId: data.public_id,
          title: metadata.title.trim() || file.name,
          category: metadata.category,
          tags: tagArray,
          isFavorite: false,
          createdAt: createdAt,
          userId: user.uid,
          userEmail: user.email
        });

        setUrl(imageUrl);
      }
      else{
        console.log(storageRef.responseText);
        setError('Upload failed');
      }
    };

    storageRef.onerror = () => {
      setError('Something went wrong while uploading');
    };

    storageRef.send(formData);

  }, [file, user, metadata.title, metadata.category, metadata.tags]);

  return { progress, url, error };
}

export default useStorage;