import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../PostCard/PostCard'
import Grid from '@material-ui/core/Grid';
import {GridWrapper} from "./PostGridView.styles";

//temp
import img1 from "../temp/postImgs/img5.jpg"
import img2 from "../temp/postImgs/img2.jpg"
import img3 from "../temp/postImgs/img6.jpg"
import img4 from "../temp/postImgs/img1.jpg"
import img5 from "../temp/postImgs/img3.jpg"
import img6 from "../temp/postImgs/img4.jpg"

const PostGridView = () => {
    // eslint-disable-next-line
    const [spacing, setSpacing] = useState(2);

    const [posts, setPosts] = useState([]);

    axios.defaults.headers={
        "Content-Type":"application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }

    useEffect(()=>{
        axios.get("https://localhost:5001/getchomepageposts")
        .then(res => setPosts(res.data))
        .catch(err=>console.log(err));
    },[])

    // TODO API call to get post content using props (home or profile content)

    // temp dummy data
    // var tempPostContent = [
    //     {
    //         username: "random.user",
    //         img: img1,
    //         likes: "311",
    //         comments: "114"
    //     },
    //     {
    //         username: "user_twooooo",
    //         img: img3,
    //         likes: "105",
    //         comments: "25"
    //     },
    //     {
    //         username: "janedoedoe",
    //         img: img2,
    //         likes: "2.1k",
    //         comments: "362"
    //     },
    //     {
    //         username: "john_smith",
    //         img: img5,
    //         likes: "30",
    //         comments: "2"
    //     },
    //     {
    //         username: "hugh.boss",
    //         img: img4,
    //         likes: "574",
    //         comments: "183"
    //     },
    //     {
    //         username: "niceee_postz",
    //         img: img6,
    //         likes: "410",
    //         comments: "16"
    //     }
    // ]

    return (
        <GridWrapper>
            <Grid container justify="center" spacing={spacing} className="postGrid">
                {posts?.map((post) => (
                    <Grid key={post.Id} item>
                        <PostCard post={post} />
                    </Grid>
                   
           ))}
        </Grid>
        </GridWrapper>
    );
}
export default PostGridView;