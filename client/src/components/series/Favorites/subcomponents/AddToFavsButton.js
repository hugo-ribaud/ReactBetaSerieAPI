import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import Axios from 'axios';

const AddToFavsButton = ({ id }) => {

    const addToFavs = id => {
        let apiUrl = `http://localhost:5000/favorites/add`;
        let token = localStorage.getItem('token');

        Axios({
            method: 'post',
            url: apiUrl,
            data: {
                id: id,
                token: token
            }
        })
        .then(() => {
            window.location.reload(false);
        });
    }

    return (
        <Checkbox icon={<FavoriteBorder color="primary"/>} checkedIcon={<Favorite color="primary" />} onClick={() => {addToFavs(id)}} />
    )
}

export default AddToFavsButton;