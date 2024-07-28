import Image from "next/image";
import styles from "./details.module.scss";
import trading from "../../../assets/trading.jpeg";
import author from "../../../assets/author.webp";

function ArticleDetails() {
  const article: any = {
    title:
      "Unveiling the Secrets of the Indian Stock Market: A Comprehensive Guide for Beginners",
    authorName: "John Doe",
    articleDate: "10 July, 2024",
    keywords: ["trading", "stock market", "indian stock market", "investing"],
    likes: 24,
    comments: 6,
  };

  return (
    <div className={styles.detailsOuterPage}>
      <div className={styles.detailsInnerPage}>
        <div className={styles.infoBox}>
          <div className={styles.authorInfo}>
            <Image src={author} alt="authorName" height={30} width={30} />
            <span className="ml-3 mt-1">{article.authorName}</span>
          </div>

          <div className={styles.iconBox}>
            <i className="fa-solid fa-feather"></i>
            <span className="italic mr-6">{article.articleDate}</span>
            <i className="fa-regular fa-bookmark"></i>
            <i className="fa-solid fa-share-nodes"></i>
          </div>
        </div>
        <h1>{article.title}</h1>

        <div className={styles.articleImage}>
          <Image src={trading} alt="Article Image" />
        </div>
        <div className={styles.keywords}>
          {article.keywords.map((keyword: string, index: number) => (
            <span key={index}>{keyword}</span>
          ))}
        </div>

        <div className={styles.articleBody}>
          <p>
            Delve into the dynamic world of the Indian stock market with this
            comprehensive guide tailored for beginners. Discover the intricacies
            of trading, understand key market indicators, and learn practical
            tips to make informed investment decisions. Whether you're a novice
            investor or looking to expand your financial knowledge, this article
            equips you with the essential insights to navigate the Indian stock
            market confidently.
          </p>
          <h2>Introduction</h2>
          <p>
            The Indian stock market has emerged as a bustling hub of economic
            activity, reflecting the growth and potential of one of the world's
            fastest-growing economies. For beginners, navigating this complex
            financial landscape can seem daunting. This guide aims to demystify
            the Indian stock market, providing you with essential knowledge and
            practical tips to embark on your investment journey with confidence.
          </p>
          <h2>Understanding the Basics</h2>
          <p>
            <strong>What is the Stock Market?</strong>
            The stock market is a platform where shares of publicly traded
            companies are bought and sold. It serves as a barometer of a
            country's economic health and provides opportunities for individuals
            to invest in businesses and potentially earn returns.{" "}
          </p>
          <p>
            <strong>Key Stock Exchanges in India</strong> India has two primary
            stock exchanges: the Bombay Stock Exchange (BSE) and the National
            Stock Exchange (NSE). Both exchanges operate under the regulatory
            framework of the Securities and Exchange Board of India (SEBI).
          </p>
          <h2> Getting Started with Investing </h2>
          <p>
            <strong>
              Setting Financial Goals Before diving into the stock market
            </strong>{" "}
            It's crucial to define your financial goals. Are you looking for
            long-term growth, regular income, or short-term gains? Clear
            objectives will guide your investment strategy.{" "}
          </p>{" "}
          <p>
            <strong>Opening a Demat and Trading Account</strong> To trade in the
            Indian stock market, you'll need a Demat account to hold your shares
            electronically and a trading account to execute transactions. Many
            banks and financial institutions offer these services.{" "}
          </p>
          <p>
            <strong>Understanding Market Orders </strong>
            Familiarize yourself with different types of market orders such as
            market orders, limit orders, and stop-loss orders. Each type serves
            a specific purpose and can influence the outcome of your trades.{" "}
          </p>
          <h2>Analyzing the Market </h2>
          <p>
            <strong>1. Fundamental Analysis</strong>
            Fundamental analysis involves evaluating a company's financial
            health, including its revenue, earnings, debt, and growth prospects.
            This analysis helps determine the intrinsic value of a stock.
          </p>
          <p>
            <strong> 2. Technical Analysis</strong>
            Technical analysis focuses on historical price movements and trading
            volumes. By studying charts and patterns, investors try to predict
            future price trends.
          </p>
          <h2> Practical Tips for Beginners </h2>
          <p>
            <strong> Diversify Your Portfolio </strong>Avoid putting all your
            eggs in one basket. Diversifying your investments across different
            sectors and asset classes can reduce risk and enhance returns.{" "}
          </p>
          <p>
            <strong>Stay Informed</strong> Keep abreast of market news, economic
            indicators, and global events that can impact the stock market.
            Staying informed helps you make timely and informed decisions.{" "}
          </p>
          <p>
            <strong>Start Small </strong>Begin with a small investment to gain
            experience and understand market dynamics. As you gain confidence
            and knowledge, you can gradually increase your investment.
          </p>
          <p className={styles.conclusion}>
            {" "}
            The Indian stock market offers immense opportunities for wealth
            creation, but it also comes with its share of risks. By
            understanding the basics, setting clear goals, and staying informed,
            you can navigate this dynamic market with confidence. Remember,
            investing is a journey that requires patience, discipline, and
            continuous learning. Happy investing!
          </p>
        </div>

        <div>
          <span>
            <i className="fa-solid fa-heart"></i>24
          </span>
          <span>
            <i className="fa-solid fa-comment"></i>6
          </span>

          <i className="fa-regular fa-bookmark"></i>
          <i className="fa-solid fa-share-nodes"></i>
          <i className="fa-solid fa-download"></i>
        </div>

        {/* Also read */}

      </div>
      <button className="scrollBtn">
        <i className="fa-solid fa-arrow-down"></i>
      </button>
    </div>
  );
}

export default ArticleDetails;
