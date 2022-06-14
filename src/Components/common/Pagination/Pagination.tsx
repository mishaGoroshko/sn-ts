import React, {useState} from 'react';
import s from './Pagination.module.css';
import arrowLeft from '../../../Assets/images/arrowLeftBlue.png'
import arrowRight from '../../../Assets/images/arrowRightBlue.png'

type PaginationType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize: number

}

export const Pagination: React.FC<PaginationType> =
    ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize}) => {

        let pagesCount = Math.ceil(totalItemsCount / pageSize)

        // let pages = [...Array(totalPages)].map((_, i) => i + 1)
        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        let portionCount = Math.ceil(pagesCount / portionSize)
        let [portionNumber, setPortionNumber] = useState(1)
        let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
        let rightPortionPageNumber = portionNumber * portionSize

        const bachPortionHandle = () => setPortionNumber(portionNumber - 1);
        const nextPortionHandle = () => setPortionNumber(portionNumber + 1);
        return (
            <div className={s.wrapper}>
                {portionNumber > 1 ?
                    <img src={arrowLeft}
                         className={s.arrow}
                         onClick={bachPortionHandle}
                         alt="arrowLeft"/> : <div className={s.arrow}></div>}
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map((p, i) => {
                        const onClickPageHandle = () => onPageChanged(p);
                        return <span
                            key={i}
                            className={p === currentPage ? s.active : s.item}
                            onClick={p === currentPage ? undefined : onClickPageHandle}>
                            {p}
                        </span>
                    })}
                {portionCount > portionNumber ?
                    <img src={arrowRight}
                         className={s.arrow}
                         onClick={nextPortionHandle}
                         alt="arrowRight"/> : <div className={s.arrow}></div>}
            </div>
        );
    }