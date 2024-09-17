"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Article } from "@/store/interface";
import TipTap from "@/custom-components/write/TipTap";
import styles from "@/styles/details.module.scss";
import usePrivateStore from "@/store/privateStore";
import SubmissionBox from "@/custom-components/write/SubmissionBox";

const Page = () => {
  const { currentUser, addArticle } = usePrivateStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [showSubmissionCard, setShowSubmissionCard] = useState(false);
  const [newArticle, setNewArticle] = useState<Article | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (title && description && content) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [title, description, content]);

  useEffect(() => {
    if (!currentUser) {
      router.push('/');
    }
  }, [currentUser, router]);

  const handleSubmit = async () => {
    if (currentUser) {
      const article: Article = {
        userId: currentUser.id,
        username: currentUser.username,
        title: title,
        description: description,
        content: content,
        likes: 0,
        articleDate: new Date(),
        articleImage: coverImage,
        profilePicture:currentUser.profilePicture,
        privacy:"public",
        language:"English"
      };
      setShowSubmissionCard(true);
      setNewArticle(article);
    }
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  async function createArticle(article:Article){
    const result = await addArticle(article);
    if(result){
      setTitle("");
      setDescription("");
      setContent("");
      setCoverImage("");
      setShowSubmissionCard(false);
      setNewArticle(null);
      setDisabledBtn(true);
      router.push(`/articles/user?u=${currentUser?currentUser.id:0}`)
    }
  }

  return (
    <>
      {showSubmissionCard ? (
        <SubmissionBox article={newArticle} setShowSubmissionCard={setShowSubmissionCard} createArticle={createArticle}/>
      ) : (
        <div className="miniPage pagevw-50">
          <div className="flex justify-between items-center mt-4 mb-10">
            <h1>Write Article</h1>
            <Button
              onClick={handleSubmit}
              className="rounded-full"
              disabled={disabledBtn}>
              Post
            </Button>
          </div>

          {/* Title */}
          <div className="p-2 w-full">
            <textarea
              rows={1}
              value={title}
              style={{ overflow: "hidden" }}
              maxLength={90}
              onChange={(e) => setTitle(e.target.value)}
              className="text-4xl border-0 w-full"
              placeholder="Write title here..."
            />
          </div>

          {/* Description */}
          <div className="my-3 mb-5">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={260}
              style={{ overflow: "hidden" }}
              className="text-xl w-full p-2 rounded-sm"
              placeholder="Write description here. It should be user-attractive and based on title, article, and keywords."
            />
          </div>

          {/* Cover Image */}
          {coverImage ? (
            <div className={`w-full relative ${styles.articleImage}`}>
              <button
                className="absolute right-2 top-2 text-3xl"
                onClick={() => setCoverImage("")}
              >
                <i className="fa-regular fa-circle-xmark"></i>
              </button>
              <Image src={coverImage} alt={title} width={1100} height={500} />
            </div>
          ) : (
            <div className="w-full min-h-[250px]  lg:min-h-[500px] flex flex-col items-center justify-center border">
              <div className="flex flex-col">
                <span>Article's cover image</span>
                <Input
                  type="file"
                  className="w-auto"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          )}

          {/* Content Editor */}
          <TipTap content={content} setContent={setContent} />
        </div>
      )}
    </>
  );
};

export default Page;

