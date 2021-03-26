import React, { useState, Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {
  ProfileWrapper,
  PostDummy,
  InfoCol,
  Bio,
  BioML,
  GridWrapper,
  FlexEven,
} from "./Profile.styles";
import Grid from "@material-ui/core/Grid";
import UserInfo from "../SideNav/SideNavProfile/SideNavProfileComponents/UserInfo";
//import {useQuery} from 'react-query';
import ProfileGridItem from "./ProfileGridItem";
import { dummyData, dummyImg } from "../temp/dummyData";
import SearchBar from "../TopNav/TopNavComponents/SearchBar";

// Next line is for JWT validation
import AuthService from "../services/auth.service";

/**
 * This page gets current User from Local Storage by calling AuthService.getCurrentUser() method
 * and show user information (with token).
 */

    //const getUser = async() => await((await fetch('https://localhost')).json());
    // const {data, isLoading, error} = useQuery(
    //     'userdata',
    //     getUser
    // );
    //if(Authenticated userId != props.location.state.userId)
    //return version with no edit bio and <p> for bio
   // const {userName} = props.location.state;
    // const userName = "testdata";
    // const [bio, setBio] = useState(dummyData.bio);
    // const [bioReadOnly, setReadOnly] = useState(true);
    // const [saveBtn, showSaveBtn] = useState(false);
    // const [isSelf, setIsSelf] = useState(false); //usually false
/**
// Begin validation code 
export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>
    );
  }
}   */

// End validation code

const Profile = (props) => {
  if ("userId" in props) {
    console.log(true);
  } else {
    console.log(false);
  }

  //const getUser = async() => await((await fetch('https://localhost')).json());
  // const {data, isLoading, error} = useQuery(
  //     'userdata',
  //     getUser
  // );
  //if(Authenticated userId != props.location.state.userId)
  //return version with no edit bio and <p> for bio
  const { userName } = props.location.state;
  const [bio, setBio] = useState(dummyData.bio);
  const [bioReadOnly, setReadOnly] = useState(true);
  const [saveBtn, showSaveBtn] = useState(false);
  const [isSelf, setIsSelf] = useState(false); //usually false

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };
  const handleBioEdit = () => {
    setReadOnly(false);
    showSaveBtn(true);
  };
  const handleBioSave = () => {
    //Api call to put/patch new bio
    showSaveBtn(false);
    setReadOnly(true);
  };
  const testSelfBtn = () => {
    setIsSelf((v) => !v);
  };

  return (
    <ProfileWrapper>
      <InfoCol>
        <SearchBar />
        <h1>{dummyData.userId}</h1>
        <Grid container justify="center" spacing={1}>
          <Grid item xs={4}>
            <UserInfo name="Posts" number={dummyData.posts} />
          </Grid>

          <Grid item xs={4}>
            <Link
              to={{
                pathname: "follow",
                state: {
                  followIndex: 0,
                  userName: userName,
                },
              }}
            >
              <UserInfo name="Followers" number={dummyData.followers} />
            </Link>
          </Grid>

          <Grid item xs={4}>
            <Link
              to={{
                pathname: "follow",
                state: {
                  followIndex: 1,
                  userName: userName,
                },
              }}
            >
              <UserInfo name="Following" number={dummyData.following} />
            </Link>
          </Grid>
        </Grid>
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
        {!isSelf ? (
          <FlexEven>
            <Button variant="contained">Follow</Button>
            <Button variant="contained">Message</Button>
            <Button variant="contained">Email</Button>
          </FlexEven>
        ) : null}
        <Button onClick={() => testSelfBtn()}>TEST BUTTON</Button>
      </InfoCol>
      <PostDummy>
        <GridWrapper>
          <Grid container spacing={1} justify="flex-start" alignItems="center">
            {dummyImg?.map((item) => (
              <Grid item key={item.id} xs={12} md={4} lg={3}>
                <ProfileGridItem
                  link={item.id}
                  src={item.photo}
                  alt={item.id}
                />
              </Grid>
            ))}
          </Grid>
        </GridWrapper>
      </PostDummy>
    </ProfileWrapper>
  );
};
export default Profile;
