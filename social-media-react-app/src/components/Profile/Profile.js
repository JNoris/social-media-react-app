import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import { ProfileWrapper, PostDummy, InfoCol, Bio, BioML, GridWrapper, FlexEven, LinkWrapper, ImgFrame } from "./Profile.styles";
import Grid from "@material-ui/core/Grid";
import UserInfo from "../SideNav/SideNavProfile/SideNavProfileComponents/UserInfo";
import ProfileGridItem from "./ProfileGridItem";
import SearchBar from "../TopNav/TopNavComponents/SearchBar";

const Profile = () => {

  const [bio, setBio] = useState("");
  const [bioReadOnly, setReadOnly] = useState(true);
  const [saveBtn, showSaveBtn] = useState(false);
  const [isSelf, setIsSelf] = useState(false); //usually false
  const [userDetails, setUserDetails] = useState("");
  const [error, setError] = useState(false);
  const [noUser, setNoUser] = useState(false);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [posts, setPosts] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);

  function checkIfPosts(data) {
    if (Array.isArray(data)) {
      if (data.length > 0) {
        setPosts(data);
        setPostsLoaded(true);
      }
      else {
        console.log("No Posts")
      }
    }
  }
  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
  function getCurrentUserDetails() {
    axios.get("https://localhost:5001/getcurrentuserdetails")
      .then(res => setUserDetails(res.data))
      .catch(err => setError(true) && console.log(err));
    axios.get("https://localhost:5001/getcurrentuserposts")
      .then(res => checkIfPosts(res.data))
      .catch(err => console.log(error));
  }

  function getUserDetails(username) {
    axios.get("https://localhost:5001/getuserdetails/" + username)
      .then(res => setUserDetails(res.data))
      .catch(err => setNoUser(true) && console.log(err));
    axios.get("https://localhost:5001/getuserposts/" + username)
      .then(res => checkIfPosts(res.data))
      .catch(err => console.log(error));
  }
  let url = useParams();
  function checkParams(urlid) {
    if (urlid !== undefined) {
      console.log(url.id);
      console.log("not current");
      getUserDetails(url.id);
    }
    else {
      getCurrentUserDetails();
      console.log("Current user");
      setIsSelf(true);
    }
  }
  function getUserData(username) {
    axios.get("https://localhost:5001/getuserdetails/" + username)
      .then(res => setUserDetails(res.data))
      .catch(err => setNoUser(true) && console.log(err));
  }

  useEffect(() => {
    checkParams(url.id);
    setBio(userDetails.bio)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url.id]);
  useEffect(() => {
    setIsFollowing(userDetails.isFollowed)
  },[userDetails])
  
  if (error) {
    return (
      <div>An Error has occured</div>
    );
  }
  if (noUser) {
    return (
      <div>No user by {url.id} exists</div>
    );
  }
  const handleBioChange = (event) => {
    setBio(event.target.value);
  };
  const handleBioEdit = () => {
    setReadOnly(false);
    showSaveBtn(true);
  };
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
  const handleBioSave = () => {
    //Api call to put/patch new bio
    axios.put("https://localhost:5001/edituser",
      {
        userName: userDetails.userName,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        bio: bio
      })
      .then(console.log("success"))
      .catch(err => console.log(err));
    showSaveBtn(false);
    setReadOnly(true);
  };

  return (
    <ProfileWrapper>
      <InfoCol>
        {/* <SearchBar /> */}
        <h1>@{userDetails.userName}</h1>
        <ImgFrame>
          <img src={userDetails.profilePhotoPath} alt={userDetails.userName} />
        </ImgFrame>
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
            InputProps={{
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
            <Button variant="contained"onClick={() => removeFollow(userDetails.userName)}>Unfollow</Button>
            <Button variant="contained">Message</Button>
            <Button variant="contained">Email</Button>
          </FlexEven>
        ) : null}
      </InfoCol>
      <PostDummy>
        <GridWrapper>
          {postsLoaded ? (<Grid container spacing={1} justify="flex-start" alignItems="center">
            {posts?.map((item) => (
              <Grid item key={item.id} xs={12} md={6} lg={4}>
                <ProfileGridItem
                  link={item.id}
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
