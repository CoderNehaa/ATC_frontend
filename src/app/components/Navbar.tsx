"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/navbar.module.scss";
import Link from "next/link";
import Signin from "./SignIn";
import Signup from "./Signup";
import usePrivateStore from "@/store/privateStore";
import Avatar from "./Avatar";

export default function Navbar() {
  const [showSigninForm, setShowSigninForm] = useState<boolean>(false);
  const [showSignupForm, setShowSignupForm] = useState<boolean>(false);
  const toggleSigninForm = (value: boolean) => setShowSigninForm(value);
  const toggleSignupForm = (value: boolean) => setShowSignupForm(value);
  const [showUserOptions, setShowUserOptions] = useState<boolean>(false);
  const { currentUser, validateUser } = usePrivateStore();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (!currentUser && !loading) {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    if (loading && !currentUser) {
      validateUser();
      setLoading(false);
    }
  }, [loading]);
  
  function handleSubmit(e:any){
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
            <li className={styles.loginBtn}>
              <button onClick={() => setShowUserOptions(!showUserOptions)}>
                {currentUser.profilePicture ? (
                  <Image
                    src={currentUser.profilePicture}
                    height={20}
                    width={20}
                    alt={currentUser.username}
                  />
                ) : (
                  <Avatar letter={currentUser.username[0].toUpperCase()} />
                )}
              </button>
              {showUserOptions ? (
                <div className={styles.userNavItems}>
                  <ul>
                    <li>
                      <i className="fa-solid fa-feather"></i>Write
                    </li>
                    <li>
                      <i className="fa-regular fa-user"></i> profile{" "}
                    </li>
                    <li>
                      <i className="fa-regular fa-bookmark"></i> Favorites{" "}
                    </li>
                    <li>
                      <i className="fa-solid fa-gem"></i> Get Premium{" "}
                    </li>
                    <li>
                      <i className="fa-regular fa-right-to-bracket"></i> Sign
                      Out{" "}
                    </li>
                   
                  </ul>
                </div>
              ) : null}
            </li>
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
