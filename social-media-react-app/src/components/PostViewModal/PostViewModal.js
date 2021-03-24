import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PostCardModalView from './PostCardModalView/PostCardModalView'
import {ModalWrapper} from './PostViewModal.styles'

const PostViewModal = (props) => {

    const post = props.post;
    const show = props.show;

    return (
        !show ? null : (   
     
             <Modal
                aria-labelledby=""
                aria-describedby=""
                style={{overflow: 'scroll'}}
                //disableScrollLock
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
                            modalView={true}
                        />
                    </Fade>
                </ModalWrapper>   
            </Modal>
  
            )
    );
  }
  export default PostViewModal;