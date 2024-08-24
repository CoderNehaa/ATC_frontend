"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { User } from "@/store/interface";
import { toast } from "react-toastify";
import usePrivateStore from "@/store/privateStore";
import EmailOTPdialog from "@/custom-components/profile/emailOTPdialog";
import author from "@/assets/author.png";

interface FormDataProps {
  username: string;
  bio: string;
}

const page = () => {
  const { currentUser, updateUser } = usePrivateStore();
  const [image, setImage] = useState<any>("");
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataProps>({
    username: "",
    bio: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username,
        bio: currentUser.bio,
      });
      setImage(currentUser.profilePicture);
    } else {
      router.push("/");
    }
  }, [currentUser]);
  
  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setImage("");
    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result.replace(
          /^data:image\/png;base64,/,
          ""
        );
        setImage(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!currentUser) {
      return;
    }

    if (!formData.username) {
      toast.error("Username cannot be empty");
    }

    const updatedUser: User = {
      ...currentUser,
      username: formData.username,
      bio: formData.bio,
      profilePicture: image,
    };

    const result = await updateUser(updatedUser);
    if (result) {
      //reset
      setFormData({
        username: "",
        bio: "",
      });
      setImage("");
    }
  }

  return (
    <div className="miniPage profilePage">
      <h1>Profile</h1>
      {currentUser ? (
        <form className="relative w-full" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col justify-center items-center mt-5">
            <Image
              src={image && image.length ? image : author}
              height={100}
              width={100}
              alt="chat"
              className="rounded-full"
            />
            <div className="flex flex-col items-start mt-5">
              <Label htmlFor="picture" className="text-right flex items-center">
                Change Profile Picture
              </Label>
              <Input
                id="picture"
                type="file"
                className="mt-2"
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
              value={formData.username}
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
                  bio: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid w-full items-center gap-1.5 mt-5">
            <Label htmlFor="accountDate">Account created on</Label>
            <Input
              type="text"
              value={currentUser.accountDate.split("T")[0]}
              id="accountDate"
              disabled={true}
            />
          </div>
          <div className="mt-5">
            {currentUser.isVerified ? null : <EmailOTPdialog />}
            <Button
              type="submit"
              disabled={
                formData.username === currentUser.username &&
                formData.bio === currentUser.bio &&
                currentUser.profilePicture == image
              }
            >
              Update Profile
            </Button>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default page;
