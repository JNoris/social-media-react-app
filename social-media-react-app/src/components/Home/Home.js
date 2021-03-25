import React from 'react'
import {HomeWrapper} from './Home.styles';
import PostGridView from '../PostGridView/PostGridView'
import TopNav2 from "../TopNav/TopNav2";

const Home = () => {
    return(
        <HomeWrapper>
            <TopNav2 />
            <PostGridView />
        </HomeWrapper>
    );
}
export default Home;
