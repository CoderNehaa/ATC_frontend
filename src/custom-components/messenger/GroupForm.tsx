"use client"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from "react";

interface Props{
  setFormData:(values:any) => void
}

const GroupForm:React.FC<Props> = ({setFormData}) => {
  const [image, setImage] = useState("");

  const handleImageChange = (event:any) => {
      const file = event.target.files[0]; // Get the selected file
      if (file) {
          const reader:any = new FileReader();
          reader.onloadend = () => {    
            const base64Data = reader.result.replace(/^data:image\/png;base64,/, "");          
              setImage(base64Data); // Set the Base64 string
              setFormData((prev:any) => ({...prev, dp:base64Data}));
          };
          reader.readAsDataURL(file); // Convert file to Base64 string
      }
  };

  return (
  <div className="gap-4 py-4" style={{height:"85vh"}}>
    <div className="flex flex-col justify-center items-center mt-5">
      <span className="h-28 w-28 p-4 rounded-full border overflow-hidden mb-8">
        {image && image.length ? <Image src={image} width={100} height={100} alt="Group Profile"/>:
       <span className="text-5xl relative h-full w-full flexColCenter"> <i className="fa-solid fa-users"></i></span>}
      </span>
      <div className="flex flex-col items-start mb-5">
        <Label htmlFor="picture" className="text-right flex items-center">Upload Group Profile Picture</Label>
        <Input id="picture" type="file" className="mt-2" onChange={(e) => handleImageChange(e)}   />
      </div>
    </div> 
    <div className="flex flex-col items-start">
      <Label htmlFor="username" className="text-right flex items-center">
        Group Name <span className="text-red-600 text-lg">*</span>
      </Label>
      <Input id="username" placeholder="Enter Group Name" className="mt-2" 
        onChange={(e) => setFormData((prev:any) => ({...prev, name:e.target.value}))}/>
        <span className="text-sm text-gray-600">Group Name will be visible to all group members.</span>
    </div>

    
  </div>
  )
}

export default GroupForm
