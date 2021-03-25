import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import {ContentComponent, PostActions} from './PostCardContent.styles'
import PostViewModal from "../../PostViewModal/PostViewModal"


const PostStats = (props) => {
    // update with connection
    const [like, setLike] = useState(false);
    const [heartColor, setHeartColor] = useState({color: "#fff"})
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenLikes, setIsOpenLikes] = useState(false)
    const isModalView = props.modalView? props.modalView : false;

    useEffect(() => {
            if(like) {
                setHeartColor({color: "#e2336b"})
            }
        }, 
    [like])

    var showCommentCount = !props.comments || isModalView ? null : 
        <ContentComponent>
            <ChatBubbleOutlineIcon
                className="icon"
                id="CommentIcon"
                onClick={toggleModal}
            />
            <p id="comments" onClick={toggleModal}>{props.comments}</p>
        </ContentComponent>

    var showLikeCount = !props.likes || isModalView ? null :             
        <ContentComponent>
            <FavoriteBorderIcon
                className="icon"
                id="likeIcon"
                onClick={handleLike}
                style={heartColor}
            />
             <p id="likes" onClick={toggleModalLikes}>{props.likes}</p> 
        </ContentComponent>

    function handleLike() {
        // TO DO add API Call functionality
        setLike(!like);
        if(like) {
            setHeartColor({color: "#e2336b"});
        } else {
            setHeartColor({color: "#fff"});
        }
    }

    function toggleModal() {
        setIsOpenLikes(false);
        setIsOpen(!isOpen);
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
            post = {props.post}
            viewComments = {true}
        />
        <PostViewModal 
            show={isOpenLikes}
            onClose={toggleModalLikes}
            post = {props.post}
            viewComments = {false}
        />
        </div>
    )
}

export default PostStats;