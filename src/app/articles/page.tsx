"use client";
import { useState, useEffect } from "react";

import styles from "./articles.module.scss";

import Sidebar from "./CategoryBar";
import ArticleCard from "./ArticleCard";

export default function AllArticles() {
  const arr = [
    { id: 100, name: "trending" },
    { id: 101, name: "fashion" },
    { id: 102, name: "finance" },
    { id: 103, name: "health" },
    { id: 104, name: "technology" },
    { id: 105, name: "social media" },
    { id: 106, name: "stock market" },
    { id: 107, name: "relationships" },
    { id: 108, name: "fitness" },
    { id: 109, name: "environment" },
    { id: 110, name: "science" },
    { id: 111, name: "politics" },
    { id: 112, name: "social media" },
    { id: 113, name:"poetry"}
  ];

  useEffect(() => {
    setCurrentTopic(arr[0]);
  }, []);

  const [currentTopic, setCurrentTopic] = useState<any>(null);

  return (
    <div className="bg-white justify-between">
      <div className={styles.mainContent}>
        <h1 className={styles.currentTopicHeading}>
          {currentTopic ? currentTopic.name : "Trending"} Articles
        </h1>
        <div className={styles.articlesList}>
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </div>
      </div>

      <div>
        <Sidebar
          currentTopic={currentTopic}
          setCurrentTopic={setCurrentTopic}
          arr={arr}
        />
      </div>
    </div>
  );
}
