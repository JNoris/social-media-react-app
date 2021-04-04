//Authors: Athena Kozak
//Styled by: Athena Kozak
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import {ContentComponent, PostActions} from './PostCardContent.styles'
import PostViewModal from "../../PostViewModal/PostViewModal"


const PostStats = (props) => {

    const [like, setLike] = useState(props.isLiked);
    const [heartColor, setHeartColor] = useState(like ? {color: "#e2336b"} : {color: "#fff"});
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenLikes, setIsOpenLikes] = useState(false);
    const isModalView = props.modalView? props.modalView : false;
    const post = props.post;
    const [numOfLikes, setNumOfLikes] = useState(post.numberOfLikes)

    useEffect(() => {
            if(like) {
                setHeartColor({color: "#e2336b"})
            } else if(like === undefined) {
                setLike(false)
            }
        }, 
    [like])

    var showCommentCount = !isModalView ?
        <ContentComponent>
            <ChatBubbleOutlineIcon
                className="icon"
                id="CommentIcon"
                onClick={toggleModal}
            />
            <p id="comments" onClick={toggleModal}>{props.numberOfComments}</p>
        </ContentComponent>
        : null

    var showLikeCount = isModalView ? null :             
        <ContentComponent>
            <FavoriteBorderIcon
                className="icon"
                id="likeIcon"
                onClick={handleLike}
                style={heartColor}
            />
             <p id="likes" onClick={toggleModalLikes}>{numOfLikes}</p> 
        </ContentComponent>

    function handleLike() {
        axios.defaults.headers={
            "Content-Type":"application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        // Console log respons for now
        // Check for updates in like count
        if(!like) {
            axios.post("https://localhost:5001/AddLike/" + post.id)
            .then(res => console.log(res.data))
            .catch(err=>console.log(err))
            setLike(true);
            setHeartColor({color: "#e2336b"});
            var tempLikes = numOfLikes +1;
            setNumOfLikes(tempLikes);
        } else {
            axios.post("https://localhost:5001/RemoveLike/" + post.id)
            .then(res => console.log(res.data))
            .catch(err=>console.log(err))
            setLike(false);
            setHeartColor({color: "#fff"});
            tempLikes = numOfLikes -1;
            setNumOfLikes(tempLikes);
        }
    }

    function toggleModal() {
        setIsOpenLikes(false);
        setIsOpen(!isOpen);
        props.handleUpdate();
    }

    function toggleModalLikes() {
        setIsOpen(false);
        setIsOpenLikes(!isOpenLikes);
    }

    return (
        <div>
        <PostActions>
            {showLikeCount}
            {showCommentCount}
        </PostActions>
        <PostViewModal 
            show={isOpen}
            onClose={toggleModal}
            post = {post}
            viewComments = {true}
        />
        <PostViewModal 
            show={isOpenLikes}
            onClose={toggleModalLikes}
            post = {post}
            viewComments = {false}
        />
        </div>
    )
}

export default PostStats;