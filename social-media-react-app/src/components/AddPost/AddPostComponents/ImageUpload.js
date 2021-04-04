//Authors: Edvin Lin, Yasir Karapinar
//Styled by: Edvin Lin, Athena Kozak
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
//Components
import { Wrapper, ImageFrame, PostFrame, CaptionFrame, Flex, UploadButton, NotifWrapper } from './ImageUpload.styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
//Notification from Noris Login/Registration
import Notification from '../../Login/Notification';

const ImageUpload = () => {
    //Base image data
    const [picture, setPicture] = useState(null);
    //decoded image data
    const [imgData, setImgData] = useState(null);
    const [caption, setCaption] = useState("")
    //Status of response for upload api call
    const [uploadStatus, setUploadStatus] = useState(0);
    //Redirect on status 200
    const [redirect, setRedirect] = useState(false);
    //Notification popup
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
      });
    //Sets image data, and decoded image data
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
        if (picture !== null) {
            let form_data = new FormData();
            form_data.append('Caption', caption);
            form_data.append('ImgFile', picture)
            axios.post(`https://localhost:5001/addpost`, form_data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then(res => setUploadStatus(res.status))
            .catch(e => console.log(e));
        }
        else{
            setNotify({
                isOpen:true,
                message:"Please upload a photo",
                type: "error"
            })
        }
    }
    function returnOnOK(status) {
        if (status === 200) {
            setRedirect(true);
        }
    }
    useEffect(() => {
        returnOnOK(uploadStatus)
    }, [uploadStatus])
    if (redirect) {
        return <Redirect to="/profile" />
    }
    return (
        <Wrapper>
            <Flex>
                <NotifWrapper>
                    <Notification notify={notify} setNotify={setNotify} />
                </NotifWrapper>
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
                        inputProps={{
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