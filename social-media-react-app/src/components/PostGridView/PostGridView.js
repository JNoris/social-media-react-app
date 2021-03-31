import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../PostCard/PostCard'
import Grid from '@material-ui/core/Grid';
import {GridWrapper} from "./PostGridView.styles";

const PostGridView = () => {
    const spacing = 2;
    const [posts, setPosts] = useState([]);
    const [refreshComponent, setRefreshComponent] = useState(false)

    axios.defaults.headers={
        "Content-Type":"application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }

    useEffect(()=>{
        axios.get("https://localhost:5001/gethomepageposts")
        .then(res => setPosts(res.data))
        .catch(err=>console.log(err));
        setRefreshComponent(false)
    },[refreshComponent]);

    function handleRefresh() {
        setRefreshComponent(true);
    }

    console.log(posts)

    return (
        <GridWrapper>
            <Grid container justify="center" spacing={spacing} className="postGrid">
                {posts?.map((post) => (
                    <Grid key={post.id} item>
                        <PostCard post={post} handleUpdate={handleRefresh} />
                    </Grid>
           ))}
        </Grid>
        </GridWrapper>
    );
}
export default PostGridView;