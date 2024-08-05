"use client"
import { useEffect, useState } from 'react';
import usePrivateStore from '@/store/privateStore';
import { useRouter } from 'next/navigation';

const GoogleCallback = () => {
  const { currentUser, validateUser } = usePrivateStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if(!currentUser && !loading){
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    if(currentUser){
      router.push('/')
    }
  }, [currentUser])

  useEffect(() => {
    if(loading && !currentUser){
      validateUser();  
      setLoading(false);
    }
  }, [loading]);

  return <div>Loading...</div>; 
};

export default GoogleCallback;

