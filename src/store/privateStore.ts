import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Article, User, ChatInterface } from "./interface";
import config from "../../web.config.json";
import axios from "axios";
import { toast } from "react-toastify";

interface PrivateStore {
  users: User[];
  currentUser: User | null;
  chats: [];
  favoriteArticles: [];
  selectedChat: ChatInterface | null;
  setSelectedChat: (chat: ChatInterface) => void;
  getChats: () => Promise<void>;
  getFavorites: () => void;
  getUserByUserId: (userId: number) => Promise<any>;
  signup: (username: string, email: string, password: string) => Promise<any>;
  passwordLogin: (email: string, password: string) => Promise<boolean>;
  addArticle: (article: Article) => Promise<void>;
  handleGoogleLogin: () => void;
  handleFbLogin: () => void;
  validateUser: () => Promise<void>;
  logout: () => Promise<void>;
  getUsersList: () => Promise<void>;
  createChat: (chatData: any) => Promise<void>;
  getMessages: (chatId: number) => any;
  sendMessage: (messageObj: any) => void;
  updateUser: (user: User) => {};
  sendOTP: () => void;
  verifyOTP: () => void;
  clearSession: () => void;
}

const usePrivateStore = create<PrivateStore>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      chats: [],
      favoriteArticles: [],
      selectedChat: null,
      setSelectedChat: (chat) => {
        set({ selectedChat: chat });
      },
      getFavorites: async () => {},
      getUsersList: async () => {
        const { data } = await axios.get(`${config.apiUrl}/users/all`, {
          withCredentials: true,
        });
        if (data.result) {
          set({ users: data.data });
        }
      },
      getUserByUserId: async (userId: number) => {
        try {
          const response = await axios.get(
            `${config.apiUrl}/users/get/${userId}`
          );
          if (response.data.result) {
            return response.data.data;
          } else {
            console.error("Failed to fetch user data:", response.data.message);
            return null;
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          return null;
        }
      },
      signup: async (username: string, email: string, password: string) => {
        let obj = { result: false, message: "" };
        try {
          const response = await axios.post(`${config.apiUrl}/users/add`, {
            username,
            email,
            password,
          });
          const responseObj = response.data;
          if (responseObj.result) {
            set((state: PrivateStore) => ({
              users: [...state.users, responseObj.data],
            }));
            obj.result = true;
          }
          obj.message = responseObj.message;
        } catch (error) {
          console.error("Failed to add user", error);
          obj.message = "Failed to add user";
        }
        return obj;
      },
      passwordLogin: async (
        email: string,
        password: string
      ): Promise<boolean> => {
        try {
          const { data } = await axios.post(
            `${config.apiUrl}/users/login`,
            { email, password },
            { withCredentials: true }
          );
          if (data.result) {
            set((state: PrivateStore) => ({ currentUser: data.data }));
            toast.success(data.message);
            return true;
          } else {
            toast.error(data.message);
            return false;
          }
        } catch (error) {
          toast.error("Failed to log in! Try again");
          console.error("Failed to log in", error);
          return false;
        }
      },
      handleGoogleLogin: () => {
        window.location.href = "http://localhost:3200/users/auth/google";
      },
      handleFbLogin: () => {
        window.location.href = "http://localhost:3200/users/auth/facebook";
      },
      addArticle: async (article: Article) => {
        try {
          const response = await fetch(`${config.apiUrl}/articles`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(article),
          });
          const data = await response.json();
        } catch (error) {
          console.error("Failed to add article", error);
        }
      },
      validateUser: async (): Promise<void> => {
        const response = await axios.get(
          `${config.apiUrl}/users/getvaliduser`,
          { withCredentials: true }
        );
        if (response.data.result) {
          set({ currentUser: response.data.user });
        } else {
          const { clearSession, currentUser } = get();
          if(currentUser){
            toast.info("Your session has expired! Please login again");
            clearSession();
          }
        }
      },
      updateUser: async (user: User) => {
        const { data } = await axios.put(
          `${config.apiUrl}/users/update/${user.id}`,
          {
            ...user,
          },
          {
            withCredentials: true,
          }
        );
        if (data.result) {
          set({ currentUser: user });
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        return data.result;
      },
      logout: async (): Promise<void> => {
        const { clearSession } = get();
        clearSession();
        const { data } = await axios.get(`${config.apiUrl}/users/logout`, {
          withCredentials: true,
        });
        toast.info(data.message);
      },
      getChats: async () => {
        const response = await axios.get(`${config.apiUrl}/chats/`, {
          withCredentials: true,
        });
        set({ chats: response.data.data });
      },
      createChat: async (chatData: any) => {
        const { data } = await axios.post(
          `${config.apiUrl}/chats/`,
          { ...chatData },
          { withCredentials: true }
        );
        if (data.result) {
          const { getChats } = get();
          getChats();
        }
      },
      getMessages: async (chatId: number) => {
        const { data } = await axios.get(
          `${config.apiUrl}/chats/messages/all/${chatId}`,
          {
            withCredentials: true,
          }
        );
        if (data.result) {
          return data.data;
        } else {
          console.log(data.message);
        }
      },
      sendMessage: async (messageObj: any) => {
        const { data } = await axios.post(
          `${config.apiUrl}/chats/messages/add`,
          {
            ...messageObj,
          },
          {
            withCredentials: true,
          }
        );
        if (!data.result) {
          toast.error(data.message);
        }
      },
      sendOTP: async () => {
        //no need of response
        //could not send otp, try later
        //store opt and otp time in db for 10 minute validation only
        await axios.post(`${config.apiUrl}/users/sendOTP`);
      },
      verifyOTP: () => {
        //response = invalid otp , your email is verified
        //back-end will check otp, if valid, make is verified true, delete otp and otptime from db
      },
      clearSession: () => {
        const { currentUser } = get();
        if (currentUser) {
          set({
            users: [],
            currentUser: null,
            favoriteArticles: [],
            selectedChat: null,
            chats: [],
          });
        }
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
export default usePrivateStore;
