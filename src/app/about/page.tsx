"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "@/styles/about.module.scss";

export default function About() {
  const [upScroll, setUpScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;
      setUpScroll(scrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleDownScroll() {
    window.scrollBy({
      top: window.innerHeight * 0.9,
      behavior: "smooth",
    });
  }

  function handleUpScroll() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className={styles.aboutPage}>
      <section>
        <h1 className="h1Heading" style={{ textAlign: "center" }}>
          About Us
        </h1>
        <div className={styles.content}>
          <div className={styles.bg}>
            <div className={styles.bgBox}></div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="flex flex-col lg:flex-row justify-center my-5">
              <span className="mr-2">Hello there! </span>
              <span>Welcome to ATC.</span>
            </h2>
            <p>
              At ATC, we focus on engaging users to share their stories and
              write their hearts out in articles. Whether it’s lifestyle tips,
              relationship advice, opinions on national or international issues,
              or information on the latest technology, we welcome all users to
              read, share, and write with an open heart.
            </p>
            <button className={`${styles.ctaBtn}`} onClick={handleDownScroll}>
              <span>Read More</span>
            </button>
          </div>
        </div>
      </section>

      {/* Motive of ATC */}
      <section className="flex flex-col justify-center lg:flex-row items-center lg:justify-between">
      <h2 className="flex lg:hidden">Motive of ATC</h2>
      <div className={styles.bg}>
          <div className={styles.bgBox}></div>
        </div>
        <div className="lg:w-1/2 flexColCenter">
          <h2 className="hidden lg:flex">Motive of ATC</h2>
          <p className="lg:text-left">
            ATC was founded by Neha Nagda, a one-woman army. The motivation
            behind creating this platform was to build a community of readers,
            writers, and communicators of new opinions.{" "}
          </p>
          <br />
          <p className="lg:text-left">
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

      {/* Meet Founder */}
      <section className="flex flex-col items-center justify-between lg:flex-row mt-20">
        <h2 className="flex lg:hidden">Meet Founder</h2>
        <div className={styles.bg}>
          <div className={styles.bgBox}></div>
        </div>
        <div className="lg:w-1/2 flexColCenter text-center">
          <h2 className="hidden lg:flex">Meet Founder</h2>
          <p>
            Hello readers, I’m Neha Nagda, an aspiring software developer and
            the founder of ATC. I’m happy to welcome you to my website! As
            someone who has loved reading, writing, and sharing ideas since my
            teenage years, creating this platform has been a dream come true.
          </p>
          <br />
          <p>
            I completed my graduation in 2021 with B.Sc. in Biology. When I
            began looking for a job after learning web development, my passion
            for creating something of my own led me to the idea of building a
            website. That’s when the writer in me (who wrote during my teenage
            years and is not a professional writer 😅) inspired me to create a
            writing platform. I hope you enjoy reading my articles as much as I
            enjoy writing them.
          </p>
          <br />
          <button className={`${styles.ctaBtn} flex items-center`}>
            <Link
              href="https://www.linkedin.com/in/neha-nagda-5b1458218/"
              target="/">
              Connect with me
            </Link>
            <i className="fa-solid fa-plus ml-3"></i>
          </button>
        </div>
      </section>

      {/* Let's connect */}
      <section>
        <div className="py-36">
          <h2>Let’s connect</h2>
          <p>
            I would love to connect with you whether you have feedback,
            questions, or just want to chat, feel free to reach out via email at
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
        </div>
      </section>

      {!upScroll && (
        <button className="scrollBtn" onClick={handleDownScroll}>
          <i className="fa-solid fa-arrow-down"></i>
        </button>
      )}

      {upScroll && (
        <button className="scrollBtn" onClick={handleUpScroll}>
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      )}
    </div>
  );
}
