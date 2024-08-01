"use client";
import { useState, useEffect } from "react";
import useStore from "@/store/store";
import styles from "../styles/articles.module.scss";

import Sidebar from "../components/CategoryBar";
import {ArticleCard} from "../components/ArticleCard";
import { Keyword } from "@/store/interface";

export default function AllArticles() {
  const [currentKw, setCurrentKw] = useState<Keyword | null>(null);
  const { getTrendingArticles, articles, getKeywords } = useStore();
  
  useEffect(() => {
    getKeywords();
    getTrendingArticles();
  }, [currentKw]);
  
  return (
    <div className="bg-white justify-between">
      <div className={styles.mainContent}>
        <h1 className={styles.currentTopicHeading}>
          {currentKw ? currentKw.keywordName : "Trending"} Articles
        </h1>
        {articles.length?<div className={styles.articlesList}>
          {articles.map((article, index) => 
            <ArticleCard key={index} article={article}/>
          )}
          
        </div>:null}
      </div>

      <div>
        <Sidebar
          currentKw={currentKw}
          setCurrentKw={setCurrentKw}
        />
      </div>
    </div>
  );
}
