import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Axios from 'axios';

const DeleteFromFavsButton = ({ id }) => {

    const deleteFromFavs = id => {
        let token = localStorage.getItem('token');
        let apiUrl = `http://localhost:5000/favorites/delete/${token}/${id}`;

        Axios({
            method: 'delete',
            url: apiUrl,
        })
        .then(() => {
            window.location.reload(false);
        });
    }

    return (
        <Checkbox icon={<Favorite color="primary"/>} checkedIcon={<FavoriteBorder color="primary" />} onClick={() => {deleteFromFavs(id)}} />
    )
}

export default DeleteFromFavsButton;