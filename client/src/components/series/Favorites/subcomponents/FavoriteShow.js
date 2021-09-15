import React, { useState, useEffect } from 'react';

import DeleteFromFavsButton from './DeleteFromFavsButton';
import AddToFavsButton from './AddToFavsButton';

const FavoriteShow = ({ value }) => {

    const [isFavorited, setIsFavorited] = useState(null);

    useEffect(() => {
        if (value.user.favorited === Boolean(false)) {
            setIsFavorited(false);
        } else {
            setIsFavorited(true);
        }

    },[value.user.favorited]);

    return isFavorited ? (
        <DeleteFromFavsButton id={value.id} />
    ) : (
        <AddToFavsButton id={value.id} />
    );
}

export default FavoriteShow;
