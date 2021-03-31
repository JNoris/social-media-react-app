import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import {TitleWrapper} from './PostComment.styles'
import PostCommentItem from './PostCommentItem'

const PostCommentListView = (props) => {
    const [comments, setComments] = useState([]);
    const [currentUserName, setCurrentUserName] = useState("")
    
    axios.defaults.headers={
        "Content-Type":"application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }

    useEffect(() => {
        getCurrentUserDetails();
    })

    useEffect(()=>{
        axios.get("https://localhost:5001/GetPostComments/" + props.postId)
        .then(res => setComments(res.data))
        .catch(err=>console.log(err))
     },[])

     function getCurrentUserDetails()
     {
         axios.get("https://localhost:5001/getcurrentuserdetails")
         .then(res => setCurrentUserName(res.data.userName))
         .catch(err=>console.log(err))
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
                />
            ))}
        </List>
        </div>
    )
}

export default PostCommentListView;