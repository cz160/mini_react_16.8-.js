import React from './react';
import ReactDOM from './react-dom';
// 普通式
// const ele = (
//   <div className='active' title="123">
//     <span style={{color:'red'}}>Hello React</span>
//     <div>
//       <p>111</p>
//       <p>222</p>
//     </div>
//   </div>
// )

// 函数式组件
// function Home(){
//   return (
//     <div className='active' title="123">
//       <span style={{color:'red'}}>Hello React</span>
//       <div>
//         <p>111</p>
//         <p>222</p>
//       </div>
//     </div>
//   )
// }

// 类式组件
class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      num:0,
    }
  }
  componentWillMount(){
    console.log('组件将要渲染');
  }
  componentDidMount(){
    console.log('组件已经渲染');
  }
  componentWillUpdate(){
    console.log('组件将要更新');
  }
  componentDidUpdate(){
    console.log('组件已经更新');
  }
  render(){
    return (
      <div>
        <span>Hello React</span>
        <span>我当前等于:{this.state.num}</span>
        <button onClick={this.handleClick.bind(this)}>点我</button>
      </div>
    )
  }
  handleClick(){
    this.setState({
      num:this.state.num+1
    })
  }
}

ReactDOM.render(<Home title={"cz"}/>,document.querySelector('#root'))
