import React from './react';
import ReactDOM from './react-dom';

const ele = (
  <div className='active' title="123">
    <span style={{color:'red'}}>Hello React</span>
    <div>
      <p>111</p>
      <p>222</p>
    </div>
  </div>
)
console.log(ele);
ReactDOM.render(ele,document.querySelector('#root'))
