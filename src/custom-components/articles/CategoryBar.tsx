import React, { useEffect, useState } from "react";
import styles from "../../styles/articles.module.scss";
import usePublicStore from "@/store/publicStore";
import { Keyword } from "@/store/interface";

interface SidebarProps {
  currentKw: any;
  setCurrentKw: (value: Keyword | null) => void;
}

const CategoryBar: React.FC<SidebarProps> = ({ currentKw, setCurrentKw }) => {
  const { keywords } = usePublicStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentData, setCurrentData] = useState([...keywords]);

  useEffect(() => {
    const arr = keywords.slice(0, 13);
    setCurrentData(arr);
  }, [keywords])
  
  function handleSearchQuery(e:any){
    const value = e.target.value;
    if(value.length === 0){
      const arr = keywords.slice(0, 13);
      setCurrentData(arr);
      setSearchQuery(value);
      return;
    }
    const arr = keywords.filter((keyword) => keyword.keywordName.toLowerCase().includes(value));
    setCurrentData([...arr]);
    setSearchQuery(value);
  }

  return (
    <div className={styles.sidebar}>
      <div>
        <h2>Recommended</h2>
      </div>
      <div className="searchBar">
        <input
          placeholder="search topic"
          type="text"
          value={searchQuery}
          onChange={(e) => {
            handleSearchQuery(e);
          }}
        />
        <span>
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
      </div>

      <ul className={styles.categoriesList}>
        {searchQuery.length?null:<li
          className={currentKw ? "" : styles.currentKw}
          onClick={() => setCurrentKw(null)}
        >
          Trending
        </li>}
        {currentData.map((keyword, index) => {
          if (index < 12) {
            return (
              <li
                key={index}
                className={
                  currentKw
                    ? currentKw.id === keyword.id
                      ? styles.currentKw
                      : ""
                    : ""
                }
                onClick={() => setCurrentKw(keyword)}
              >
                {keyword.keywordName}
              </li>
            );
          }
        })}
        <button className={styles.moreTopicBtn}>
          +{keywords.length - currentData.length} more topics
        </button>
      </ul>
    </div>
  );
};

export default CategoryBar;
