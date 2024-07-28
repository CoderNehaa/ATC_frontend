import React, { useEffect, useState } from "react";
import styles from "./articles.module.scss";

interface SidebarProps {
  currentTopic: any;
  setCurrentTopic: (value: boolean) => void;
  arr:Array<any>
}

const CategoryBar: React.FC<SidebarProps> = ({
  currentTopic,
  setCurrentTopic,
  arr
}) => {

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
        {arr.map((category, index) => (
          <li
            key={index}
            className={currentTopic? currentTopic.id===category.id?styles.currentTopic:"":""}
            onClick={() => setCurrentTopic(category)}
          >
            {category.name}
          </li>
        ))}
        <button className={styles.moreTopicBtn}>+ 20 more topics</button>
      </ul>
    </div>
  );
};

export default CategoryBar;
