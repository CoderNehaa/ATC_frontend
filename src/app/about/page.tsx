import Image from "next/image";
import styles from "./about.module.scss";
import author from "../../assets/author.webp";

export default function About() {
  return (
    <div className={styles.aboutPage}>
      <section>
        <h1 className={styles.aboutHeading}>About Us</h1>
        <div className={styles.content}>
          <div className="w-1/2">
            <h2 className="welcomeline">Hello there! Welcome to ATC.</h2>
            <p>
              At ATC, we focus on engaging users to share their stories and
              write their hearts out in articles. Whether it’s lifestyle tips,
              relationship advice, opinions on national or international issues,
              or information on the latest technology, we welcome all users to
              read, share, and write with an open heart.
            </p>
            <button className={`${styles.ctaBtn}`}>
              <span>Read More</span>
            </button>
          </div>

          <div className={styles.bg}>
            <div className={styles.bgBox}></div>
            {/* <Image src={author} alt="atc" height={100} width={100}/> */}
          </div>
        </div>
      </section>

      {/* Motive of ATC */}
      <section className="flex items-center justify-between">
        <div className={styles.bg}>
          <div className={styles.bgBox}></div>
        </div>
        <div className="w-1/2">
          <h2>Motive of ATC</h2>
          <p className="text-left">
            ATC was founded by Neha Nagda, a one-woman army. The motivation
            behind creating this platform was to build a community of readers,
            writers, and communicators of new opinions.{" "}
          </p>
          <br />
          <p className="text-left">
            Our tagline, “Write your heart out,” perfectly defines the
            motivation of ATC, which is all about encouraging users to express
            their thoughts and feelings about anything. In today’s world, where
            many people hesitate to share their opinions, we welcome and
            encourage our users to share their perspectives, helping each other
            to look at familiar issues from new and different angles.
          </p>

          <div>
            <button className={`${styles.ctaBtn} flex items-center`}>
              <span>Join Community</span>
              <i className="fa-solid fa-arrow-right ml-3"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Meet Author */}
      <section className="flex items-center justify-between">
        <div className="w-full">
          <h2>Meet Founder</h2>
          <p className="text-left">
            Hello readers, I’m Neha Nagda, an aspiring software developer and
            the founder of ATC. I’m happy to welcome you to my website! As
            someone who has loved reading, writing, and sharing ideas since my
            teenage years, creating this platform has been a dream come true.
          </p>
          <br />
          <p className="text-left">
            I completed my Bachelor of Science degree in Biology in 2021. At
            that time, I felt like a lost soul, unsure of what to do with my
            life. COVID-19 was still affecting the world, and people were
            struggling physically, mentally, and financially to recover. Like
            many families, mine was also having a tough time meeting financial
            needs, and to support my family, I decided to work until I found my
            true passion or chose a stable, long-term career goal.
          </p>
          <br />
          <p className="text-left">
            I completed my graduation in 2021 with B.Sc. in Biology. After my
            graduation, I worked as a content reviewer for nearly two years.
            Alongside, I explored other career options and decided to pursue web
            development to become a software developer. After a year of
            learning, I began looking for a job, but my passion for creating
            something of my own led me to the idea of building a website. That’s
            when the writer in me (who wrote during my teenage years and is not
            a professional writer 😅) inspired me to create a writing platform.
          </p>
          <br />
          <p className="text-left">
            I hope you enjoy reading my articles as much as I enjoy writing
            them.
          </p>
          <button className={`${styles.ctaBtn} flex items-center`}>
            <span>Connect with me</span>
            <i className="fa-solid fa-plus ml-3"></i>
          </button>
        </div>
        <div className={styles.bg}>
          <div className={styles.bgBox}></div>
        </div>
      </section>

      {/* Let's connect */}
      <section>
        <h2>Let’s connect</h2>
        <p>
          I would love to connect with you whether you have feedback, questions,
          or just want to chat, feel free to reach out via email at
          nagdaneha97@gmail.com or connect with me on ATC chat.
        </p>
        <div>
          <div className={styles.socialApps}>
            <p>Connect with ATC on social media</p>
            <span>
              <i className="fa-brands fa-facebook-f"></i>
            </span>
            <span>
              <i className="fa-brands fa-instagram"></i>
            </span>
            <span>
              <i className="fa-brands fa-linkedin-in"></i>
            </span>
            <span>
              <i className="fa-brands fa-x-twitter"></i>
            </span>
            <span>
              <i className="fa-brands fa-whatsapp"></i>
            </span>
          </div>
        </div>
      </section>

      <button className="scrollBtn">
        <i className="fa-solid fa-arrow-down"></i>
      </button>
    </div>
  );
}
