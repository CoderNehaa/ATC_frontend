import { create } from "zustand";
import { Article, User, Keyword } from "./interface";
import config from "../../web.config.json";
import axios from "axios";

interface PublicStore{
  keywords: Keyword[];
  articles: Article[];
  showSigninForm:boolean, 
  setShowSigninForm:(value:boolean) => void;
  showSignupForm:boolean, 
  setShowSignupForm:(value:boolean) => void;
  getKeywords: () => Promise<void>;
  getTrendingArticles: (userId:number) => Promise<void>;
  getArticlesByKeywordId: (keywordId: number) => Promise<void>;
  getArticleDetails: (articleId: number) => Promise<Article | null>;
}

const usePublicStore = create<PublicStore>((set) => ({
  keywords: [],
  articles: [],
  showSigninForm:false,
  showSignupForm:false,
  setShowSigninForm:(value) => {
    set({showSigninForm:value})
  },
  setShowSignupForm(value) {
    set({showSignupForm:value})
  },
  getKeywords: async () => {
    try {
      const response: any = await axios.get(`${config.apiUrl}/keywords/all`);
      const responseObj = response.data;
      if (responseObj.result) {
        set({ keywords: responseObj.data });
      }
    } catch (error) {
      console.error("Failed to fetch keywords", error);
    }
  },
  getTrendingArticles: async (userId) => {
    try {
      const {data} = await axios.get(`${config.apiUrl}/articles/all`);      
      if (data.result) {
        set({ articles: data.data });
      }
    } catch (error) {
      console.error("Failed to fetch trending articles", error);
    }
  },
  getArticlesByKeywordId: async (keywordId: number) => {
    try {
      const {data} = await axios.get(`${config.apiUrl}/articles/keyword/${keywordId}`);
      if (data.result) {
        set({ articles: data.data });
      }
    } catch (error) {
      console.error("Failed to fetch filtered articles", error);
    }
  },
  getArticleDetails: async (articleId: number): Promise<Article | null> => {
    let article = null;
    try {
      const response: any = await axios.get(`${config.apiUrl}/articles/${articleId}`);
      const responseObj = response.data;
      if (responseObj.result) {
        article = responseObj.data;
      }
    } catch (error) {
      console.error("Failed to fetch article details", error);
    }
    return article;
  },
}))


export default usePublicStore;

