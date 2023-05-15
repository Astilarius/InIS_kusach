import { ChangeEvent, useState, FocusEvent } from 'react'
import React from 'react'
import { PostFormArgs } from '../../App'
import { Post } from '../../App'
import { initialEmojis } from '../../App'
import { useLocalStorage } from '../../hooks/UseLocalStorage'

const AddPostForm = (args:PostFormArgs) => {
    const [title, setTitle] = useState(args.post ? args.post.title : '')
    const [content, setContent] = useState(args.post ? args.post.content : '')
    const [image, setImage] = useState(args.post ? args.post.image : '')
    const [tags, setTags] = useState<string[]>(args.post ? args.post.tags : [])
    const [tag, setTag] = useState<string>('')
    const [id, setId] = useLocalStorage('id', 1)
    const [titleError,setTitleError] = useState('')
    const [contentError,setContentError] = useState('')

    const onTitleBlur = (e:FocusEvent<HTMLInputElement>) => {
        if(e.target.value.length < 1){
            setTitleError('Every post needs a title')
        } else {
            setTitleError('')
        }
    }
    const onTitleFocus = (e:FocusEvent<HTMLInputElement>) => {
        setTitleError('')
        setContentError('')
    }
    const onContentFocus = (e:FocusEvent<HTMLTextAreaElement>) => {
        setContentError('')
    }
    const onImageFocus = (e:FocusEvent<HTMLInputElement>) => {
        setContentError('')
    }
    const onImageChanged = (e:ChangeEvent<HTMLInputElement>) => { 
        if(e.target.files!==null){
            console.log(e.target.files[0])
            
            console.log(URL.createObjectURL(e.target.files[0]))
            getImageDataURL(e.target.files[0]).then( result => {
                setImage(result);
            })
        }}
    const tagAdd = (newTag:string) => {
        if (!tags.includes(newTag)){
            const newTags = [...tags, newTag]
            setTags(newTags)
            setTag('')
        } else {
            setTag('')
        }
    }
    const tagRemove = (tagToRemove:string) => {
        if (tags.includes(tagToRemove)){
            const newTags = tags.filter(tag=>tag!==tagToRemove)
            setTags(newTags)
            setTag('')
        }
    }
    const onTagChanged = (e:ChangeEvent<HTMLInputElement>) => setTag(e.target.value);
    const onTitleChanged = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const onContentChanged = (e:ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

    const onSavePostClicked = () => {
        if (title && (content || image)){
            const newPost: Post = {
                id: args.post ? args.post.id : id,
                title: title,
                content: content,
                emojis: Object.assign({}, initialEmojis),
                timestamp: new Date().toUTCString(),
                image: image,
                comments: [],
                tags: tags,
            }
            args.onSave(newPost)
            const newId = id+1;
            setId(newId)
            setTitle('')
            setContent('')
            setTags([])
            setImage('')
        } else {
            setContentError('Each post needs title and content or image')
        }
    }
    const tagComponent = tags.map(postTag=>
        {
            const onTagXClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
                e.preventDefault()
                tagRemove(postTag)
            }
            return (
            <div key={postTag}>
                <span>#{postTag}</span>
                <button className='Xbutton'
                    onClick={onTagXClick}
                >x</button>
            </div>
            )
        })

  return (
    <section>
        <form>
            <label htmlFor='postTitle'>Post title:</label>
            <input 
                type='text'
                id='postTitle'
                name='postTitle'
                value={title}
                onBlur={onTitleBlur}
                onFocus={onTitleFocus}
                onChange={onTitleChanged} />
            <p className='error'>{titleError}</p>
            <label htmlFor='postContent'>Content:</label>
            <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onFocus={onContentFocus}
                    onChange={onContentChanged} />
            <label htmlFor='file'>Image:</label>
            <input accept='.jpg' 
                onChange={onImageChanged}
                onFocus={onImageFocus}
                type='file' 
                name='file' 
                id='file'/><br />
            <label htmlFor='postTag'>Add tag:</label>
            <input 
                type='text'
                id='postTag'
                name='postTag'
                value={tag}
                onChange={onTagChanged}
                onKeyDown={(e)=>{
                    if(e.key==='Enter'){
                        e.preventDefault()
                        tagAdd(tag)
                    }
                }} />
                <button onClick={(e)=>{
                    e.preventDefault()
                    tagAdd(tag)
                }}>add tag</button>
            {tagComponent}
            <button type='button' onClick={onSavePostClicked} >Save post</button>
        </form>
        <p className='error'>{contentError}</p>
    </section>
  )
}

function getImageDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      // Create a FileReader object
      const reader = new FileReader();
  
      // Set the onload event handler
      reader.onload = function() {
        // Get the data URL from the reader
        const dataURL = reader.result as string;
  
        // Resolve the promise with the data URL
        resolve(dataURL);
      };
  
      // Set the onerror event handler
      reader.onerror = function() {
        // Reject the promise with the error
        reject(reader.error);
      };
  
      // Read the file as a data URL
      reader.readAsDataURL(file);
    });
}

export default AddPostForm