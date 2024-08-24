"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "@/styles/navbar.module.scss";
import Signin from "@/custom-components/auth/SignIn";
import Signup from "@/custom-components/auth/Signup";
import usePrivateStore from "@/store/privateStore";
import { UserMenuItems } from "./UserMenuItems";
import usePublicStore from "@/store/publicStore";

export default function Navbar() {
  const {
    showSigninForm,
    setShowSigninForm,
    showSignupForm,
    setShowSignupForm,
  } = usePublicStore();
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
      <nav className={` ${styles.navbar}`}>
        <div className={styles.leftNavItems}>
          <h2 className="font-bold">ATC</h2>
          <span className={`${styles.tagline}`}>Write your heart out</span>
        </div>

        <ul className={`flex justify-end md:justify-between items-center md:w-4/12 lg:5/12 xl:w-1/5 ${styles.rightNavItems}`}>
          <li className="hidden md:inline">
            <Link href="/">Home</Link>
          </li>
          <li className="hidden md:inline">
            <Link href="/articles">trending</Link>
          </li>
          <li className="hidden md:inline">
            <Link href="/about" className="aboutBtn">
              about
            </Link>
          </li>
          {currentUser ? (
            <UserMenuItems currentUser={currentUser} />
          ) : (
            <li onClick={() => setShowSigninForm(!showSigninForm)}>
              <i className="fa-solid fa-right-to-bracket"></i>
            </li>
          )}
        </ul>
        <div style={{ position: "absolute" }}>
          {showSigninForm ? <Signin /> : null}
          {showSignupForm ? <Signup /> : null}
        </div>
      </nav>
  );
}
