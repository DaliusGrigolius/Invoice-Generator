import React from 'react';
import { progressSteps, style } from './functions/HomeFunctions';

const Home = () => {
    return (
        <>
            <div className="text-left">
                <div>
                    <h1 className="badge bg-dark fs-3 mb-4 shadow">Warm Welcome!</h1>
                </div>
                <div className="mb-5">
                    <h2 className="badge bg-warning fs-1 mb-3 shadow">This is Invoice generator</h2>
                </div>
                <h3 className="text-center mb-5 lead fs-2 shadow-lg rounded-pill p-3 border border-dark bg-light">
                    {'>>> '}8 simple steps to use it:{' <<<'}
                </h3>
            </div>
            {progressSteps.map((step, index) => (
                <div className="mb-4" key={index}>
                    <p className={style}>{step.description}</p>
                    <div className="progress" style={{ height: `${index + 1}px` }}>
                        <div
                            className={`progress-bar bg-${index < 3 ? "danger" : index < 6 ? "warning" : "success"} progress-bar-striped progress-bar-animated`}
                            role="progressbar"
                            style={{ width: step.width }}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        ></div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Home;