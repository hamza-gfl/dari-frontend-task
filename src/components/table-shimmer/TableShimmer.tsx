import React from 'react'

export const TableShimmer = () => {
    return (
        <div
            style={{
                border: '2px solid #fff',
                boxShadow: '0 0 10px 0 #a9a9a9',
                padding: '30px 40px',
                width: '90.5%',
                margin: '50px auto',
                borderRadius: '8px',
            }}
        >
            <div
                style={{
                    width: '0',
                    animation: 'fullView 0.5s forwards linear',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '587px',
                }}
            >
                {[...new Array(10)].map((_, index) => (
                    <div
                        style={{
                            height: '10px',
                            marginTop: '20px',
                            animation: 'shimmer 2s infinite',
                            background:
                                'linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%)',
                            backgroundSize: '1000px 100%',
                            borderRadius: '8px',
                        }}
                        key={index}
                    ></div>
                ))}
            </div>
        </div>
    )
}
