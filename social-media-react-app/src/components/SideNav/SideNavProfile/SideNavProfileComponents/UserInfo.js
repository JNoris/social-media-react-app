import React from 'react'
import { Center } from './SideNavProfileComponents.styles';

function nFormatter(num, digits) {
    var si = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "k" },
      { value: 1E6, symbol: "M" },
      { value: 1E9, symbol: "B" },

    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  }

const UserInfo = (props) => {
    var formattedNum = nFormatter(props.number,1)
    return(
        <Center>
            <p>{formattedNum}</p>
            <p>{props.name}</p>
        </Center>
    );
}
export default UserInfo;