import React, { useState } from 'react'
import { Post, PostArgs, PostFormArgs } from '../../App'
import PostForm from './PostForm'

function Post(args:PostArgs) {
    const [isEdited, setIsEdited] = useState(false)
    function emojiOnClick(currentPostId:number,emoji:string){
        console.log(currentPostId)
        args.setPosts((posts:Post[])=>{
            posts = posts.map(post=>{
                console.log(post)
                if(post.id===currentPostId){
                    post.emojis[emoji]+=1
                }
                return post
                })
            return posts;
        })
    }
    const onTitleClick = ()=>{
        localStorage.setItem('post',JSON.stringify(args.post))
        location.href = `http://127.0.0.1:5173/post/${args.post.id}`
    }
    const onDeleteClick = ()=>{
        args.setPosts((posts:Post[])=>{
            posts = posts.filter(fpost=>fpost.id!==args.post.id)
            return posts;
        })
    }
    const onEditClick = () => {
        setIsEdited(true)
    }
    const onEditClose = () => {
        setIsEdited(false)
    }
    const emojis = Object.entries(args.post.emojis).map((emoji)=><button key={emoji[0]} onClick={()=>emojiOnClick(args.post.id, emoji[0])}>{emoji[0]} {emoji[1]}</button>)
    const tags = args.post.tags.map(tag=><div onClick={()=>{location.href = `http://127.0.0.1:5173/tag/${tag}`}} className='tag' key={tag}>{tag}#</div>)
    const postFormArgs:PostFormArgs = {onSave:(newPost)=>{
        setIsEdited(false)
        return args.setPosts((posts:Post[])=>{
            console.log(posts)
            console.log(newPost)
            return posts.map((post:Post)=>{
                if(post.id === newPost.id){
                    return newPost
                } else {
                    return post
                }
            })}
        )}, post:args.post,
    }
    return (
        <div className='post' key={args.post.id}>
            {
                isEdited ? 
                <PostForm {...postFormArgs}/> :
                <div>
                    <h3 className='link' onClick={onTitleClick}>{args.post.title}</h3>
                    <div className='content'>
                        {
                        args.post.image !== '' ? 
                        <img src={args.post.image} alt="Из-за отсустсвия БД картинку было негде сохранить :(" /> : <br/> 
                        }
                        {
                        args.post.content !== '' ? 
                        // <div>{postContent}</div> : <br/>
                        <p >{args.post.content}</p> : <br/> 
                        }
                    </div>
                    {emojis} 
                    {tags}
                    <p>posted at {new Date(args.post.timestamp).getHours()}:{new Date(args.post.timestamp).getMinutes() < 10 ? `0${new Date(args.post.timestamp).getMinutes()}`: new Date(args.post.timestamp).getMinutes()}</p>
                    <button className='garbaj' onClick={onDeleteClick}>
                        delete
                        {/* <img src={garbageIcon}/> */}
                    </button>
                    <button className='edit' onClick={onEditClick}>
                        {/* <img src={garbageIcon}/> */}edit
                    </button> 
                </div>
            }
        </div>
    )
}

export default Post