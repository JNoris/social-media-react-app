import React from 'react'
import {HomeWrapper} from './Home.styles';
import PostGridView from '../PostGridView/PostGridView'

const Home = () => {
    return(
        <HomeWrapper>
            <PostGridView />
        </HomeWrapper>
    );
}
export default Home;