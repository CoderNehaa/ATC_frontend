import styles from "./auth.module.scss";
import lock from "../../assets/lock.png";
import google from "../../assets/google.jpeg";
import facebook from "../../assets/facebook.png";
import Image from "next/image";
import React from "react";

interface formProps{
    setShowSignupForm: (value:boolean) => void,
    setShowSigninForm: (value:boolean) => void
}

const Signin:React.FC<formProps> = ({setShowSignupForm, setShowSigninForm}) => {

    function handleClick(){
        setShowSigninForm(false);
        setShowSignupForm(true);
    }

  return (
    <div>
      <div className={styles.signinBox}>
        <div className="flexColCenter">
            <span className={styles.welcomeBack}>Welcome back</span>
            <span className={styles.signin}>Sign In to your account</span>
        </div>
        <div className={styles.signinOptions}>
            {/* Signin with email and password */}
            <form className="flexColCenter">
                <div className={styles.inputBox}>
                    <label>Email</label>
                    <input type="text" placeholder="Enter email" />
                </div>
                <div className={styles.inputBox}>
                    <label>Password</label>
                    <input type="password" placeholder="Enter password" />
                </div>
                <button className={`${styles.authBtn} mt-2`}>
                    <span className={styles.iconBox}>
                        <Image src={lock} alt="password" width={30} />
                    </span>
                    <span>Signin with Password</span>
                </button>
            </form>

            <span className={styles.or}>Or</span>

            {/* Signin with google */}
            <button className={styles.authBtn}>
                <span className={styles.iconBox}>
                    <Image src={google} alt="google" width={50} height={100} />
                </span>
                <span>Signin with Google</span>
            </button>

            <span className={styles.or}>Or </span>

            {/* Signin with facebook */}
            <button className={styles.authBtn}>
                <span className={styles.iconBox}>
                    <Image src={facebook} alt="facebook" width={30} />
                </span>
                <span>Signin with facebook</span>
            </button>

            <span className={styles.actionMsg}>New to ATC?<button onClick={handleClick}> Create your account.</button></span>
        </div>

        {/* Close signin form button */}
        <div className={styles.closeBtn} onClick={() => setShowSigninForm(false)}><i className="fa-solid fa-xmark"></i></div>
      </div>
      {/* Background blur */}
      <div className={styles.authBg}></div>
    </div>
  );
}

export default Signin