"use client";
import { useState, useEffect } from "react";
import usePublicStore from "@/store/publicStore";
import styles from "../styles/articles.module.scss";

import Sidebar from "../components/CategoryBar";
import { ArticleCard } from "../components/ArticleCard";
import { Keyword } from "@/store/interface";

export default function AllArticles() {
  const [currentKw, setCurrentKw] = useState<Keyword | null>(null);
  const { getTrendingArticles, articles, getKeywords, getArticlesByKeywordId } = usePublicStore();

  useEffect(() => {
    getKeywords();
    getTrendingArticles();
  }, []);

  useEffect(() => {
    if (currentKw) {
      getArticlesByKeywordId(currentKw.id);
    }
  }),
    [currentKw];

  function handleSubmit(e:any){
    e.preventDefault();
  }

  return (
    <div className="bg-white justify-between">
      <div className={styles.mainContent}>
        <div className="flex items-center justify-between">
          <h1 className={styles.currentTopicHeading}>
            {currentKw ? currentKw.keywordName : "Trending"} Articles
          </h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <button className="searchBtn">
              <input type="text" placeholder="Search..." />
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
        {articles.length ? (
          <div className={styles.articlesList}>
            {articles.map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
        ) : null}
      </div>

      <div>
        <Sidebar currentKw={currentKw} setCurrentKw={setCurrentKw} />
      </div>
    </div>
  );
}
