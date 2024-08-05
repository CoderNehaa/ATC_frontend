
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
