import React, { useState, useRef } from 'react';
import { Wrapper, ImageFrame, PostFrame, CaptionFrame, Flex } from './ImageUpload.styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const ImageUpload = () => {
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(null);
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
    const [caption, setCaption] = useState("")
    const handleCaptionChange = event => {
        setCaption(event.target.value);
    }
    const hiddenFileInput = useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    }
    return (
        <Wrapper>
            <Flex>
                <PostFrame>
                    <ImageFrame>
                        <img src={imgData} alt="" className="center" />
                    </ImageFrame>
                    <Button variant="contained" onClick={handleClick}>
                        Upload
                    <input
                            type="file"
                            onChange={onChangePicture}
                            ref={hiddenFileInput}
                            style={{ display: 'none' }}
                        />
                    </Button>
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
                <Button variant="contained" className="submitButton">Post</Button>
            </Flex>
        </Wrapper>
    );
}
export default ImageUpload