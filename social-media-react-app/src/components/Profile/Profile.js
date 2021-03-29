import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Link, useParams } from "react-router-dom";
import {
  ProfileWrapper,
  PostDummy,
  InfoCol,
  Bio,
  BioML,
  GridWrapper,
  FlexEven,
  LinkWrapper
} from "./Profile.styles";
import Grid from "@material-ui/core/Grid";
import UserInfo from "../SideNav/SideNavProfile/SideNavProfileComponents/UserInfo";
import ProfileGridItem from "./ProfileGridItem";
import { dummyData, dummyImg } from "../temp/dummyData";
import SearchBar from "../TopNav/TopNavComponents/SearchBar";

const Profile = () => {

  const [urlParam, setParam] = useState("");
  let url = useParams();
  function checkParams() {
    if(url)
    {
      setParam(url.id);
      console.log(urlParam);
    }
  }
  useEffect(() => {
    checkParams();
  });

  const userName = "testdata";
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
        <LinkWrapper>
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
              <Grid item key={item.id} xs={12} md={6} lg={4}>
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
