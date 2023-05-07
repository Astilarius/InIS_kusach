import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Post, PostArgs, PostsListArgs } from '../../App'
import { useLocalStorage } from '../../hooks/UseLocalStorage'
import garbageIcon from '../../assets/i.webp'
import PostsList from './PostsList'
import PostComponent from './Post'

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
    const postArgs:PostArgs = {post:post,setPosts:setPosts}
    const postsListArgs:PostsListArgs = {posts:[post],setPosts:setPosts}
    const commentRemove = (commentToRemove:string) => {
        if (post.comments.includes(commentToRemove)){
            const newPosts = posts.map((post: Post) => {
                if (post.id === Number(params.postId)) {
                    post.comments = post.comments.filter(comment=>comment!==commentToRemove)
                }
                return post
            })
            setPosts(newPosts)
            setComment('')
        }
    }
    return (
        <div>
            <button onClick={()=>{location.href = `http://127.0.0.1:5173/`}}>go to all posts</button>
            <PostComponent {...postArgs}/>
            <form onSubmit={handleCommentSubmit}>
                <input type="text" value={comment} onChange={handleCommentChange} placeholder="Add a comment" />
                <button type="submit">Submit</button>
            </form>
            <ul>
                {post.comments.map((comment, index) => {
                    const onCommentXClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
                        e.preventDefault()
                        commentRemove(comment)
                    }
                    return (
                        <li key={index}>{comment}
                            <button className='Xbutton'
                            onClick={onCommentXClick}
                            >x</button>
                        </li>
                    )}
                )}
            </ul>
        </div>
    )
}

export default PostPage