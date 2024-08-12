"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import usePrivateStore from "@/store/privateStore";
import usePublicStore from "@/store/publicStore";
import { ArticleCard } from "@/custom-components/articles/ArticleCard";

const page = () => {
  const { currentUser } = usePrivateStore();
  const { articles } = usePublicStore();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      // router.push('/');
    }
  }, []);

  return (
    <div>
      {currentUser ? (
        <div className="miniPage favoritesPage">
          <h1>Bookmarks</h1>
          <div className="flex flex-col">
            {articles.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default page;
