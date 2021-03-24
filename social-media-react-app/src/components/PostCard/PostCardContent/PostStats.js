import React, { useState } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import {ContentComponent, PostActions} from './PostCardContent.styles'
import PostViewModal from '../../PostViewModal/PostViewModal'

const PostStats = (props) => {
    const [like, setLike] = useState(false);
    const [heartColor, setHeartColor] = useState({color: "#fff"})
    const [isOpen, setIsOpen] = useState(false)

    var showCommentCount = !props.comments ? null : <ContentComponent>
    <ChatBubbleOutlineIcon
        className="icon"
        id="CommentIcon"
        onClick={toggleModal}
    />
        {/* onClick open list view of commments */}
        <p id="comments">{props.comments}</p>
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
        setIsOpen(!isOpen);
    }

    return (
        <div>
        <PostActions>
            <ContentComponent>
                <FavoriteBorderIcon
                    className="icon"
                    id="likeIcon"
                    onClick={handleLike}
                    style={heartColor}
                />
                    {/* onClick open list view of likes */}
                    <p id="likes">{props.likes}</p> 
                    {/* TO DO on click */}
            </ContentComponent>
            {showCommentCount}
        </PostActions>
        <PostViewModal 
            show={isOpen}
            onClose={toggleModal}
            post = {props.post}
        />
        </div>
    )
}

export default PostStats;