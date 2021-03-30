import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Wrapper, ImageFrame, PostFrame, CaptionFrame, Flex, UploadButton } from './ImageUpload.styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const ImageUpload = () => {
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [caption, setCaption] = useState("")
    const onChangePicture = e => {
        if (e.target.files[0]) {
            setPicture(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    console.log(picture);
    
    const handleCaptionChange = event => {
        setCaption(event.target.value);
    }
    const hiddenFileInput = useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    }
    axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
    const handleCreateButton = () => {
        let form_data = new FormData();
        form_data.append('Caption',caption);
        form_data.append('ImgFile',picture)
        axios.post(`https://localhost:5001/addpost`, form_data, {
            headers: {
              'content-type': 'multipart/form-data'
            }
        });
    }
    return (
        <Wrapper>
            <Flex>
                <PostFrame>
                    <ImageFrame>
                        <img src={imgData} alt="" className="center" />
                    </ImageFrame>
                    <UploadButton>
                    <Button variant="contained" onClick={handleClick}>
                        Upload
                    <input
                            type="file"
                            onChange={onChangePicture}
                            ref={hiddenFileInput}
                            style={{ display: 'none' }}
                        />
                    </Button>
                    </UploadButton>
                </PostFrame>
                <CaptionFrame>
                    <Input
                        disableUnderline
                        multiline
                        value={caption}
                        placeholder="Description..."
                        InputProps={{
                            className: "caption-text"
                        }}
                        onChange={handleCaptionChange}
                    />
                </CaptionFrame>
            </Flex>
            <Flex className="bottombtn">
                <Button variant="contained" className="submitButton" onClick={() => handleCreateButton()}>Post</Button>
            </Flex>
        </Wrapper>
    );
}
export default ImageUpload