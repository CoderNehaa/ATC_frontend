"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import usePrivateStore from "@/store/privateStore";
import { ArticleCard } from "@/custom-components/articles/ArticleCard";

const page = () => {
  const { currentUser, getFavorites, favoriteArticles} = usePrivateStore();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      getFavorites();
    } else {
      router.push('/');
    }
  }, [currentUser]);

  return (
    <div>
      {currentUser ? (
        <div className="miniPage favoritesPage">
          <h1>Bookmarks</h1>
          <div className="flex flex-col">
            {favoriteArticles.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default page;
