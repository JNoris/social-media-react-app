import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import {TitleWrapper} from './PostComment.styles'
import PostCommentItem from './PostCommentItem'

const PostCommentListView = (props) => {
    const [comments, setComments] = useState([]);
    
    axios.defaults.headers={
        "Content-Type":"application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }

    useEffect(()=>{
        axios.get("https://localhost:5001/GetPostComments/" + props.postId)
        .then(res => setComments(res.data))
        .catch(err=>console.log(err))
     },[])

    return (
        <div>
        <TitleWrapper>
        <h6>Comments</h6>
        </TitleWrapper>
        <List>
            {comments?.map((comment) => (
               <PostCommentItem key={comment.id} comment={comment}/>
            ))}
        </List>
        </div>
    )
}

export default PostCommentListView;