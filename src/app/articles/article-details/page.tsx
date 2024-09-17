"use client";
import Image from "next/image";
import styles from "@/styles/details.module.scss";
import author from "@/assets/author.png";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Article, Keyword } from "@/store/interface";
import usePublicStore from "@/store/publicStore";
import usePrivateStore from "@/store/privateStore";
import userDemoImage from "@/assets/author.png";
import { Button } from "@/components/ui/button";

export const ArticleDetails = () => {
  const { getArticleDetails, articles } = usePublicStore();
  const { currentUser } = usePrivateStore();
  const [article, setArticle] = useState<Article>();
  const searchParams = useSearchParams();
  const id = searchParams.get("a");
  const {addFavoriteArticle, removeFavoriteArticle} = usePrivateStore();
  const [comment, setComment] = useState("");

  async function fetchData(id: number) {
    const data: Article | null = await getArticleDetails(
      id,
      currentUser ? currentUser.id : 0
    );
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

 async function handleBookmark(){
    if(article){
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
    
  }

  function handleLike(){

  }

  function createComment(){

  }
  
  return (
    <div className={styles.detailsOuterPage}>
      {article ? (
        <div className={styles.detailsInnerPage}>
          <div className={styles.infoBox}>
            <div className={styles.authorInfo}>
              <Image
                src={article.profilePicture ? article.profilePicture : author}
                alt="authorName"
                height={35}
                width={35}
                className="rounded-full"
              />
              <span className="ml-3 mt-1">{article.username}</span>
            </div>

            <div className={styles.iconBox}>
              <i className="fa-solid fa-feather"></i>
              <span className="italic mr-6">{formatDate()}</span>
              <i className="fa-regular fa-bookmark"></i>
              {/* <i className="fa-solid fa-share-nodes"></i> */}
            </div>
          </div>
          <h1>{article.title}</h1>

          {article.articleImage ? (
            <div className={`w-full ${styles.articleImage}`}>
              <Image
                src={article.articleImage}
                alt={article.title}
                width={1100}
                height={500}
              />
            </div>
          ) : null}
          <div className={styles.keywords}>
            {article.keywords && article.keywords.length ? (
              <div>
                {article.keywords.map((keyword: any, index) => (
                  <span key={index} className="lowercase">
                    #{keyword.keywordName}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <p className={styles.description}>{article.description}</p>

          <div
            className={styles.articleBody}
            dangerouslySetInnerHTML={{ __html: article.content }}></div>
          <div className="mt-4">
            <span className="mr-4 text-xl">
              <i
                className={`fa-${
                  article.isFav ? "solid" : "regular"
                } fa-heart mr-1`}></i>
              {article.likes}
            </span>
            <span className="mr-4 text-xl">
              <i className="fa-solid fa-comment-dots mr-1"></i>
              {article.comments?.length}
            </span>

            {/* <i className="fa-solid fa-share-nodes"></i>
            <i className="fa-solid fa-download"></i> */}
          </div>

          <div className="mt-8">
            <span className="text-2xl">Comments</span>
            <div className="border-b pt-4 pl-4 w-full relative">
              <textarea 
                className="w-full" 
                placeholder="Write comment" 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} />
              <span className="absolute right-2">
              <Button variant={"outline"}>Add</Button></span>
            </div>
            {article.comments && article.comments.length ? (
              <div>
                {article.comments.map((comment: any, index) => (
                  <div key={index} className="capitalize border-b p-2 pl-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Image
                          src={
                            comment.profilePicture
                              ? comment.profilePicture
                              : userDemoImage
                          }
                          alt={comment.username}
                          height={20}
                          width={20}
                          className="mr-2"
                        />
                        <span>{comment.username}</span>
                      </div>
                      <div>{comment.commentDate.split("T")[0]}</div>
                    </div>
                    <div>{comment.comment}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      <button className="scrollBtn">
        <i className="fa-solid fa-arrow-down"></i>
      </button>
    </div>
  );
};

export default ArticleDetails;
