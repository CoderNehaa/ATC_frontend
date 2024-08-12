import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usePrivateStore from "@/store/privateStore";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

function EmailOTPdialog() {
  const { currentUser, sendOTP, verifyOTP } = usePrivateStore();
  const [value, setValue] = useState("");

  const handleClick = () =>  {
    //send otp
    //give email to back-end and it will send six digit otp to req.user.email
    sendOTP();
  }

  const handleSubmit = () => {
    verifyOTP();
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mr-5" onClick={handleClick}>Verify Email</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Verify Email</DialogTitle>
          <DialogDescription>
            OTP is sent on this email address for verification.
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full items-center gap-1.5 mt-5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={currentUser?.email}
            disabled={true}
          />
        </div>
        <div className="grid w-full items-center gap-1.5 mt-5">
          <Label htmlFor="email">OTP</Label>
          <div className="space-y-2">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
        </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button type="submit" onClick={handleSubmit}>Verify</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EmailOTPdialog;
