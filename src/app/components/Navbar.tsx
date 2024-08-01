"use client";
import { useState } from "react";
import styles from "../styles/navbar.module.scss";
import Link from "next/link";
import Signin from "./SignIn";
import Signup from "./Signup";

export default function Navbar() {
  const [showSigninForm, setShowSigninForm] = useState<boolean>(false);
  const [showSignupForm, setShowSignupForm] = useState<boolean>(false);
  const toggleSigninForm = (value:boolean) => setShowSigninForm(value);
  const toggleSignupForm = (value:boolean) => setShowSignupForm(value);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.leftNavItems}>
          <span className={`${styles.logoHeading}`}>ATC</span>
          <span className={`${styles.tagline}`}>Write your heart out</span>
        </div>

        <ul className={styles.rightNavItems}>
          <li className={styles.searchIconBtn}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/articles">trending</Link>
          </li>
          <li>
            <Link href="/about" className="aboutBtn">
              about
            </Link>
          </li>
          <li className={`${styles.loginBtn}`} onClick={() => setShowSigninForm(!showSigninForm)}>
            sign in
            <i className="fa-solid fa-right-to-bracket"></i>
          </li>
          {/* {!showSidebar? 
         <li
            className="collapseBtn"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <i className="fa-solid fa-bars"> </i>
          </li>
           :null} */}
        </ul>
        <div style={{position:"absolute"}}>
          {showSigninForm?<Signin setShowSignupForm={toggleSignupForm} setShowSigninForm={toggleSigninForm} />:null}
          {showSignupForm?<Signup setShowSignupForm={toggleSignupForm} setShowSigninForm={toggleSigninForm} />:null}
        </div>
      </nav>
    </>
  );
}

