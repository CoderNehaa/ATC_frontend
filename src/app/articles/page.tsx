"use client";
import { useState, useEffect } from "react";
import usePublicStore from "@/store/publicStore";
import styles from "@/styles/articles.module.scss";

import Sidebar from "@/custom-components/articles/CategoryBar";
import { ArticleCard } from "@/custom-components/articles/ArticleCard";
import { Keyword } from "@/store/interface";
import usePrivateStore from "@/store/privateStore";

export default function AllArticles() {
  const [currentKw, setCurrentKw] = useState<Keyword | null>(null);
  const { getTrendingArticles, articles, getKeywords, getArticlesByKeywordId } =
    usePublicStore();
  const { currentUser } = usePrivateStore();

  useEffect(() => {
    getKeywords();
    getTrendingArticles(currentUser ? currentUser.id : 0);
  }, []);

  useEffect(() => {
    if (currentKw) {
      getArticlesByKeywordId(currentKw.id);
    } else {
      getTrendingArticles(currentUser ? currentUser.id : 0);
    }
  }, [currentKw])

  function handleSearchQuery(e: any) {
    e.preventDefault();
     
  }

  return (
    <>
      <div className={styles.mainContentOuter}>
        <div className={styles.mainContentInner}>
          <div className="flex items-center justify-between">
            <h1>{currentKw ? currentKw.keywordName : "Trending"} Articles</h1>
            <form onSubmit={(e) => handleSearchQuery(e)}>
              <button className="searchBtn">
                <input type="text" placeholder="Search..." />
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
          {articles.length ? (
            <div className="flexColCenter">
              {articles.map((article, index) => (
                <ArticleCard key={index} article={article} />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div>
        <Sidebar currentKw={currentKw} setCurrentKw={setCurrentKw} />
      </div>
    </>
  );
}
