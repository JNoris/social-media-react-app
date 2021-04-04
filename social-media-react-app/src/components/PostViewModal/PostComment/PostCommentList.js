//Authors: Athena Kozak
//Styled by: Athena Kozak
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import {TitleWrapper} from './PostComment.styles'
import PostCommentItem from './PostCommentItem'

const PostCommentListView = (props) => {
    const [comments, setComments] = useState([]);
    const currentUserName = localStorage.getItem("username");
    const [refreshComponent, setRefreshComponent] = useState(false);
    const postId = props.postId;
    
    axios.defaults.headers={
        "Content-Type":"application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
    
    useEffect(()=>{
        axios.get("https://localhost:5001/GetPostComments/" + postId)
        .then(res => setComments(res.data))
        .catch(err=>console.log(err))
        setRefreshComponent(false)
     },[refreshComponent, postId])

     function handleRefresh() {
         setRefreshComponent(true);
     }

    return (
        <div>
        <TitleWrapper>
        <h6>Comments</h6>
        </TitleWrapper>
        <List>
            {comments?.map((comment) => (
               <PostCommentItem 
                key={comment.id} 
                comment={comment} 
                currentUserName={currentUserName}
                handleDelete={handleRefresh}
                />
            ))}
        </List>
        </div>
    )
}

export default PostCommentListView;