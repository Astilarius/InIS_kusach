import React from 'react'
import { useLocalStorage } from '../../hooks/UseLocalStorage';
import { useParams } from 'react-router-dom';
import { Post } from '../../App';

function AuthorPostsList() {
    const [posts, setPosts] = useLocalStorage('posts', [])
    const params = useParams();
    const authorPosts = posts.filter( (post:Post)=>post.author===params.author)
    function emojiOnClick(currentPostId:number,emoji:string){
      console.log(currentPostId)
      const newPosts = authorPosts.map( (post:Post)=>{
        console.log(post)
        if(post.id===currentPostId){
          post.emojis[emoji]+=1
        }
        return post
      })
      setPosts(newPosts)
    }
    const renderedPosts = authorPosts.map((post:Post) => {
      const onClick = ()=>{
        localStorage.setItem('post',JSON.stringify(post))
        location.href = `http://127.0.0.1:5173/post/${post.id}`
      }
      const emojis = Object.entries(post.emojis).map((emoji)=><button key={emoji[0]} onClick={()=>emojiOnClick(post.id, emoji[0])}>{emoji[0]} {emoji[1]}</button>)
      return (
        <article className='post' key={post.id}>
            <h3 onClick={onClick}>{post.title}</h3>
            <p className='content'>{post.content}</p>
            {emojis}
            <p>posted at {new Date(post.timestamp).getHours()}:{new Date(post.timestamp).getMinutes()}</p>
            <p>by {post.author}</p>
        </article>
    )})
    renderedPosts.reverse()
    const onBackClick = ()=>{
        location.href = 'http://127.0.0.1:5173/'
    }
    return (
      <section>
        <button onClick={onBackClick}>back</button>
          <h2>Posts by {params.author}</h2>
          {renderedPosts}
      </section>
    )
}

export default AuthorPostsList