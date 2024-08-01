import {create} from "zustand";
import { Article, User, Keyword } from "./interface";

interface Store {
    keywords: Keyword[];
    articles: Article[];
    users: User[];
    getKeywords:() => Promise<void>,
    getTrendingArticles: () => Promise<void>;
    getFilteredArticles: (keywordId: number) => Promise<void>;
    getArticleDetails: (articleId: number) => Promise<Article | null>;
    addUser: (username: string, email: string, password: string) => Promise<void>;
    passwordLogin: (email: string, password: string) => Promise<void>;
    googleLogin: () => Promise<void>;
    facebookLogin: () => Promise<void>;
    addArticle: (article: Article) => Promise<void>;
}

const useStore = create<Store>((set) => ({
    keywords: [],
    articles: [],
    users: [],
    getKeywords:async () => {
        try {
            const response = await fetch('http://localhost:3200/keywords/all');            
            const data = await response.json();
            if(data.result){            
                set({ keywords: data.data });
            }
        } catch (error) {
            console.error("Failed to fetch trending articles", error);
        }
    },
    getTrendingArticles: async () => {
        try {
            const response = await fetch('http://localhost:3200/articles/trending');  
            const data = await response.json();
            if(data.result){            
                set({ articles: data.data });
            }
        } catch (error) {
            console.error("Failed to fetch trending articles", error);
        }
    },
    getFilteredArticles: async (keywordId: number) => {
        try {
            const response = await fetch(`/api/articles?keywordId=${keywordId}`);
            const data = await response.json();
            set({ articles: data });
        } catch (error) {
            console.error("Failed to fetch filtered articles", error);
        }
    },
    getArticleDetails: async (articleId: number): Promise<Article | null> => {
        try {
            const response = await fetch(`/api/articles/${articleId}`);
            if (!response.ok) {
                throw new Error(`Error fetching article with ID ${articleId}: ${response.statusText}`);
            }
            const article: Article = await response.json();
            return article;
        } catch (error) {
            console.error("Failed to fetch article details", error);
            return null;
        }
    },
    addUser: async (username: string, email: string, password: string) => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            set((state: Store) => ({ users: [...state.users, data] }));
        } catch (error) {
            console.error("Failed to add user", error);
        }
    },
    passwordLogin: async (email: string, password: string) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            set((state: Store) => ({ users: [...state.users, data] }));
        } catch (error) {
            console.error("Failed to log in", error);
        }
    },
    googleLogin: async () => {
        // Implement Google login logic
    },
    facebookLogin: async () => {
        // Implement Facebook login logic
    },
    addArticle: async (article: Article) => {
        try {
            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(article),
            });
            const data = await response.json();
            set((state: Store) => ({ articles: [...state.articles, data] }));
        } catch (error) {
            console.error("Failed to add article", error);
        }
    }
}));

export default useStore;