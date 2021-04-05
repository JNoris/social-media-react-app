//Authors: Edvin Lin
//Styled by: Edvin Lin
import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import { ProfileWrapper, PostDummy, InfoCol, Bio, BioML, GridWrapper, FlexEven, LinkWrapper, ImgFrame, UploadBtns } from "./Profile.styles";
import Grid from "@material-ui/core/Grid";
import UserInfo from "../SideNav/SideNavProfile/SideNavProfileComponents/UserInfo";
import ProfileGridItem from "./ProfileGridItem";

const Profile = () => {
  const userName = localStorage.getItem("username");
  const [bio, setBio] = useState(" ");
  const [bioReadOnly, setReadOnly] = useState(true);
  const [saveBtn, showSaveBtn] = useState(false);
  const [isSelf, setIsSelf] = useState(false); //usually false
  const [userDetails, setUserDetails] = useState("");
  const [error, setError] = useState(false);
  const [noUser, setNoUser] = useState(false);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [posts, setPosts] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [picture, setPicture] = useState(null);
  const [isUpload, setIsUpload] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(0);

  function checkIfPosts(data) {
    if (Array.isArray(data)) {
      if (data.length > 0) {
        setPosts(data);
        setPostsLoaded(true);
      }
    }
  }
  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
  //User Detail API Calls

  function getUserDetails(username) {
    if (username !== undefined) {
      axios.get("https://localhost:5001/getuserdetails/" + username)
        .then(res => setUserDetails(res.data))
        .catch(err => setNoUser(true) && console.log(err));
    }
  }
  function getUserPosts(username) {
    if (username !== undefined) {
      axios.get("https://localhost:5001/getuserposts/" + username)
        .then(res => checkIfPosts(res.data))
        .catch(err => console.log(error));
    }
  }
  //For refresh follow number after following/unfollow
  function getUserData(username) {
    if (username !== undefined) {
      axios.get("https://localhost:5001/getuserdetails/" + username)
        .then(res => setUserDetails(res.data))
        .catch(err => setNoUser(true) && console.log(err));
    }
  }
  //URL Parameters
  let url = useParams();
  function checkParams(urlid) {
    if (urlid !== undefined && urlid !== userName) {
      getUserDetails(url.id);
      getUserPosts(urlid);
    }
    else {
      getUserDetails(userName);
      getUserPosts(userName);
      setIsSelf(true);
    }
  }

  //Bio
  const handleBioChange = (event) => {
    setBio(event.target.value);
  };
  const handleBioEdit = () => {
    setReadOnly(false);
    showSaveBtn(true);
  };
  const handleBioSave = () => {
    axios.put("https://localhost:5001/edituser",
      {
        userName: userDetails.userName,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        bio: bio
      })
      .catch(err => console.log(err));
    showSaveBtn(false);
    setReadOnly(true);
  };
  //Follows
  function addFollow(user) {
    if (user !== "") {
      axios.post("https://localhost:5001/AddNewFollow/" + user)
        .then(res => setIsFollowing(true))
        .then(getUserData(user))
        .catch(err => setError(true) && console.log(err));
    }
  }

  function removeFollow(user) {
    if (user !== "") {
      axios.post("https://localhost:5001/RemoveFollow/" + user)
        .then(res => setIsFollowing(false))
        .then(getUserData(user))
        .catch(err => setError(true) && console.log(err));
    }
  }

  //Image Upload
  const hiddenFileInput = useRef(null);
  const handleClick = event => {
    hiddenFileInput.current.click();
  }
  function uploadNewProfile() {
    if (picture !== null) {
      let form_data = new FormData();
      form_data.append('ImgFile', picture)
      axios.put(`https://localhost:5001/edituserprofilephoto`, form_data,
        {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(setIsUpload(false))
        .then(res => setUploadStatus(res.status))
        .catch(err => setError(true) && console.log(err));
    }
  }
  function cancelProfileUpload() {
    try {
      setImgData(userDetails.profilePhotoPath);
      setIsUpload(false);
    }
    catch (e) {
      console.log(e);
    }

  }
  const onChangePicture = e => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
        setIsUpload(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  function refreshOnOK(status) {
    if (status === 200) {
      window.location.reload();
    }
  }
  //Use Effect

  useEffect(() => {
    checkParams(url.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    if (userDetails.bio !== null) {
      setBio(userDetails.bio);
    }
  }, [userDetails.bio])

  useEffect(() => {
    setIsFollowing(userDetails.isFollowed)
  }, [userDetails])

  useEffect(() => {
    getUserData(userDetails.userName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFollowing])

  //Set profile picture
  useEffect(() => {
    setImgData(userDetails.profilePhotoPath)
  }, [userDetails.profilePhotoPath])

  useEffect(() => {
    refreshOnOK(uploadStatus);
  }, [uploadStatus])
  //Error Pages
  if (error) {
    return (
      <div style={{display:"grid",height:"80vh", placeItems:"center"}}><h2>An Error has occured</h2></div>
    );
  }
  if (noUser) {
    return (
      <div style={{display:"grid",height:"80vh", placeItems:"center"}}><h2 style={{color:"whitesmoke"}}>No user by {url.id} exists</h2></div>
    );
  }
  //Main Content
  return (
    <ProfileWrapper>
      <InfoCol>
        {/* <SearchBar /> */}
        <h1>@{userDetails.userName}</h1>
        <ImgFrame>
          <img src={imgData} alt={userDetails.userName} />
        </ImgFrame>
        <UploadBtns>
          <div className="btns">
            {isSelf && !isUpload ? (
              <Button className="fwbtn" onClick={handleClick} variant="contained">Upload Profile Photo
                <input
                  type="file"
                  onChange={onChangePicture}
                  ref={hiddenFileInput}
                  style={{ display: 'none' }}
                />
              </Button>
            ) : null}

            {isSelf && isUpload ? (
              <>
                <Button className="hwbtn" onClick={uploadNewProfile}
                  variant="contained">
                  Save
          </Button>
                <Button className="hwbtn" onClick={cancelProfileUpload}
                  variant="contained">
                  Cancel
          </Button>
              </>
            ) : null}
          </div>
        </UploadBtns>
        <LinkWrapper>
          <Grid container justify="center" spacing={1}>
            <Grid item xs={4}>
              <UserInfo name="Posts" number={userDetails.numberOfPosts} />
            </Grid>

            <Grid item xs={4}>
              {isSelf ? (<Link
                to={{
                  pathname: "/follow",
                  state: {
                    followIndex: 0,
                    userName: userDetails.userName,
                  },
                }}
              >
                <UserInfo name="Followers" number={userDetails.numberOfFollowers} />
              </Link>) : (
                <Link
                  to={{
                    pathname: "/follow/" + userDetails.userName,
                    state: {
                      followIndex: 0,
                      userName: userDetails.userName,
                    },
                  }}
                >
                  <UserInfo name="Followers" number={userDetails.numberOfFollowers} />
                </Link>
              )}

            </Grid>

            <Grid item xs={4}>
              {isSelf ? (<Link
                to={{
                  pathname: "follow",
                  state: {
                    followIndex: 1,
                    userName: userDetails.userName,
                  },
                }}
              >
                <UserInfo name="Following" number={userDetails.numberOfFollowing} />
              </Link>)
                :
                (<Link
                  to={{
                    pathname: "/follow/" + userDetails.userName,
                    state: {
                      followIndex: 1,
                      userName: userDetails.userName,
                    },
                  }}
                >
                  <UserInfo name="Following" number={userDetails.numberOfFollowing} />
                </Link>
                )}

            </Grid>
          </Grid>
        </LinkWrapper>
        <Bio>
          <BioML
            multiline
            value={bio}
            inputProps={{
              readOnly: bioReadOnly,
              className: "bio-text",
            }}
            onChange={handleBioChange}
          />
        </Bio>
        {bioReadOnly && isSelf ? (
          <Button
            className="edit"
            variant="contained"
            onClick={() => handleBioEdit()}
          >
            Edit Bio
          </Button>
        ) : null}
        {saveBtn ? (
          <Button
            className="edit"
            variant="contained"
            onClick={() => handleBioSave()}
          >
            SAVE
          </Button>
        ) : null}
        {!isSelf && !isFollowing ? (
          <FlexEven>
            <Button variant="contained" onClick={() => addFollow(userDetails.userName)}>Follow</Button>
            <Button variant="contained">Message</Button>
            <Button variant="contained">Email</Button>
          </FlexEven>
        ) : null}
        {!isSelf && isFollowing ? (
          <FlexEven>
            <Button variant="contained" onClick={() => removeFollow(userDetails.userName)}>Unfollow</Button>
            <Button variant="contained">Message</Button>
            <Button variant="contained">Email</Button>
          </FlexEven>
        ) : null}
      </InfoCol>
      <PostDummy>
        <GridWrapper>
          {postsLoaded ? (<Grid container spacing={1} justify="flex-start" alignItems="center">
            {posts?.map((item) => (
              <Grid item key={item.id} xs={12} md={6}>
                <ProfileGridItem
                  id={item.id}
                  src={item.photoPath}
                  alt={item.id}
                />
              </Grid>
            ))}
          </Grid>) : null}
        </GridWrapper>
      </PostDummy>
    </ProfileWrapper>
  );
};
export default Profile;
