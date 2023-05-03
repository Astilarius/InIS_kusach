import React, { ChangeEvent, ReactEventHandler, SyntheticEvent } from 'react'
import { Post } from '../../App'
import { PostsListArgs } from '../../App'
import garbageIcon from '../../assets/i.webp'

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
    // const onTagClick = ()=>{
    //   location.href = `http://127.0.0.1:5173/author/${post.author}`
    // }
    const onDeleteClick = ()=>{
      const newPosts = args.posts.filter(fpost=>fpost.id!==post.id)
      args.setPosts(newPosts)
    }
    console.log(post)
    const emojis = Object.entries(post.emojis).map((emoji)=><button key={emoji[0]} onClick={()=>emojiOnClick(post.id, emoji[0])}>{emoji[0]} {emoji[1]}</button>)
    const tags = post.tags.map(tag=><div className='tag' key={tag}>{tag}#</div>)
    return (
      <article className='post' key={post.id}>
          <h3 className='link' onClick={onTitleClick}>{post.title}</h3>
          {
            post.image !== '' ? 
            <img src={post.image} alt="Из-за отсустсвия БД картинку было негде сохранить :(" /> : <br/> 
          }
          {
            post.content !== '' ? 
            <p className='content'>{post.content}</p> : <br/> 
          }
          {emojis} 
          {tags}
            <p>posted at {new Date(post.timestamp).getHours()}:{new Date(post.timestamp).getMinutes()}</p>
            <button className='garbaj' onClick={onDeleteClick}><img src={garbageIcon}/></button>
      </article>
  )})
  renderedPosts.reverse()
  return (
    <section>
        <h2>Posts</h2>
        <div className='posts'>
          {renderedPosts.length === 0 ? <p>It's so empty here...</p> : <></>}
          {renderedPosts}
        </div>
    </section>
  )
}

export default PostsList