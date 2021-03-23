import React, { useState } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import {ContentComponent, PostActions} from './PostCardContentStyles'

const PostStats = () => {
    const [like, setLike] = useState(false)

    function handleLike() {
        setLike(!like);
        if(like) {

        }
    }

    return (
        <PostActions>
            <ContentComponent>
                <FavoriteBorderIcon
                    id="likeIcon"
                    //onClick="handleLike"
                    //className={heartIcon}
                />
                    <p id="likes">311</p>
            </ContentComponent>
            <ContentComponent>
                <ChatBubbleOutlineIcon />
                    <p id="comments">24</p>
                </ContentComponent>
        </PostActions>
    )
}

export default PostStats;