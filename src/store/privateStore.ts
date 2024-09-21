import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Article, User, ChatInterface, CommentInterface } from "./interface";
import config from "../../web.config.json";
import axios from "axios";
import { toast } from "react-toastify";

interface PrivateStore {
  users: User[];
  currentUser: User | null;
  chats: [];
  favoriteArticles: Array<Article>;
  selectedChat: ChatInterface | null;
  setSelectedChat: (chat: ChatInterface) => void;
  getChats: () => Promise<void>;
  getBookmarks: () => void;
  getUserByUserId: (userId: number) => Promise<any>;
  signup: (username: string, email: string, password: string) => Promise<any>;
  passwordLogin: (email: string, password: string) => Promise<boolean>;
  addArticle: (article: Article) => Promise<boolean>;
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
  addFavoriteArticle:(article:Article)=> Promise<boolean>, 
  removeFavoriteArticle:(article:Article) => Promise<boolean>,
  addComment:(comment:CommentInterface) => Promise<boolean>,
  toggleLikes:(articleId:number) => Promise<void>
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
      getBookmarks: async () => {
        try {
          const {data}: any = await axios.get(`${config.apiUrl}/articles/favorites`, {
            withCredentials:true
          });
          if (data.result) {
            set({ favoriteArticles: data.data });
          }
        } catch (error) {
          console.error("Failed to fetch favorite articles! Try later", error);
        }
      },
      getUsersList: async () => {
        const { data } = await axios.get(`${config.apiUrl}/users/all`, {
          withCredentials: true,
        });
        if (data.result) {
          set({ users: data.data });
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
          const {data} = await axios.post(`${config.apiUrl}/articles/add`, {
            ...article
          }, {
            withCredentials:true
          });
          toast.info(data.message);
          return data.result;
        } catch (error) {
          console.error("Failed to add article", error);
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
      addFavoriteArticle:async (article)=> {
        const {data} = await axios.post(`${config.apiUrl}/articles/favorites/add/${article.id}`, 
          {}, 
          {withCredentials:true});
        if(data.result){
          set((state:PrivateStore) => ({favoriteArticles:[article, ...state.favoriteArticles]}));
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        return data.result;
      }, 
      removeFavoriteArticle:async (article) => {
        const {data} = await axios.delete(`${config.apiUrl}/articles/favorites/remove/${article.id}`, 
          {withCredentials:true});          
        if(data.result){
          const {favoriteArticles} = get();
          const arr = favoriteArticles.filter((obj) => obj.id !== article.id);
          set({favoriteArticles:arr});
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
          const { chats, getChats } = get();
          getChats();
          return data.data
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
      addComment:async (comment:CommentInterface) => {
        try{
          const {data} = await axios.post(`${config.apiUrl}/comments/add`, {...comment}, {withCredentials:true})
          toast.info(data.message);
          return data.result;
        } catch (e){
          console.log(e);
          toast.error("Failed to add Comment! Try later.")
        }
      },
      toggleLikes:async (articleId:number) => {
        try{
          const {data} = await axios.post(`${config.apiUrl}/articles/likes/${articleId}`, {}, {withCredentials:true})
          toast.info(data.message);
          return data.result;
        } catch (e){
          console.log(e);
          toast.error("Failed to like article! Try later.")
        }
      }
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
export default usePrivateStore;
