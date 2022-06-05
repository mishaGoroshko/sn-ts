import React from 'react';
import s from './Pagination.module.css';

type PaginationType = {
    totalCountUsers: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void

}

export const Pagination: React.FC<PaginationType> =
    ({totalCountUsers, pageSize, currentPage, onPageChanged}) => {

        let totalPages = Math.ceil(totalCountUsers / pageSize)

        let pages = [...Array(totalPages)].map((_, i) => i + 1)

        return (
            <div>
                {pages.map((p, i) => {
                    return <span key={i}
                                 className={p === currentPage ? s.active : s.item}
                                 onClick={() => onPageChanged(p)}>{p}</span>
                })}
            </div>
        );
    }