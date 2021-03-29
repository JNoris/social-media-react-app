import React from 'react'
import {HomeWrapper} from './Home.styles';
import PostGridView from '../PostGridView/PostGridView'
import TopNav3 from "../TopNav/TopNav3";
import {Redirect} from 'react-router-dom';

const Home = () => {
    if(localStorage.getItem("token")===null)
    {
        return <Redirect to='/login'/>
    }
    return(
        <HomeWrapper>
            <TopNav3 />
            <PostGridView />
        </HomeWrapper>
    );
}
export default Home;
