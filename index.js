import React from './react';
import ReactDOM from './react-dom';

// const ele = (
//   <div className='active' title="123">
//     <span style={{color:'red'}}>Hello React</span>
//     <div>
//       <p>111</p>
//       <p>222</p>
//     </div>
//   </div>
// )
function Home(){
  return (
    <div className='active' title="123">
      <span style={{color:'red'}}>Hello React</span>
      <div>
        <p>111</p>
        <p>222</p>
      </div>
    </div>
  )
}
ReactDOM.render(<Home title={"cz"}/>,document.querySelector('#root'))
