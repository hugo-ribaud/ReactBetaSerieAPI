import React from 'react';

import Navbar from './Navbar';
import SmallNavbar from './SmallNavbar';

import Hidden from '@material-ui/core/Hidden';

const NavbarFitsScreen = () => {
    return (
        <div>
            <Hidden only={['sm', 'xs']}>
                <Navbar />
            </Hidden>
            <Hidden only={['xl', 'lg', 'md']}>
                <SmallNavbar />
            </Hidden>
        </div>
    );
}

export default NavbarFitsScreen;