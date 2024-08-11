import React from "react";
import Image from "next/image";
import author from "@/assets/author.webp";
import usePrivateStore from "@/store/privateStore";
import { useEffect, useState } from "react";

interface Props{
    participantsIds:Array<number>,
    setParticipantsIds: (arr:any) => void
}

const ChatMemberSel:React.FC<Props> = ({participantsIds, setParticipantsIds}) => {
  const { users, getUsersList, currentUser } = usePrivateStore();
  const [currentData, setCurrentData] = useState([...users]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsersList();
  }, []);

  useEffect(() => {
    setCurrentData([...users]);
  }, [users]);

  function handleSearchQuery(e: any) {
    const value = e.target.value;
    if (value.length === 0) {
      setCurrentData([...users]);
      setSearchQuery(value);
      return;
    }
    const arr = users.filter((user) =>
      user.username.toLowerCase().includes(value)
    );
    setCurrentData([...arr]);
    setSearchQuery(value);
  }

  const isPresent = (id: Number): boolean => {
    return participantsIds.some((pId) => pId === id);
  };

  function handleParticipantSelection(id: number) {
    const alreadyPresent = isPresent(id);
    if (alreadyPresent) {
      //remove
      const arr = participantsIds.filter((pId) => pId !== id);
      setParticipantsIds([...arr]);
    } else {
      //add
      setParticipantsIds([...participantsIds, id]);
    }
  }

  return (
    <div className="sheetContent" style={{ height: "80vh" }}>
      <div className="searchBar">
        <input
          placeholder="search people"
          type="text"
          value={searchQuery}
          onChange={(e) => {
            handleSearchQuery(e);
          }}
        />
        <span>
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
      </div>

      <div className="grid gap-4 py-4">
        {currentData && currentData.length ? (
          <div>
            {currentData.map((user, index) => {
              if (user.id !== currentUser?.id) {
                return (
                  <div
                    className="card flex justify-between"
                    key={index}
                    onClick={() =>
                      handleParticipantSelection(user.id ? user.id : 0)
                    }
                  >
                    <div className="flex items-center">
                      <div className="cardProfile relative">
                        <Image
                          src={
                            user.profilePicture && user.profilePicture.length
                              ? user.profilePicture
                              : author
                          }
                          height={100}
                          width={25}
                          alt="chat"
                        />
                        {isPresent(user.id ? user.id : 0) ? (
                          <span className="absolute bg-purple-300 opacity-70 h-[100%] w-[100%] rounded-full flex items-center justify-center opacit0">
                            <span
                              className="text-4xl"
                              style={{ fontWeight: "800" }}
                            >
                              <i className="fa-solid fa-check"></i>
                            </span>
                          </span>
                        ) : null}
                      </div>
                      <div className="flex flex-col ml-5">
                        <span>{user.username}</span>
                        <span className="userBio">{user.bio}</span>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ChatMemberSel;
