import { useParams } from 'react-router-dom';
import { Post, PostArgs } from '../../App';
import { useLocalStorage } from '../../hooks/UseLocalStorage';
import PostComponent from './Post';
import PostsList from './PostsList';

function TagPostsList() {
    const [posts, setPosts] = useLocalStorage('posts', [])
    const params = useParams();
    const tagPosts = posts.filter( (post:Post)=>post.tags.includes((params.tag!)))
    const postsListArgs = {posts:tagPosts,setPosts:setPosts}
    return (
      <div>
        <button onClick={()=>{location.href = `http://127.0.0.1:5173/`}}>go to all posts</button>
        <h2>Posts with #{params.tag}</h2>
        <PostsList {...postsListArgs}/>
      </div>
    )
}

export default TagPostsList