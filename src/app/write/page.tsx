"use client"
import React, {useEffect} from 'react'
import { useRouter } from "next/navigation";
import usePrivateStore from '@/store/privateStore';

const page = () => {
  const {currentUser} = usePrivateStore();
  const router = useRouter();

  useEffect(() => {
    if(!currentUser){
      router.push('/');
    }
  } , []);


  return (
    <div>Write</div>
  )
}

export default page

