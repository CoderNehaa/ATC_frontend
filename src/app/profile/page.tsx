"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "@/styles/profile.module.scss";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePrivateStore from "@/store/privateStore";
import { User } from "@/store/interface";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import EmailOTPdialog from "@/custom-components/profile/emailOTPdialog";
import { useRouter } from "next/navigation";
const page = () => {
  const { currentUser } = usePrivateStore();
  const [formData, setFormData] = useState<any>({
    username: "",
    bio: "",
    profilePicture: "",
    accountDate: "",
  });
  const [image, setImage] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    if(!currentUser){
      router.push('/');
    }
  } , []);

  useEffect(() => {
    if((!image || !image.length) || (currentUser && currentUser.profilePicture)){
      setImage(currentUser?.profilePicture);
    }
  }, []);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0]; 
    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result.replace(
          /^data:image\/png;base64,/,
          ""
        );
        setImage(base64Data);
        setFormData((prev: any) => ({ ...prev, dp: base64Data }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setFormData({
      username: currentUser?.username,
      bio: currentUser?.bio,
      profilePicture: currentUser?.profilePicture,
      accountDate: currentUser?.accountDate,
    });
    setImage(currentUser?.profilePicture);
  }, []);

  async function handleSubmit(e:any) {
      const updatedUser = {
        ...currentUser,
        username:formData.username,
        bio:formData.bio,
        profilePicture:image
      } 
  }

  return (
    <div className={styles.profilePage}>
      <h1>Profile</h1>
      <form className="relative w-full" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col justify-center items-center mt-5">
          <span className="h-28 w-28 p-4 rounded-full border overflow-hidden">
            {image && image.length ? (
              <Image src={image} width={100} height={100} alt="Group Profile" />
            ) : (
              <span className="text-5xl relative h-full w-full flexColCenter">
                {" "}
                <i className="fa-solid fa-users"></i>
              </span>
            )}
          </span>
          <div className="flex flex-col items-start mt-5">
            <Label htmlFor="picture" className="text-right flex items-center">
              Change Profile Picture
            </Label>
            <Input
              id="picture"
              type="file"
              className="mt-2"
              value={image}
              onChange={(e) => handleImageChange(e)}
            />
          </div>
        </div>
        <div className="grid w-full items-center gap-1.5 mt-5">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            placeholder="Enter username"
            value={currentUser?.username}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                username: e.target.value,
              }))
            }
          />
        </div>
        <div className="grid w-full items-center gap-1.5 mt-5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={currentUser?.email}
            disabled={true}
          />
          {
            <Label>
              Your email address is {currentUser?.isVerified ? "" : "not"}{" "}
              verified
            </Label>
          }
        </div>
        <div className="grid w-full gap-1.5 mt-5">
          <Label htmlFor="message">Bio</Label>
          <Textarea
            placeholder="Tell us about yourself"
            id="message"
            value={formData?.bio}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                username: e.target.value,
              }))
            }
          />
        </div>
        <div className="grid w-full items-center gap-1.5 mt-5">
          <Label htmlFor="accountDate">Account created on</Label>
          <Input
            type="date"
            id="accountDate"
            value={formData?.accountDate}
            disabled={true}
          />
        </div>
        <div className="mt-5">
          <EmailOTPdialog />
          <Button type="submit">Update Profile</Button>
        </div>
      </form>
    </div>
  );
};

export default page;
