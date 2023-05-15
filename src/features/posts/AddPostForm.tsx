import { AddPostFormArgs, PostFormArgs } from '../../App'
import { Post } from '../../App'
import PostForm from './PostForm'

const AddPostForm = (args:AddPostFormArgs) => {
    const postFormArgs:PostFormArgs = {onSave:(newPost)=>
        args.setPosts((posts:Post[])=>{
            return [...posts, newPost]
        })
    }
    return (
        <div>
            <h2>Add a New Post</h2>
            <PostForm {...postFormArgs}/>
        </div>
  )
}

export default AddPostForm