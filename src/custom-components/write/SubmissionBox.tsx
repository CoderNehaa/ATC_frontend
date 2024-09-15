"use client";
import { Article, Keyword } from "@/store/interface";
import React, { useEffect, useState } from "react";
import { ArticleCard } from "../articles/ArticleCard";
import usePublicStore from "@/store/publicStore";
import styles from "@/styles/details.module.scss";
import { Button } from "@/components/ui/button";
import usePrivateStore from "@/store/privateStore";

interface Props {
  article: Article | null;
  setShowSubmissionCard: (value: boolean) => void;
  createArticle:(article:Article) => void
}

const SubmissionBox: React.FC<Props> = ({ article, setShowSubmissionCard, createArticle }) => {
  const [selectedKeywords, setSelectedKeywords] = useState(Array<Keyword>);
  const [showKeywordOptions, setShowKeywordOptions] = useState(false);
  const [currentData, setCurrentData] = useState(Array<Keyword>);
  const [searchInput, setSearchInput] = useState<string>();
  const { addArticle } = usePrivateStore();
  const { keywords } = usePublicStore();

  useEffect(() => {
    setCurrentData([...keywords]);
  }, []);

  function handleKeywordSelection(keyword: Keyword) {
    if (selectedKeywords.length >= 5) {
      return;
    }
    const keywordExists = selectedKeywords.find((obj) => obj.id === keyword.id);
    if (!keywordExists) {
      setSelectedKeywords([keyword, ...selectedKeywords]);
    }
    setShowKeywordOptions(false);
  }

  function removeKeyword(keyword: Keyword) {
    const arr = selectedKeywords.filter((obj) => obj.id !== keyword.id);
    setSelectedKeywords(arr);
  }

  function handleSearch(e:any){
    const value = e.target.value;
    if(value && value.length){
      const arr = keywords.filter((obj) => obj.keywordName.toLowerCase().includes(value));
      setCurrentData([...arr]);
    } else {
      setCurrentData([...keywords]);
    }
    setSearchInput(value);
  }

  function handleSubmit(){
    let keywordIds:number[] = [];
    for(let i =0; i < selectedKeywords.length; i++){
      keywordIds.push(selectedKeywords[i].id);
    }
    if(article?.userId){
      let articleWkeywords:Article = {
        ...article,
        keywords:keywordIds
      }
      createArticle(articleWkeywords);
    }
  }

  return (
    <div>
      <div className="submissionBox">
        <div className="w-3/4">
          <h2 className="mb-5">Preview</h2>
          {article ? <ArticleCard article={article} /> : null}
        </div>
        <div>
          <h3 className="text-xl">
            You can add up to 5 keywords with this article
          </h3>
          <div className="relative">
            {selectedKeywords.length ? (
              <div className={styles.keywords}>
                {selectedKeywords.map((keyword, index) => (
                  <span key={index}>
                    {keyword.keywordName}
                    <i
                      className="fa-solid fa-xmark ml-2 hover:cursor-pointer"
                      onClick={() => removeKeyword(keyword)}></i>
                  </span>
                ))}
              </div>
            ) : null}
            <div className="my-4 w-[280px] flex flex-col justify-between items-center">
              <div
                className="border w-full px-4 py-2 rounded-md flex justify-between items-center hover:cursor-pointer"
                onClick={() => {
                  setShowKeywordOptions(!showKeywordOptions);
                  setCurrentData([...keywords]);
                }}>
                <span>Select keywords</span>
                <i className="fa-solid fa-chevron-down"></i>
              </div>

              {showKeywordOptions ? (
                <div className="absolute w-[280px] border -mx-12 mt-12 bg-white rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-xl">
                  <div className="border-b px-3 py-2 flex items-center">
                    <i className="fa-solid fa-search mr-2"></i>
                    <input type="text" value={searchInput} placeholder="Search Keyword" onChange={(e) => handleSearch(e)} />
                  </div>
                  <div className="max-h-[200px] overflow-auto ">
                    {currentData.length
                      ? currentData.map((keyword, index) => (
                          <div
                            key={index}
                            className="border-b px-4 py-2"
                            onClick={() => handleKeywordSelection(keyword)}>
                            {keyword.keywordName}
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
        <button
          className="absolute top-2 right-4 text-2xl"
          onClick={() => setShowSubmissionCard(false)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="authBg"></div>
    </div>
  );
};

export default SubmissionBox;
