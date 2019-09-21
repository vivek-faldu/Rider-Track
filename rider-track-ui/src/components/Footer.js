/**
 * Author: Shaunak Shah
 * Task: Create common footer for all the pages.
 * Task no: 44
 * Date: 09/20/2019
 */

import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';


class Footer extends React.Component {
    render(){
        const bottom = {
            position: 'absolute',
            bottom: "0",
            backgroundColor: "#3f51b5",
            width: "100%",
        };

        return (
            <BottomNavigation color="inherit" style={bottom}>
                <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
                <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
                <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
            </BottomNavigation>
        );
    }
}

export default Footer;
