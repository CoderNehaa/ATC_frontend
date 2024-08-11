
export interface Article{
    id?:number,
    userId:number,
    username?:string,
    title:string,
    description?:string,
    content:string,
    articleDate:Date,
    likes:number,
    comments?:[],
    keywords?:[],
    profilePicture:string,
    articleImage:string
}

export interface User{
    id?:number,
    username:string,
    email:string,
    bio:string,
    password?:string,
    socialId?:string,
    provider:string,
    totalArticles:number,
    profilePicture:string
}

export interface Keyword{
    id:number,
    keywordName:string
}

export interface MessageInterface{
    id:number,
    chatId:number,
    senderId:number,
    message:string,
    sentAt:Date
  }
  
  export interface ChatInterface{
      chatId:number,
      dp:string,
      name:string,
      createdAt:Date,
      type:string
  }
  