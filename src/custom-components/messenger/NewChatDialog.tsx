import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import usePrivateStore from "@/store/privateStore";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ChatMemberSel from "./ChatMemberSel";
import GroupForm from "./GroupForm";

interface Props{
  setShowNewChatBox:(value:boolean) => void
}

const NewChatDialog:React.FC<Props> = ({setShowNewChatBox})  => {
  const [participantsIds, setParticipantsIds] = useState(Array<number>);
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const {createChat, currentUser} = usePrivateStore();
  const [showSubmitBtn, setShowSubmitBtn ] = useState(false);

  const [formData, setFormData] = useState({
    name:"",
    dp:""
  })

  useEffect(() => {    
    if(participantsIds.length === 1){
      setShowSubmitBtn(true);
      return
    }

    if(participantsIds.length>1 && !showGroupInfo){
      setShowSubmitBtn(false);
    }

    if(participantsIds.length>1 && showGroupInfo && formData.name !== ""){
      setShowSubmitBtn(true);
    }
    
    if(participantsIds.length>1 && showGroupInfo && formData.name === ""){
      setShowSubmitBtn(false);
    }
  }, [participantsIds, showGroupInfo, formData])


  async function handleSubmit() {
    if (participantsIds.length === 0) {
      window.alert("Select people to chat");
      return;
    }

    if (participantsIds.length === 1) {
      await createChat({
        type: "individual",
        name: null,
        participants: [...participantsIds, currentUser?.id],
        dp:null
      });
      setParticipantsIds([]);
      setShowNewChatBox(true);
      return;
    }

    if (participantsIds.length > 1) {
      await createChat({
        type:"group",
        name:formData.name,
        participants: [...participantsIds, currentUser?.id],
        dp:formData.dp
      });
    }

    setParticipantsIds([]);
    setShowGroupInfo(false);
    setShowNewChatBox(true);
    setShowSubmitBtn(false);
    setFormData({name:"", dp:""});
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            {" "}
            <i className="fa-solid fa-plus mr-2"></i> New Chat
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {showGroupInfo ? "Create Group" : "Select People"}
            </SheetTitle>
            {showGroupInfo ? null : (
              <SheetDescription>
                Select One user for individual chat and more for group chat
              </SheetDescription>
            )}
          </SheetHeader>

          {showGroupInfo ? (
            <GroupForm setFormData={setFormData} />
          ) : (
            <ChatMemberSel
              participantsIds={participantsIds}
              setParticipantsIds={setParticipantsIds}
            />
          )}

          <div
            className={`sheetFooter flex items-center ${
              showGroupInfo ? "justify-between" : "justify-end"
            }`}
          >
            {showGroupInfo && (
              <span
                className="swipeBtn flexCenter"
                onClick={() => setShowGroupInfo(false)}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </span>
            )}
            {!showSubmitBtn && participantsIds.length > 0 && (
              <span
                className="swipeBtn flexCenter"
                onClick={() => setShowGroupInfo(!showGroupInfo)}
              >
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            )}
            {showSubmitBtn && participantsIds.length > 0 ? (
              <SheetClose className="right-6">
                <button>
                  <span
                    className="swipeBtn flexCenter"
                    onClick={handleSubmit}
                  >
                    <i className="fa-solid fa-check"></i>
                  </span>
                </button>
              </SheetClose>
            ) : null}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
export default NewChatDialog;
