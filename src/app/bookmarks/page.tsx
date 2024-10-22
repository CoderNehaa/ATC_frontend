"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import usePrivateStore from "@/store/privateStore";
import { ArticleCard } from "@/custom-components/articles/ArticleCard";

const page = () => {
  const { currentUser, getBookmarks, favoriteArticles} = usePrivateStore();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      getBookmarks();
    } else {
      router.push('/');
    }
  }, [currentUser]);

  return (
    <div>
      {currentUser ? (
        <div className="miniPage pagevw-70">
          <h1>Bookmarks</h1>
          {favoriteArticles.length?<div className="flex flex-col">
            {favoriteArticles.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>:<span className="text-2xl">There are no articles in your Bookmarks list. <a href="/articles" className="text-red-600 text-xl underline">Add articles</a></span>}
        </div>
      ) : null}
    </div>
  );
};

export default page;
