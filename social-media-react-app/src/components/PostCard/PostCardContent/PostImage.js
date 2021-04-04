import React, { useState } from 'react';
import CardMedia  from '@material-ui/core/CardMedia';
import {Media} from './PostCardContent.styles';
import PostViewModal from "../../PostViewModal/PostViewModal"

const PostImage = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const isModelView = props.modalView? props.modalView : false;

    function toggleModal() {
        if(!isModelView) {
            setIsOpen(!isOpen);
        }
    }
    
    return (
        <div>
        <Media>
            <CardMedia>
                <img src={props.photoPath} alt={props.alt? props.alt : ""} onClick={toggleModal} />
            </CardMedia>
        </Media>
        <PostViewModal 
            show={isOpen}
            onClose={toggleModal}
            post = {props.post}
            viewComments = {true}
        />
        </div>
    );
}

export default PostImage;