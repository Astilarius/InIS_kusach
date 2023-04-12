import React from 'react'
import { useParams } from 'react-router-dom'
import { Post } from '../../App'
import { useLocalStorage } from '../../hooks/UseLocalStorage'

function PostPage() {
    const [posts, setPosts] = useLocalStorage('posts', [])
    const params = useParams();
    const post:Post = posts.find( (post:Post)=>post.id===Number(params.postId))

    function emojiOnClick(currentPostId:number,emoji:string){
      console.log(currentPostId)
      const newPosts = posts.map( (post:Post)=>{
        if(post.id===currentPostId){
          post.emojis[emoji]+=1
        }
        return post
      })
      setPosts(newPosts)
    }
    const emojis = Object.entries(post.emojis).map((emoji)=>
        <button 
        key={emoji[0]} 
        onClick={()=>emojiOnClick(post.id, emoji[0])}>
            {emoji[0]} {emoji[1]}
        </button>)
    const onBackClick = ()=>{
        location.href = 'http://127.0.0.1:5173/'
    }
    return (
        <div className='post'>
            <button onClick={onBackClick}>back</button>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            {emojis}
        </div>
    )
}

export default PostPage