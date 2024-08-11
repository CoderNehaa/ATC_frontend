"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "@/styles/navbar.module.scss";
import Signin from "@/custom-components/auth/SignIn";
import Signup from "@/custom-components/auth/Signup";
import usePrivateStore from "@/store/privateStore";
import {UserMenuItems} from "./UserMenuItems";

export default function Navbar() {
  const [showSigninForm, setShowSigninForm] = useState<boolean>(false);
  const [showSignupForm, setShowSignupForm] = useState<boolean>(false);
  const toggleSigninForm = (value: boolean) => setShowSigninForm(value);
  const toggleSignupForm = (value: boolean) => setShowSignupForm(value);
  const { currentUser, validateUser } = usePrivateStore();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (!loading) {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    if (loading) {
      validateUser();
      setLoading(false);
    }
  }, [loading]);

  function handleSubmit(e: any) {
    e.preventDefault();
  }

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.leftNavItems}>
          <span className={`${styles.logoHeading}`}>ATC</span>
          <span className={`${styles.tagline}`}>Write your heart out</span>
        </div>

        <ul className={styles.rightNavItems}>
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
          {currentUser ? (
            <UserMenuItems currentUser={currentUser} />
          ) : (
            <li
              className={`${styles.loginBtn}`}
              onClick={() => setShowSigninForm(!showSigninForm)}
            >
              Sign In<i className="fa-solid fa-right-to-bracket"></i>
            </li>
          )}
        </ul>

        <div style={{ position: "absolute" }}>
          {showSigninForm ? (
            <Signin
              setShowSignupForm={toggleSignupForm}
              setShowSigninForm={toggleSigninForm}
            />
          ) : null}
          {showSignupForm ? (
            <Signup
              setShowSignupForm={toggleSignupForm}
              setShowSigninForm={toggleSigninForm}
            />
          ) : null}
        </div>
      </nav>
    </>
  );
}
