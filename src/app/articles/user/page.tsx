"use client";
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import usePublicStore from '@/store/publicStore';
import usePrivateStore from '@/store/privateStore';
import { Article } from '@/store/interface';
import { ArticleCard } from '@/custom-components/articles/ArticleCard';

const page = () => {
  const [data, setData] = useState(Array<Article>);
  const {getArticlesByUserId} = usePublicStore();
  const {currentUser} = usePrivateStore();
  const searchParams = useSearchParams();
  const id = searchParams.get("u");
  const router = useRouter();

  useEffect(() => {
    if(!currentUser){
      router.push('/');
      return;    
    }

    if(id && currentUser){
      getData(currentUser.id);
    }
  }, [id, currentUser]);

  async function getData(id:number) {
    const result = await getArticlesByUserId(id);
    setData([...result]);
  }

  return (
    <div>
      {currentUser ? (
        <div className="miniPage pagevw-70">
          <h1>Your articles</h1>
          {data.length?<div className="flex flex-col">
          {data.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>:<span>You have no articles. Write one.</span>}
        </div>
      ) : null}
    </div>
  )
}

export default page;


