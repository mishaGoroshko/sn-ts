import React, { FC, useEffect, useState } from 'react';

import s from './ErrorMessage.module.css';
import {useAppSelector} from '../../../Redux/redux-store';
import {EMPTY_STRING} from '../../../constants';
import {useDispatch} from 'react-redux';
import {setError} from '../../../Redux/app-reducer';


const ERROR_VISIBLE_TIMER = 5000;
const CLEAR_ERROR_TIMER = 600;

export const ErrorMessage: FC = () => {
  const dispatch = useDispatch();
  const error = useAppSelector(state => state.app.error);
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsErrorVisible(false);
    }, ERROR_VISIBLE_TIMER);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!isErrorVisible) {
      const timeoutId = setTimeout(() => {
        dispatch(setError(EMPTY_STRING));
      }, CLEAR_ERROR_TIMER);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    return () => {};
  }, [isErrorVisible]);

  const InfoBannerClassName = isErrorVisible
    ? `${s.InfoBanner} ${s.fadeIn}`
    : `${s.InfoBanner} ${s.fadeOut}`;

  return (
    <div className={InfoBannerClassName}>
      <span className={`${s.reversed} ${s.reversedRight}`}>
        <span>⚠</span>
      </span>
      <span className={`${s.reversed} ${s.reversedLeft}`}>{error}</span>
    </div>
  );
};
