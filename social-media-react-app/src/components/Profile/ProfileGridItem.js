//Authors: Edvin Lin
//Styled by: Edvin Lin
import React, { useState } from 'react'
import axios from 'axios';
import { GridBtn, ProfileGridWrapper } from './Profile.styles'
import PostViewModal from '../PostViewModal/PostViewModal';

const ProfileGridItem = (props) => {
    axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    const [visible, setVisible] = useState(false);
    const toggleVisible = () => {
        setVisible(v => !v);
    }
    const [isOpen, setIsOpen] = useState(false)
    const isModelView = props.modalView? props.modalView : false;

    function toggleModal() {
        if(!isModelView) {
            setIsOpen(!isOpen);
        }
    }
    const deletePost = (id) => {
        if(id !== null && id !== undefined)
        {
            axios.post("https:localhost:5001/deletepost/"+id)
            .then(res => {
                if(res.status === 200)
                {
                    window.location.reload();
                }
            })
            .catch(e => console.log(e));
        }        
    }
    
    const handleDelete = (id) => {
        var shouldDelete = window.confirm('Are you sure you want to delete this post?');    
        if(shouldDelete === true){
            deletePost(id);
        }
    }

    return (
        <>
        <ProfileGridWrapper onMouseEnter={toggleVisible} onMouseLeave={toggleVisible}>
            {visible ?
            <GridBtn onClick={() => handleDelete(props.id)}
            >x</GridBtn>
                : null}
            <img src={props.src} alt={props.alt}  onClick={toggleModal} />
        </ProfileGridWrapper>
        <PostViewModal 
            show={isOpen}
            onClose={toggleModal}
            post = {props.post}
            viewComments = {true}
        />
        </>
    );
}
export default ProfileGridItem