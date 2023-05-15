import { useState } from 'react'
import { PostArgs, PostsListArgs } from '../../App'
import PostComponent from './Post'

const PostsList = (args:PostsListArgs) => {
  const [postsClassName, setPostsClassName] = useState('column')
  const renderedPosts = args.posts.map(post => {
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