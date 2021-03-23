import React, { useState } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import {ContentComponent, PostActions} from './PostCardContentStyles'

const PostStats = () => {
    const [like, setLike] = useState(false);
    const [heartColor, setHeartColor] = useState({color: "#fff"})

    function handleLike() {
        setLike(!like);

        // TO DO add API Call functionality

        if(like) {
            setHeartColor({color: "#e2336b"});
        } else {
            setHeartColor({color: "#fff"});
        }
    }

    return (
        <PostActions>
            <ContentComponent>
                <FavoriteBorderIcon
                    id="likeIcon"
                    onClick={handleLike}
                    style={heartColor}
                />
                    {/* onClick open list view of likes */}
                    <p id="likes">311</p> 
                    {/* TO DO on click */}
            </ContentComponent>
            <ContentComponent>
                <ChatBubbleOutlineIcon
                    // onClick open individual post view - shows input field to comment + view comments
                />
                    {/* onClick open list view of commments */}
                    <p id="comments">24</p>
                </ContentComponent>
        </PostActions>
    )
}

export default PostStats;