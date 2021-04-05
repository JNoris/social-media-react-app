import React from 'react'
import {HomeWrapper} from './Home.styles';
import PostGridView from '../PostGridView/PostGridView'
import TopNav from "../TopNav/TopNav";
import {Redirect} from 'react-router-dom';

const Home = () => {
    if(localStorage.getItem("token")===null)
    {
        return <Redirect to='/login'/>
    }
    return(
        <HomeWrapper>
            <div style={{position:'sticky', top:"0", zIndex:100, backgroundColor:"#3C3F51"}}><TopNav /></div>
            <PostGridView />
        </HomeWrapper>
    );
}
export default Home;
