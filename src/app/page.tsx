"use client";
import { useState, useEffect } from "react";
import usePublicStore from "@/store/publicStore";
import styles from "@/styles/articles.module.scss";

import Categorybar from "@/custom-components/articles/CategoryBar";
import { ArticleCard } from "@/custom-components/articles/ArticleCard";
import { Article, Keyword } from "@/store/interface";
import usePrivateStore from "@/store/privateStore";

export default function AllArticles() {
  const [currentKw, setCurrentKw] = useState<Keyword | null>(null);
  const { getTrendingArticles, articles, getKeywords, getArticlesByKeywordId } =
    usePublicStore();
  const { currentUser } = usePrivateStore();
  const [currentData, setCurrentData] = useState(Array<Article>);

  useEffect(() => {
    getKeywords();
    getTrendingArticles(currentUser ? currentUser.id : 0);
  }, []);

  useEffect(() => {
    if(articles){
      setCurrentData([...articles]);
    }
  }, [articles])

  useEffect(() => {    
    if (currentKw) {
      getArticlesByKeywordId(currentKw.id);
    } else {
      getTrendingArticles(currentUser ? currentUser.id : 0);
    }
  }, [currentKw, currentUser])

  function handleSearchQuery(e: any) {
    const value = e.target.value;
    const arr = articles.filter((article) => article.title.toLowerCase().includes(value) || article.description.toLowerCase().includes(value));
    setCurrentData([...arr]);
  }

  return (
    <>
      <div className={styles.mainContentOuter}>
        <div className={styles.mainContentInner}>
          <div className="flex items-center justify-between">
            <h1>{currentKw ? currentKw.keywordName : "Trending"} Articles</h1>
            {articles.length>3? <form onSubmit={(e) => e.preventDefault()}>
              <button className="searchBtn">
                <input type="text" placeholder="Search..." onChange={(e) => handleSearchQuery(e)} />
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>:null}
          </div>
          {currentData.length ? (
            <div className="flexColCenter">
              {currentData.map((article, index) => (
                <ArticleCard key={index} article={article} />
              ))}
            </div>
          ) : <span className="text-xl">There are no articles associated with this category.</span>}
        </div>
      </div>

      <div>
        <Categorybar currentKw={currentKw} setCurrentKw={setCurrentKw} />
      </div>
    </>
  );
}
