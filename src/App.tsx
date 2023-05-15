import { ChangeEvent, useEffect, useState } from 'react'
import './App.css'
import AddPostForm from './features/posts/AddPostForm'
import PostsList from './features/posts/PostsList'
import { useLocalStorage } from './hooks/UseLocalStorage'

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
}
export interface PostFormArgs{
  post?: Post,
  onSave: (post: Post) => void,
}
export interface AddPostFormArgs{
  // posts: Post[],
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
}
export interface PostArgs{
  post: Post,
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
  const [posts, setPosts] = useLocalStorage('posts', [])
  const [searchQuery, setSearchQuery] = useState('')
  
  const onSearchQueryChanged = (e:ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);
  const addPostFormArgs:AddPostFormArgs = {setPosts:setPosts}
  const postsListArgs:PostsListArgs = {posts:posts,setPosts:setPosts}
  useEffect(()=>{
    console.log(posts)
  },[posts])
  const ClearPosts = ()=>{
      localStorage.removeItem('posts')
      window.location.reload();
  }

  return (
    <div className="App">
      <button onClick={ClearPosts}>Clear all posts</button>
      <AddPostForm {...addPostFormArgs}/>
      <h2>Posts</h2>
      <label htmlFor='postTitle'>Search for a post:</label>
      <input
          type='text'
          id='postTitle'
          name='postTitle'
          value={searchQuery}
          onChange={onSearchQueryChanged} />
      <button onClick={(e)=>{location.href = `http://127.0.0.1:5173/search/${searchQuery}`}}>search</button>
      <PostsList {...postsListArgs}/>
    </div>
  )
}

export default App
