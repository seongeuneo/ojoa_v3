import '../../pages/NotFound/NotFound.css'
import React, { useEffect } from 'react';

const NotFound = () => {

    return (
        <div className='NotFound'>
            <div className='error'>
                <h1>404 Error</h1>
                <h4>Ooops, page not found</h4>
            </div>
        </div>
    );
};

export default NotFound;