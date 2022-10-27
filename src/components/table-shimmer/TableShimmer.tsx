import React from 'react'
import './tableShimmer.css'

export const TableShimmer = () => {
    return (
        <div className="card br">
            <div className="wrapper">
                {[...new Array(10)].map((_, index) => (
                    <div className="shimmer-row br animate" key={index}></div>
                ))}
            </div>
        </div>
    )
}
