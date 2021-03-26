import React from 'react'
import {HomeWrapper} from './Home.styles';
import PostGridView from '../PostGridView/PostGridView'
import TopNav3 from "../TopNav/TopNav3";

const Home = () => {
    return(
        <HomeWrapper>
            <TopNav3 />
            <PostGridView />
        </HomeWrapper>
    );
}
export default Home;
