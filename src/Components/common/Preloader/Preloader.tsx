import React from 'react';
import preloader from '../../../Assets/images/preloader.gif';

type PreloaderType = {
    isFetching: boolean
}

export const Preloader: React.FC<PreloaderType> = ({isFetching}) => {
    return (
        <div>
            {isFetching
                ? <img src={preloader} alt="preloader"/>
                : null}
        </div>
    );
}