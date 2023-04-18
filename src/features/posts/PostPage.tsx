import React from 'react'
import { useParams } from 'react-router-dom'
import { Post } from '../../App'
import { useLocalStorage } from '../../hooks/UseLocalStorage'
import garbageIcon from '../../assets/i.webp'

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
    const onDeleteClick = ()=>{
      const newPosts = posts.filter((fpost:Post)=>fpost.id!==post.id)
      setPosts(newPosts)
      window.location.reload();
    }
    const onAuthorClick = ()=>{
      location.href = `http://127.0.0.1:5173/author/${post.author}`
    }
    return (
        <div className='post'>
            <button onClick={onBackClick}>back</button>
            <h1>{post.title}</h1>
            {
              post.image !== '' ? 
              <img src={post.image} alt="Из-за отсустсвия БД картинку было негде сохранить :(" /> : <br/> 
            }
            {
              post.content !== '' ? 
              <p className='content'>{post.content}</p> : <br/> 
            }
            {emojis}
            <p>by <span className='link' onClick={onAuthorClick}>{post.author}</span></p>
            <button className='garbaj' onClick={onDeleteClick}><img src={garbageIcon}/></button>
        </div>
    )
}

export default PostPage