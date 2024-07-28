import Image from "next/image"

import author from "../../assets/author.webp";
import hardik from "../../assets/hardik.jpeg";
import styles from "./articles.module.scss";
import Link from "next/link";

export default function ArticleCard(){
    return (
        <div className={`${styles.articleCard} flex`}>
        <div className={styles.articleDetails}>
        <div className={`${styles.authorBox} flex items-center mb-2`}>
        <span className={styles.avatarBox}>
          {/* <i className="fa-solid fa-user"></i> */}
          <Image src={author} height={25} alt="Picture of the author"/>
        </span>
        <span className="authorName ml-3 italic">John Doe</span>
      </div>
          <h2 className={`${styles.titleBox} text-xl mb-1`}>
            Has BCCI selected next captain? Is it Hardik Pandya or anyone else? Has BCCI selected next captain?Pandya or anyone else?
          </h2>
          <p className={`${styles.descriptionBox} text-lg mb-2`}>
            India won T-20 world cup of 2024 and in the final match and with
            the announcement of former captain Rohit’s retirement, there
            India won T-20 world cup of 2024 and in the final match and with
            the announcement of former captain Rohit’s retirement, thereIndia won T-20 world cup of 2024 and in the final match and with
            the announcement of former captain Rohit’s retirement, thereIndia won T-20 world cup of 2024 and in the final match and with
            the announcement of final match and with
          </p>
          <div className={styles.actionBox}>
            <div className={`${styles.actionIcons} flex`}>
              <div className={styles.actionItem}>
                <i className="fa-solid fa-feather-pointed"></i>
                10 July, 2024
              </div>
              <div className={styles.actionItem}>
                <i className="fa-solid fa-heart"></i>
                <span>24</span>
              </div>
              <div className={styles.actionItem}>
                <i className="fa-solid fa-comment-dots"></i>
                <span>5</span>
              </div>
              <span className={styles.actionItem}>
                <i className="fa-solid fa-share-nodes"></i>
              </span>
              <span className={styles.actionItem}>
                <i className="fa-solid fa-bookmark"></i>
              </span>
            </div>
            <Link href="/articles/details"><button className={styles.readBtn}>Read Full</button></Link>
          </div>
        </div>
        <div className={`${styles.articleImg}`}>
          <Image
            src={hardik}
            width={100}
            height={100}
            alt="Picture of the author"
          />
        </div>
    </div>
    )
}