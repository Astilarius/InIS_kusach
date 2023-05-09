import React, { ChangeEvent, ReactEventHandler, SyntheticEvent, useState } from 'react'
import { Post, PostArgs } from '../../App'
import { PostsListArgs } from '../../App'
import garbageIcon from '../../assets/i.webp'
import PostComponent from './Post'

const PostsList = (args:PostsListArgs) => {
  const [postsClassName, setPostsClassName] = useState('column')
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
    const onDeleteClick = ()=>{
      const newPosts = args.posts.filter(fpost=>fpost.id!==post.id)
      args.setPosts(newPosts)
    }
    const onEditClick = () => {

    }
    const emojis = Object.entries(post.emojis).map((emoji)=><button key={emoji[0]} onClick={()=>emojiOnClick(post.id, emoji[0])}>{emoji[0]} {emoji[1]}</button>)
    const tags = post.tags.map(tag=><div onClick={()=>{location.href = `http://127.0.0.1:5173/tag/${tag}`}} className='tag' key={tag}>{tag}#</div>)
    const postArgs:PostArgs = {post:post, setPosts:args.setPosts};
    return (
      <PostComponent key={post.id} {...postArgs}/>
  )})
  renderedPosts.reverse()
  const onGridClick = ()=>{
    setPostsClassName('grid')
  }
  const onColumnClick = ()=>{
    setPostsClassName('column')
  }

  
  
  return (
    <section>
      <button type='button' onClick={onGridClick}>grid</button>
      <button type='button' onClick={onColumnClick}>column</button>
      <div className={`posts ${postsClassName}`}>
        {renderedPosts.length === 0 ? <p>It's so empty here...</p> : <>
          {renderedPosts}
        </>}
      </div>
    </section>
  )
}

export default PostsList