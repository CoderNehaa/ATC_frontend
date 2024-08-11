"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/auth.module.scss";
import usePrivateStore from "@/store/privateStore";
import google from "@/assets/google.jpeg"
import facebook from "@/assets/facebook.png"

interface SignupProps {
  setShowSignupForm: (value: boolean) => void;
  setShowSigninForm: (value: boolean) => void;
}

const Signup: React.FC<SignupProps> = ({
  setShowSignupForm,
  setShowSigninForm,
}) => {
  const { signup, handleFbLogin, handleGoogleLogin } = usePrivateStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [showAlertMsg, setShowAlertMsg] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  const [passValidations, setPassValidations] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialCharacter: false,
    hasMinLength: false,
    hasMaxLength: true,
  });

  function handleClick() {
    setShowSignupForm(false);
    setShowSigninForm(true);
  }

  async function handleSubmit(e: any) {
    setShowAlertMsg(false);
    e.preventDefault();
    const { username, email, password, confirmPass } = formData;
    if (!username || !email || !password || !confirmPass) {
      setAlertMsg("All fields are required");
      setShowAlertMsg(true);
      return;
    }

    if (password !== confirmPass) {
      setAlertMsg("Password does not match with confirm password");
      setShowAlertMsg(true);
      return;
    }

    const obj = await signup(username, email, password);
    window.alert(obj.message);
    if(obj.result){
      setFormData({
        username:"",
        email:"",
        password:"",
        confirmPass:""
      })
      setShowSignupForm(false);
      setShowSigninForm(true);
    }
  }

  const handlePasswordChange = (e: any) => {
    const value = e.target.value;
    setPassValidations(() => ({
      hasUpperCase: /[A-Z]/.test(value),
      hasLowerCase: /[a-z]/.test(value),
      hasNumber: /\d/.test(value),
      hasSpecialCharacter: /[!@#$%^&*]/.test(value),
      hasMinLength: !(value.length < 6),
      hasMaxLength: value.length < 12,
    }));
    setFormData((prev) => ({ ...prev, password: value }));
  };

  return (
    <div>
      <div className={styles.signupBox}>
        <div className={styles.left}>

        <div className="flexColCenter mb-5">
          <span className={styles.welcomeBack}>Welcome to ATC</span>
        </div>
        <div className={styles.signinOptions}>
          <form onClick={(e) => handleSubmit(e)}>
            <div className={`${styles.inputBox} mr-5`}>
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                value={formData.username}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }));
                }}
              />
            </div>
            <div className={styles.inputBox}>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email should be unique"
                value={formData.email}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, email: e.target.value }));
                }}
              />
            </div>
            <div className={`${styles.inputBox} mr-5`}>
              <label>Password</label>{" "}
              <span className={styles.passwordBox}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={(e) => {
                    handlePasswordChange(e);
                  }}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
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
                  value={formData.confirmPass}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      confirmPass: e.target.value,
                    }));
                  }}
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

            {showAlertMsg ? (
              <div className="text-red-600">{alertMsg}</div>
            ) : null}

            <div className="flex justify-center">
              <button className={`${styles.authBtn} w-auto mt-2`} type="submit">
                <span>Create Account</span>
              </button>
            </div>
          </form>

          {/* <span className={styles.actionMsg}>
            Already an ATCian?{" "}
            <button onClick={handleClick}> Login now.</button>
          </span>
           */}
          {passwordFocused ? (
            <div className={styles.passwordRulesBox}>
              <ul>
                <li>
                  Password should contain{" "}
                  <span
                    className={
                      passValidations.hasUpperCase
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {" "}
                    mimimum one uppercase letter.
                  </span>
                </li>
                <li>
                  Password should contain{" "}
                  <span
                    className={
                      passValidations.hasLowerCase
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {" "}
                    mimimum one lowercase letter.
                  </span>
                </li>
                <li>
                  Password should contain{" "}
                  <span
                    className={
                      passValidations.hasNumber
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {" "}
                    mimimum one number.{" "}
                  </span>
                </li>
                <li>
                  Password should contain{" "}
                  <span
                    className={
                      passValidations.hasSpecialCharacter
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {" "}
                    mimimum one special character.{" "}
                  </span>
                </li>
                <li>
                  Password length should be{" "}
                  <span
                    className={
                      passValidations.hasMinLength
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {" "}
                    minimum 6 letters.{" "}
                  </span>
                </li>
                <li>
                  Password length should be{" "}
                  <span
                    className={
                      passValidations.hasMaxLength
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {" "}
                    maximum 12 letters.{" "}
                  </span>{" "}
                </li>
              </ul>
            </div>
          ) : null}


        </div>
        </div>
        <div className={`flexColCenter ${styles.right}`}>
        <div className="flexColCenter">
          <span className={styles.socialLoginHeading}>Choose your preference</span>
        </div>
          <div className="flexColCenter">
            {/* Signin with facebook */}
            <button className={styles.signupAuthBtn} onClick={handleFbLogin}>
                <span className={`${styles.iconBox} border-0`}>
                    <i className="fa-solid fa-arrow-left"></i>
                </span>
                <span>Signup with Form</span>
            </button>

            <span className={styles.or}>Or </span>

            {/* Signup with google */}
            <div className={styles.signupAuthBtn} onClick={handleGoogleLogin}>
                <span className={styles.iconBox}>
                    <Image src={google} alt="google" width={50} height={100} />
                </span>
                <span>Signup with Google</span>
            </div>

            <span className={styles.or}>Or </span>

            {/* Signin with facebook */}
            <button className={styles.signupAuthBtn} onClick={handleFbLogin}>
                <span className={styles.iconBox}>
                    <Image src={facebook} alt="facebook" width={30} />
                </span>
                <span>Signup with facebook</span>
            </button>

              <span className={styles.actionMsg}>
              Already an ATCian?{" "}
              <button onClick={handleClick}> Login now.</button>
            </span>
            </div>
        </div>

          {/* Close signin form button */}
          <div
            className={styles.closeBtn}
            onClick={() => setShowSignupForm(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
      </div>

      {/* Background blur */}
      <div className={styles.authBg}></div>
      
    </div>
  );
};

export default Signup;
