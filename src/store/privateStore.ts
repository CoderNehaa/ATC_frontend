import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Article, User, Keyword } from "./interface";
import config from "../../web.config.json";
import axios from "axios";

interface PrivateStore {
  users: User[];
  currentUser: User | null;
  favoriteArticles:[],
  chats:[],
  getChats:() => Promise<void>;
  setCurrentUser: (user: User | null) => Promise<void>;
  getUserByUserId: (userId: number) => Promise<any>;
  signup: (username: string, email: string, password: string) => Promise<any>;
  passwordLogin: (email: string, password: string) => Promise<boolean>;
  addArticle: (article: Article) => Promise<void>;
  handleGoogleLogin: () => void;
  handleFbLogin: () => void;
  validateUser: () => Promise<void>;
  logout: () => Promise<void>;
  getUsersList:() => Promise<void>;
  createChat:(chatData:any) => Promise<void>;
  getMessages: (chatId:number) => any
}

const usePrivateStore = create<PrivateStore>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      favoriteArticles:[],
      chats:[],
      setCurrentUser: async (user: User | null) => {
        set({ currentUser: user });
      },
      getUsersList: async () => {
        const {data}= await axios.get(`${config.apiUrl}/users/all`, {withCredentials:true});
        if(data.result){
          set({users:data.data})
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
          const response = await axios.post(
            `${config.apiUrl}/users/login`,
            { email, password },
            { withCredentials: true }
          );
          const responseObj = await response.data;
          if (responseObj.result) {
            set((state: PrivateStore) => ({ currentUser: responseObj.data }));
            return true;
          } else {
            window.alert(responseObj.message);
            return false;
          }
        } catch (error) {
          window.alert("Failed to log in! Try again");
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
          const {currentUser} = get()
          if(currentUser){
            window.alert("Your session has expired! Please login again");
            set({
              users: [],
              chats:[],
              currentUser: null,
              favoriteArticles:[]
            })
          }
        }
      },
      logout: async() : Promise<void>=>{
        //destroy session and call logout API
        set({
          users: [],
          currentUser: null,
          favoriteArticles:[],
          chats:[]
        })
        const {data} = await axios.get(`${config.apiUrl}/users/logout`, {
          withCredentials:true
        });
        window.alert(data.message);
      },
      getChats:async () => {
        const response = await axios.get(`${config.apiUrl}/chats/`, {withCredentials:true});        
        set({chats:response.data.data})
      },
      createChat:async(chatData:any) => {
        const {data} = await axios.post(`${config.apiUrl}/chats/`, {...chatData}, {withCredentials:true});
        if(data.result){
          const {getChats} = get();
          getChats();
        }
        window.alert(data.message);
      },
      getMessages:async (chatId:number) =>{
        const {data} = await axios.get(`${config.apiUrl}/chats/messages/all/${chatId}`, {
          withCredentials:true
        });
        if(data.result){
          return data.data;
        } else {
          window.alert(data.message);
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

