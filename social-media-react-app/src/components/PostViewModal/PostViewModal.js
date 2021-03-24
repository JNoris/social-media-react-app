import React, {forwardRef, useState} from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PostCard from '../PostCard/PostCard'

const PostViewModal = (props) => {

    console.log("modal",props);


    return (
  !props.show ? null : (                
    <Modal
        aria-labelledby=""
        aria-describedby=""
        open={true}
        onClose={props.onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
    }}
  >
    <Fade in={true}>
      {/* <PostCard 
        post = {props.post}
      /> */}
      <p>hello</p>
    </Fade>
  </Modal>
)
  );

  }
  export default PostViewModal;