import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { ProfileWrapper, PostDummy, InfoCol, Bio, BioML, GridWrapper } from './Profile.styles';
import Grid from '@material-ui/core/Grid';
import UserInfo from '../SideNav/SideNavProfile/SideNavProfileComponents/UserInfo';
//import {useQuery} from 'react-query';
import img1 from '../temp/postImgs/img1.jpg';
import img2 from '../temp/postImgs/img2.jpg';
import img3 from '../temp/postImgs/img3.jpg';
import img4 from '../temp/postImgs/img4.jpg';
import img5 from '../temp/postImgs/img5.jpg';
import img6 from '../temp/postImgs/img6.jpg';
import ProfileGridItem from './ProfileGridItem';
const Profile = (props) => {
    if (props.location.state.userId) {
        console.log(props.location.state.userId);
    }
    //const getUser = async() => await((await fetch('https://localhost')).json());
    // const {data, isLoading, error} = useQuery(
    //     'userdata',
    //     getUser
    // );
    //if(Authenticated userId != props.location.state.userId)
    //return version with no edit bio and <p> for bio

    var dummyData = {
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
        userId: props.location.state.userId,
        posts: 46,
        followers: 2800,
        following: 5
    }
    var dummyImg = [
        {
            id: 1,
            photo: img1
        },
        {
            id: 2,
            photo: img2
        },
        {
            id: 3,
            photo: img3
        },
        {
            id: 4,
            photo: img4
        },
        {
            id: 5,
            photo: img5
        },
        {
            id: 6,
            photo: img6
        }
    ];

    const [bio, setBio] = useState(dummyData.bio)
    const [bioReadOnly, setReadOnly] = useState(true);
    const [saveBtn, showSaveBtn] = useState(false);

    const handleBioChange = event => {
        setBio(event.target.value);
    }
    const handleBioEdit = () => {
        setReadOnly(false);
        showSaveBtn(true);
    }
    const handleBioSave = () => {
        //Api call to put/patch new bio
        showSaveBtn(false);
        setReadOnly(true);
    }



    return (
        <ProfileWrapper>
            <InfoCol>
                <h1>{dummyData.userId}</h1>
                <Grid container justify="center" spacing={1}>
                    <Grid item xs={4}>
                        <UserInfo
                            name="Posts"
                            number={dummyData.posts}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <UserInfo
                            name="Followers"
                            number={dummyData.followers}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <UserInfo
                            name="Following"
                            number={dummyData.following}
                        />
                    </Grid>
                </Grid>
                <Bio>
                    <h3>Bio</h3>
                    <BioML
                        multiline
                        value={bio}
                        InputProps={{
                            readOnly: bioReadOnly,
                        }}
                        onChange={handleBioChange}
                    />
                </Bio>
                {bioReadOnly ? <Button variant="contained" onClick={() => handleBioEdit()}>Edit Bio</Button> : null}
                {saveBtn ? <Button variant="contained" onClick={() => handleBioSave()}>SAVE</Button> : null}
            </InfoCol>
            <PostDummy>
                <GridWrapper>
                    <Grid 
                        container 
                        spacing={1}
                        justify="space-evenly"
                        alignItems="center"
                    >
                        {dummyImg?.map(item => (
                            <Grid item key={item.id} xs={4}>
                                <ProfileGridItem src={item.photo} alt={item.id} />
                            </Grid>
                        ))}
                    </Grid>
                </GridWrapper>
            </PostDummy>
        </ProfileWrapper>
    );
}
export default Profile