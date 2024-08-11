import styles from "@/styles/auth.module.scss";
import lock from "@/assets/lock.png";
import google from "@/assets/google.jpeg";
import facebook from "@/assets/facebook.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import usePrivateStore from "@/store/privateStore";

interface formProps {
  setShowSignupForm: (value: boolean) => void;
  setShowSigninForm: (value: boolean) => void;
}

const Signin: React.FC<formProps> = ({
  setShowSignupForm,
  setShowSigninForm,
}) => {
  const { passwordLogin, currentUser, handleFbLogin, handleGoogleLogin } =
    usePrivateStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (currentUser) {
      setShowSigninForm(false);
      setShowSignupForm(false);
    }
  }, [currentUser]);

  function handleClick() {
    setShowSigninForm(false);
    setShowSignupForm(true);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const result = await passwordLogin(formData.email, formData.password);
    if(result){
      setShowSigninForm(false);
    }
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
          <form className="flexColCenter" onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.inputBox}>
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                required={true}
                value={formData.email}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, email: e.target.value }));
                }}
              />
            </div>
            <div className={styles.inputBox}>
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                required={true}
                value={formData.password}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />
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
          <div className={styles.authBtn} onClick={handleGoogleLogin}>
            <span className={styles.iconBox}>
              <Image src={google} alt="google" width={50} height={100} />
            </span>
            <span>Signin with Google</span>
          </div>

          <span className={styles.or}>Or </span>

          {/* Signin with facebook */}
          <button className={styles.authBtn} onClick={handleFbLogin}>
            <span className={styles.iconBox}>
              <Image src={facebook} alt="facebook" width={30} />
            </span>
            <span>Signin with facebook</span>
          </button>

          <span className={styles.actionMsg}>
            New to ATC?
            <button onClick={handleClick}> Create your account.</button>
          </span>
        </div>

        {/* Close signin form button */}
        <div
          className={styles.closeBtn}
          onClick={() => setShowSigninForm(false)}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      {/* Background blur */}
      <div className={styles.authBg}></div>
    </div>
  );
};

export default Signin;
