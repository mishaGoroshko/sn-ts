import React from 'react';
import s from './FormControls.module.css'

export const Textarea: React.FC<any> = ({
                                            input,
                                            type,
                                            meta: {touched, error, warning}, ...props
                                        }) => {
    const err = touched && error;
    return (
        <div className={err ? s.error : s.norm}>
            {type === 'textarea'
                ? <textarea {...input} {...props}/>
                : <input {...input} {...props}/>}
            <div>
                {err && <span>{error}</span>}
            </div>
        </div>
    );
}
