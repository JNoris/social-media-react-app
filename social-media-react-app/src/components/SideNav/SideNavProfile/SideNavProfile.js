//Authors: Edvin Lin
//Styled by: Edvin Lin
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayInfo from './SideNavProfileComponents/DisplayInfo';
import { SideNavProfileWrapper } from '../SideNav.styles';
import SideNavList from '../SideNavList/SideNavList';

const SideNavProfile = () => {
   
    const [userId, setUserId] = useState("");

    axios.defaults.headers={
        "Content-Type":"application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
    function getCurrentUserDetails()
    {
        axios.get("https://localhost:5001/getcurrentuserdetails")
        .then(res => setUserId(res.data))
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        getCurrentUserDetails()
    },[])

    const fullname = userId.firstName + " " + userId.lastName;

    return (
        <SideNavProfileWrapper>
            <DisplayInfo
                fullname={fullname}
                userName={userId.userName}
                src={userId.profilePhotoPath}
            />
            <SideNavList
                userName={userId.userName}
            />
        </SideNavProfileWrapper>
    );
}
export default SideNavProfile;