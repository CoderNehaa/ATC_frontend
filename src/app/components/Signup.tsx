"use client";
import { useState } from "react";
import styles from "../styles/auth.module.scss";

interface SignupProps {
  setShowSignupForm: (value: boolean) => void;
  setShowSigninForm: (value: boolean) => void;
}

const Signup: React.FC<SignupProps> = ({
  setShowSignupForm,
  setShowSigninForm,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleClick() {
    setShowSignupForm(false);
    setShowSigninForm(true);
  }

  return (
    <div>
      <div className={styles.signinBox}>
        <div className="flexColCenter">
          <span className={styles.welcomeBack}>Welcome to ATC</span>
          <span className={styles.signin}>Create your account</span>
        </div>
        <div className={styles.signinOptions}>
          <form>
            <div className={`${styles.inputBox} mr-5`}>
              <label>Name</label>
              <input type="text" placeholder="Enter Name" />
            </div>
            <div className={styles.inputBox}>
              <label>Email</label>
              <input type="email" placeholder="Email should be unique" />
            </div>
            <div className={`${styles.inputBox} mr-5`}>
              <label>Password</label>{" "}
              <span className={styles.passwordBox}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </span>
              </span>
            </div>

            <div className={styles.inputBox}>
              <label>Confirm Password</label>
              <span className={styles.passwordBox}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </span>
              </span>
            </div>

            <div className="flex justify-center">
              <button className={`${styles.signupBtn} w-auto mt-2`}>
                <span>Create Account</span>
              </button>
            </div>
          </form>

          <span className={styles.actionMsg}>
            Already an ATCian?{" "}
            <button onClick={handleClick}> Login now.</button>
          </span>

          {/* Close signin form button */}
          <div
            className={styles.closeBtn}
            onClick={() => setShowSignupForm(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      </div>

      {/* Background blur */}
      <div className={styles.authBg}></div>
    </div>
  );
};

export default Signup;
