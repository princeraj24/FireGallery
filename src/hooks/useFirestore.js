import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

const useFirestore = (collection, user) => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firestoreError, setFirestoreError] = useState(null);

  useEffect(() => {
    if(!user) return;

    setLoading(true);

    const unsub = projectFirestore
      .collection(collection)
      .where('userId', '==', user.uid)
      .onSnapshot((snap) => {
        let documents = [];

        snap.forEach(doc => {
          documents.push({
            ...doc.data(),
            id: doc.id
          });
        });

        documents.sort((a, b) => {
          return b.createdAt?.seconds - a.createdAt?.seconds;
        });

        setDocs(documents);
        setLoading(false);
      }, (err) => {
        console.log(err);
        setFirestoreError(err.message);
        setLoading(false);
      });

    return () => unsub();

  }, [collection, user]);

  return { docs, loading, firestoreError };
}

export default useFirestore;