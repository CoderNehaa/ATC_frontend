import React, { useEffect, useState } from "react";
import styles from "../styles/articles.module.scss";
import useStore from "@/store/store";
import { Keyword } from "@/store/interface";

interface SidebarProps {
  currentKw: any;
  setCurrentKw: (value: Keyword) => void;
}

const CategoryBar: React.FC<SidebarProps> = ({
  currentKw,
  setCurrentKw
}) => {
 const {keywords} = useStore();
  console.log(keywords);
  

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeading}>
        {/* <button onClick={() => changeCollapse(false)}><i className="fa-solid fa-bars"></i></button> */}
        <h2>Recommended</h2>
      </div>
      <div className={styles.searchBar}>
        <input placeholder="search topic" type="text" />
        <span>
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
      </div>

      <ul className={styles.categoriesList}>
        <li className={currentKw ? "" : styles.currentKw}>Trending</li>
        {keywords.map((keyword, index) => (
          <li
            key={index}
            className={currentKw ? (currentKw.id === keyword.id ? styles.currentKw : "" ) : ""}
            onClick={() => setCurrentKw(keyword)}
          >
            {keyword.keywordName}
          </li>
        ))}
        <button className={styles.moreTopicBtn}>+ 20 more topics</button>
      </ul>
    </div>
  );
};

export default CategoryBar;
