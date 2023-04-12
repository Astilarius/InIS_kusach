import React, { ChangeEvent, ReactEventHandler, SyntheticEvent } from 'react'
import { Post } from '../../App'
import { PostsListArgs } from '../../App'

const PostsList = (args:PostsListArgs) => {
  function emojiOnClick(currentPostId:number,emoji:string){
    console.log(currentPostId)
    const newPosts = args.posts.map(post=>{
      console.log(post)
      if(post.id===currentPostId){
        post.emojis[emoji]+=1
      }
      return post
    })
    args.setPosts(newPosts)
  }
  const renderedPosts = args.posts.map(post => {
    const onTitleClick = ()=>{
      localStorage.setItem('post',JSON.stringify(post))
      location.href = `http://127.0.0.1:5173/post/${post.id}`
    }
    const onAuthorClick = ()=>{
      location.href = `http://127.0.0.1:5173/author/${post.author}`
    }
    console.log(post)
    const emojis = Object.entries(post.emojis).map((emoji)=><button key={emoji[0]} onClick={()=>emojiOnClick(post.id, emoji[0])}>{emoji[0]} {emoji[1]}</button>)
    return (
      <article className='post' key={post.id}>
          <h3 className='link' onClick={onTitleClick}>{post.title}</h3>
          <img src={post.image} alt="" />
          <p className='content'>{post.content}</p>
          {emojis}
          <p>posted at {new Date(post.timestamp).getHours()}:{new Date(post.timestamp).getMinutes()}</p>
          <p className='link' onClick={onAuthorClick}>by {post.author}</p>
      </article>
  )})
  renderedPosts.reverse()
  return (
    <section>
        <h2>Posts</h2>
        <div className='posts'>
          {renderedPosts}
        </div>
    </section>
  )
}

export default PostsList