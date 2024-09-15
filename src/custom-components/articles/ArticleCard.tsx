import Image from "next/image"

import hardik from "@/assets/hardik.jpeg";
import styles from "@/styles/articles.module.scss";
import Link from "next/link";
import { Article } from "@/store/interface";
import React from "react";
import usePrivateStore from "@/store/privateStore";
import usePublicStore from "@/store/publicStore";
import user from "@/assets/author.png";

interface cardProps{
  article:Article
}

export const ArticleCard:React.FC<cardProps> = ({article}) => {
  const {setShowSigninForm} = usePublicStore();
  const {currentUser, addFavoriteArticle, removeFavoriteArticle} = usePrivateStore();
  
  function handleShare(){
    if(!currentUser){
      setShowSigninForm(true);
      return;
    }
    setShowSigninForm(false);
  }
  
  async function handleSave(){
    if(!currentUser){
      setShowSigninForm(true);
      return;
    } else {

      if(article.isFav){
        const result:boolean = await removeFavoriteArticle(article);
        if(result){
          article.isFav = false;
        }
      } else {
        const result:boolean = await addFavoriteArticle(article);
        if(result){
          article.isFav = true;
        }
      }
    }
    setShowSigninForm(false);
  }

  const articleDate = new Date(article.articleDate).toDateString();
  const min = 1000000;
  const max= 9999999;
  const randomNumber = Math.floor(Math.random() * (max-min+1)).toFixed(0);

    return (
        <div className={`${styles.articleCard} flex`}>
        <div className={styles.articleDetails}>
        <div className={`${styles.authorBox} flex items-center mb-2`}>
        <span className={styles.avatarBox}>
          <Image src={article.profilePicture?article.profilePicture:user} width={30} className="rounded-full" height={30} alt="Author picture"/>
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
              {/* <span className={styles.actionItem} onClick={handleShare}>
                <i className="fa-solid fa-share-nodes"></i>
              </span> */}
              <span className={styles.actionItem} onClick={handleSave}>
                <i className={`fa-${article.isFav?"solid":"regular"} fa-bookmark`}></i>
              </span>
            </div>
            <Link href={`/articles/article-details?r=${randomNumber}&a=${article.id}`}>
              <button className={styles.readBtn}>Read Full</button>
            </Link>
          </div>
        </div>
       {article.articleImage? <div className={`${styles.articleImg}`}>
          <Image
            src={article.articleImage}
            width={100}
            height={100}
            alt={article.title}
          />
        </div>:null}
    </div>
    )
}
