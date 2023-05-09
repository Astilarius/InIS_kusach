import React from 'react'
import { useParams } from 'react-router-dom';
import { Post } from '../../App';
import { useLocalStorage } from '../../hooks/UseLocalStorage';
import PostsList from './PostsList';

function SearchPosts() {
  const [posts, setPosts] = useLocalStorage('posts', [])
  const params = useParams();
  const titlePosts = posts.filter( (post:Post)=>post.title.includes((params.title!)))
  const postsListArgs = {posts:titlePosts,setPosts:setPosts}
  return (
    <div>
      <button onClick={()=>{location.href = `http://127.0.0.1:5173/`}}>go to all posts</button>
      <h2>Posts with {params.title}</h2>
      {/* {renderedPosts} */}
      <PostsList {...postsListArgs}/>
    </div>
  )
}

export default SearchPosts