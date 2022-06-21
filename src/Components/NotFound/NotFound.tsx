import React, {FC} from 'react';

import s from './NotFound.module.css';

export const NotFound: FC = () => {
    return (
        // <div className={s.container}>

        <iframe width="100%"
                height="100%"
                src="https://www.youtube.com/embed/YnP94m5pwls?autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
        />
        // </div>
    );
};
