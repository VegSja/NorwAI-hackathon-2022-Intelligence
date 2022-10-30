import React, { } from 'react';

import "../App.css";

const Legend = () => {

  return (
    <div className={"legendContainer"}>
      <h3>Correlation values</h3>
      <div className="legendItem">
        <div style={{width:"10px", height:"10px",marginRight: "15px", backgroundColor: "rgba(200, 247, 128, 255)"}} />
        <p>0 - 0.2</p>
      </div>
      <div className="legendItem">
        <div style={{width:"10px", height:"10px",marginRight: "15px", backgroundColor: "rgba(216, 254, 255, 255)"}} />
        <p>0.20 - 0.35</p>
      </div>
      <div className="legendItem">
        <div style={{width:"10px", height:"10px",marginRight: "15px", backgroundColor: "rgba(131, 232, 251, 255)"}} />
        <p>0.35 - 0.55</p>
      </div>
      <div className="legendItem">
        <div style={{width:"10px", height:"10px",marginRight: "15px", backgroundColor: "rgba(70, 202, 254, 255)"}} />
        <p>0.55 - 0.7</p>
      </div>
      <div className="legendItem">
        <div style={{width:"10px", height:"10px",marginRight: "15px", backgroundColor: "rgba(28, 0, 153, 255)"}} />
        <p>0.7 - 1</p>
      </div>
    </div>
  );
};

export default Legend;
