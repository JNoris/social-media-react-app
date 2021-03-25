import React from 'react'
import { PostWrapper } from './AddPost.styles';
import ImageUpload from './AddPostComponents/ImageUpload';

const AddPost = (props) => {

    return (
        <PostWrapper>
            <ImageUpload />
        </PostWrapper>
    );
}
export default AddPost