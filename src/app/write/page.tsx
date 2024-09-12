"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Article } from '@/store/interface';
import TipTap from '@/custom-components/write/TipTap';
import styles from "@/styles/details.module.scss";
import usePrivateStore from '@/store/privateStore';

const Page = () => {
  const { currentUser, addArticle } = usePrivateStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(""); 
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      // router.push('/');
    }
  }, [currentUser, router]);

  const handleContentChange = (value:any) => {
    setContent(value);
  };

  const handleSubmit = async () => {
    if (currentUser) {
      const article: Article = {
        userId: currentUser.id,
        username: currentUser.username,
        title: title,
        description: description,
        content: content,
        likes: 0,
        articleDate: new Date(),
        articleImage:coverImage
      };
      addArticle(article);
      // Optionally navigate to another page after submission
      router.push('/articles'); // Adjust the route as necessary
    }
  };

  const handleFileChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file)); // Create a URL for the image
    }
  };

  return (
    <div className="miniPage pagevw-50">
      <div className='flex justify-between items-center mt-4 mb-10'>
        <h1>Write Article</h1>
        <Button onClick={handleSubmit} className='rounded-full'>Post</Button>
      </div>

      {/* Title */}
      <div className='p-2 w-full'>
        <textarea
        rows={1}
          value={title}
          style={{overflow:"hidden"}}
          maxLength={90}
          onChange={(e) => setTitle(e.target.value)}
          className='text-4xl border-0 w-full'
          placeholder='Write title here...' />
      </div>

      {/* Description */}
      <div className='my-3 mb-5'>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          maxLength={260}
          style={{overflow:"hidden"}}
          className='text-xl w-full p-2 rounded-sm'
          placeholder='Write description here. It should be user-attractive and based on title, article, and keywords.' />
      </div>

      {/* Cover Image */}
      {coverImage ? (
        <div className={`w-full ${styles.articleImage}`}>
          <Image src={coverImage} alt={title} width={1100} height={500} />
        </div>
      ) : (
        <div className='w-full min-h-[500px] flex flex-col items-center justify-center border'>
          <div className='flex flex-col'>
            <span>Article's cover image</span>
            <Input type='file' className='w-auto' onChange={handleFileChange} />
          </div>
        </div>
      )}

      {/* Keywords */}
        <div className='w-full my-10'>
        
        <div className={styles.keywords}>
          <span>#keyword1</span>
          <span>#keyword2</span>
          <span>#keyword3</span>
          <span>#keyword4</span>
          <span>#keyword5</span>
        </div>
        </div>

      {/* Content Editor */}
      <TipTap content={content} setContent={setContent} />
    </div>
  );
};

export default Page;


