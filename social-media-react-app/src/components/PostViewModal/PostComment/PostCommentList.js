import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import {TitleWrapper} from './PostComment.styles'
import PostCommentItem from './PostCommentItem'

const PostCommentListView = (props) => {
    // TODO API call to get all post comments
    const post = props.post;
    const [comments, setComments] = useState([]);


        axios.defaults.headers={
            "Content-Type":"application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }

        useEffect(()=>{
            axios.get("https://localhost:5001/GetPostComments/" + post.Id)
            .then(res => setComments(res.data))
            .catch(err=>console.log(err))
        },[])

    // temp dummy data
    // var tempComments = [
    //     {
    //         username: "bobbypark123",
    //         comment: "Nice shot!"
    //     }, 
    //     {
    //         username: "johhny_doe",
    //         comment: "Wow"
    //     }, 
    //     {
    //         username: "smithyjane93",
    //         comment: "So pretty!"
    //     }, 
    //     {
    //         username: "bugs_everywhere",
    //         comment: "some comment"
    //     }, 
    //     {
    //         username: "testing-scrolll",
    //         comment: "some comment"
    //     }, 
    //     {
    //         username: "more-scroll",
    //         comment: "some comment"
    //     }, 
    //     {
    //         username: "wut",
    //         comment: "some comment"
    //     }, 
    // ];

    return (
        <div>
        <TitleWrapper>
        <h6>Comments</h6>
        </TitleWrapper>
        <List>
            {comments?.map((comment) => (
               <PostCommentItem comment={comment}/>
            ))}
        </List>
        </div>
    )
}

export default PostCommentListView;