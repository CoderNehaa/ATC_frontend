"use client"
import React, {useEffect} from 'react'
import { useRouter } from "next/navigation";
import usePrivateStore from '@/store/privateStore';
import Tiptap from '@/custom-components/TipTap';

const page = () => {
  const {currentUser} = usePrivateStore();
  const router = useRouter();

  useEffect(() => {
    if(!currentUser){
      router.push('/');
    }
  } , []);


  return (
    <div>
      <h1>Write article</h1>
      <Tiptap />
    </div>
  )
}

export default page

