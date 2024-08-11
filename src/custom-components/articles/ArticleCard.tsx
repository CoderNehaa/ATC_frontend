import Image from "next/image"

import hardik from "@/assets/hardik.jpeg";
import styles from "@/styles/articles.module.scss";
import Link from "next/link";
import { Article } from "@/store/interface";
import React from "react";

interface cardProps{
  article:Article
}

export const ArticleCard:React.FC<cardProps> = ({article}) => {
  const articleDate = new Date(article.articleDate).toDateString();
  const min = 1000000;
  const max= 9999999;
  const randomNumber = Math.floor(Math.random() * (max-min+1)).toFixed(0);

    return (
        <div className={`${styles.articleCard} flex`}>
        <div className={styles.articleDetails}>
        <div className={`${styles.authorBox} flex items-center mb-2`}>
        <span className={styles.avatarBox}>
          {/* <i className="fa-solid fa-user"></i> */}
          <Image src={article.profilePicture} height={25} alt="Author picture"/>
        </span>
        <span className="authorName ml-3 italic">{article.username}</span>
      </div>
          <h2 className={`${styles.titleBox} text-xl mb-1`}>
            {article.title}
          </h2>
          <p className={`${styles.descriptionBox} text-lg mb-2`}>
            {article.description}
          </p>
          <div className={styles.actionBox}>
            <div className={`${styles.actionIcons} flex`}>
              <div className={styles.actionItem}>
                <i className="fa-solid fa-feather-pointed"></i>
                {articleDate}
              </div>
              <div className={styles.actionItem}>
                <i className="fa-solid fa-heart"></i>
                <span>{article.likes}</span>
              </div>
              <div className={styles.actionItem}>
                <i className="fa-solid fa-comment-dots"></i>
                <span>{article.comments}</span>
              </div>
              <span className={styles.actionItem}>
                <i className="fa-solid fa-share-nodes"></i>
              </span>
              <span className={styles.actionItem}>
                <i className="fa-solid fa-bookmark"></i>
              </span>
            </div>
            <Link href={`/articles/article-details?r=${randomNumber}&a=${article.id}`}>
              <button className={styles.readBtn}>Read Full</button>
            </Link>
          </div>
        </div>
        <div className={`${styles.articleImg}`}>
          <Image
            src={hardik}
            width={100}
            height={100}
            alt={article.title}
          />
        </div>
    </div>
    )
}
