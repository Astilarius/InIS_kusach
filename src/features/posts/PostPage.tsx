// import React from 'react'
// import { useParams } from 'react-router-dom'
// import { Post } from '../../App'
// import { useLocalStorage } from '../../hooks/UseLocalStorage'
// import garbageIcon from '../../assets/i.webp'

// function PostPage() {
//     const [posts, setPosts] = useLocalStorage('posts', [])
//     const params = useParams();
//     const post:Post = posts.find( (post:Post)=>post.id===Number(params.postId))

//     function emojiOnClick(currentPostId:number,emoji:string){
//       console.log(currentPostId)
//       const newPosts = posts.map( (post:Post)=>{
//         if(post.id===currentPostId){
//           post.emojis[emoji]+=1
//         }
//         return post
//       })
//       setPosts(newPosts)
//     }
//     const emojis = Object.entries(post.emojis).map((emoji)=>
//         <button 
//         key={emoji[0]} 
//         onClick={()=>emojiOnClick(post.id, emoji[0])}>
//             {emoji[0]} {emoji[1]}
//         </button>)
//     const onBackClick = ()=>{
//         location.href = 'http://127.0.0.1:5173/'
//     }
//     const onDeleteClick = ()=>{
//       const newPosts = posts.filter((fpost:Post)=>fpost.id!==post.id)
//       setPosts(newPosts)
//       window.location.reload();
//     }
//     const onAuthorClick = ()=>{
//       location.href = `http://127.0.0.1:5173/author/${post.author}`
//     }
//     return (
//         <div className='post'>
//             <button onClick={onBackClick}>back</button>
//             <h1>{post.title}</h1>
//             {
//               post.image !== '' ? 
//               <img src={post.image} alt="Из-за отсустсвия БД картинку было негде сохранить :(" /> : <br/> 
//             }
//             {
//               post.content !== '' ? 
//               <p className='content'>{post.content}</p> : <br/> 
//             }
//             {emojis}
//             <p>by <span className='link' onClick={onAuthorClick}>{post.author}</span></p>
//             <button className='garbaj' onClick={onDeleteClick}><img src={garbageIcon}/></button>
//         </div>
//     )
// }

// export default PostPage

import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Post } from '../../App'
import { useLocalStorage } from '../../hooks/UseLocalStorage'
import garbageIcon from '../../assets/i.webp'

function PostPage() {
    const [posts, setPosts] = useLocalStorage('posts', [])
    const [comment, setComment] = useState('')
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

    function handleCommentChange(event: React.ChangeEvent<HTMLInputElement>) {
        setComment(event.target.value)
    }

    function handleCommentSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (comment.trim() === '') return
        const newPosts = posts.map((post: Post) => {
            if (post.id === Number(params.postId)) {
                post.comments.push(comment)
            }
            return post
        })
        setPosts(newPosts)
        setComment('')
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
              post.content !== '' ? <p className='content'>{post.content}</p> : <br/>  }{emojis}<p>by <span className='link' onClick={onAuthorClick}>{post.author}</span></p>
            <button className='garbaj' onClick={onDeleteClick}><img src={garbageIcon}/></button>
            <form onSubmit={handleCommentSubmit}>
                <input type="text" value={comment} onChange={handleCommentChange} placeholder="Add a comment" />
                <button type="submit">Submit</button>
            </form>
            <ul>
                {post.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        </div>
    )
}

export default PostPage