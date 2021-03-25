import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PostCardModalView from '../PostCard/PostCardModalView/PostCardModalView'
import {ModalWrapper} from './PostViewModal.styles'

const PostViewModal = (props) => {

    const post = props.post;
    const show = props.show;

    return (
        !show ? null : (   
     
             <Modal
                aria-labelledby=""
                aria-describedby=""
                open={show}
                onClose={props.onClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <ModalWrapper>   
                    <Fade in={show}>
                        <PostCardModalView
                            post = {post}
                        />
                    </Fade>
                </ModalWrapper>   
            </Modal>
  
            )
    );
  }
  export default PostViewModal;