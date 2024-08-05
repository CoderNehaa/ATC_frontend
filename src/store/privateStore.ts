import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Article, User, Keyword } from "./interface";
import config from "../../web.config.json";
import axios from "axios";

interface PrivateStore {
  users: User[];
  currentUser: User | null;
  setCurrentUser: (user: User | null) => Promise<void>;
  getUserByUserId: (userId: number) => Promise<any>;
  signup: (username: string, email: string, password: string) => Promise<any>;
  passwordLogin: (email: string, password: string) => Promise<boolean>;
  addArticle: (article: Article) => Promise<void>;
  handleGoogleLogin: () => void;
  handleFbLogin: () => void;
  validateUser: () => Promise<void>;
}

const usePrivateStore = create<PrivateStore>()(
  persist(
    (set) => ({
      users: [],
      currentUser: null,
      setCurrentUser: async (user: User | null) => {
        set({ currentUser: user });
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
          window.alert("Your session has expired! Please login again");
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

