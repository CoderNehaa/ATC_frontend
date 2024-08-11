"use client";
import Image from "next/image";
import styles from "@/styles/details.module.scss";
import author from "@/assets/author.webp";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Article, Keyword } from "@/store/interface";
import usePublicStore from "@/store/publicStore";

export const ArticleDetails = () => {
  const { getArticleDetails } = usePublicStore();
  const [article, setArticle] = useState<Article>();
  const searchParams = useSearchParams();
  const id = searchParams.get("a");

  async function fetchData(id: number) {
    const data: Article | null = await getArticleDetails(id);
    if (data !== null) {
      setArticle(data);
    }
  }
  const formatDate = () => {
    if (article) {
      return new Date(article.articleDate).toDateString();
    }
  };

  useEffect(() => {
    const numId = Number(id);
    fetchData(numId);
  }, []);

  return (
    <div className={styles.detailsOuterPage}>
      {article ? (
        <div className={styles.detailsInnerPage}>
          <div className={styles.infoBox}>
            <div className={styles.authorInfo}>
              <Image src={author} alt="authorName" height={30} width={30} />
              <span className="ml-3 mt-1">{article.username}</span>
            </div>

            <div className={styles.iconBox}>
              <i className="fa-solid fa-feather"></i>
              <span className="italic mr-6">{formatDate()}</span>
              <i className="fa-regular fa-bookmark"></i>
              <i className="fa-solid fa-share-nodes"></i>
            </div>
          </div>
          <h1>{article.title}</h1>

          <div className={styles.articleImage}>
            <Image src={article.articleImage} alt={article.title} width={40} height={50} />
          </div>
          <div className={styles.keywords}>
            {article.keywords
              ? article.keywords.map((keyword: Keyword, index: number) => (
                  <span key={index}>#{keyword.keywordName}</span>
                ))
              : null}
          </div>
          
          <h2>{article.description}</h2>

          <div className={styles.articleBody}>
            
            <p>{article.content}</p>
          </div>

          <div>
            <span>
              <i className="fa-solid fa-heart"></i>
              {article.likes}
            </span>
            <span>
              <i className="fa-solid fa-comment-dots"></i>
              {article.comments?.length}
            </span>

            <i className="fa-regular fa-bookmark"></i>
            <i className="fa-solid fa-share-nodes"></i>
            <i className="fa-solid fa-download"></i>
          </div>

          {/* Also read */}
        </div>
      ) : null}
      <button className="scrollBtn">
        <i className="fa-solid fa-arrow-down"></i>
      </button>
    </div>
  );
};

export default ArticleDetails;
