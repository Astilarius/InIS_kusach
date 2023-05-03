// make this its own app, for people to make reminders for themselves. features:
// point lists
// tables
// also comments, but for yourself
// tags instead authors
// edit button

import { useEffect, useState } from 'react'
import AddPostForm from './features/posts/AddPostForm'
import PostsList from './features/posts/PostsList'
import { useLocalStorage } from './hooks/UseLocalStorage'
import './App.css'

interface Emojis{
  '👍':number,
  '👎':number,
  '🗿':number,
  [key:string]:number,
}
export interface Post{
  id:number,
  title:string,
  content:string,
  emojis:Emojis,
  timestamp:string,
  image:string,
  comments: string[],
  tags: string[],
}
export interface Comment{
  id:number,
  content:string,
  emojis:Emojis,
  timestamp:string,
  image:string,
  author:string,
}
export interface AddPostFormArgs{
  posts: Post[],
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
}
export interface PostsListArgs{
  posts: Post[],
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
}
export const initialEmojis:Emojis={'👍':0,'👎':0,'🗿':0,'❤️':0}

function App() {
  const currentDate = new Date()
  currentDate.setMinutes(currentDate.getMinutes()-5)
  const post:Post[] = []
  const [posts, setPosts] = useLocalStorage('posts', [])
  // const [posts, setPosts] = useState(post)
  const addPostFormArgs:AddPostFormArgs = {posts:posts,setPosts:setPosts}
  const postsListArgs:PostsListArgs = {posts:posts,setPosts:setPosts}
  useEffect(()=>{
    console.log(posts)
  },[posts])

  return (
    <div className="App">
      <AddPostForm {...addPostFormArgs}/>
      <h2>Posts</h2>
      <PostsList {...postsListArgs}/>
    </div>
  )
}

export default App
