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
    profilePicture?:string,
    articleImage?:string,
    isFavorite?:boolean
}

export interface User{
    id:number,
    username:string,
    email:string,
    bio:string,
    password?:string,
    socialId?:string,
    provider:string,
    totalArticles:number,
    profilePicture:string,
    accountDate:string,
    isVerified:boolean
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
    sentAt:Date,
    senderName?:string
}
  
export interface ChatInterface{
    id:number,
    dp:string,
    name:string,
    createdAt:Date,
    type:string,
    receiver?:any
}
  