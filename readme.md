#### 总概
~~~
1.本文主要讲述自己如何通过react的用法，简单的实现react的大部分用法。
2.主要从一下几个方面来递进：
    * 环境搭建
    * jsx和虚拟DOM实现
    * 组件化实现
    * 生命周期钩子函数实现
    * diff算法
    * 异步的setState
~~~
#### 环境搭建
* 本文采用Parcel作为打包工具 [地址](https://parceljs.org/getting_started.html)
* 操作过程
~~~
1.全局安装Parcel
    yarn global add parcel-bundler
    npm install -g parcel-bundler
2.yarn init -y
3.新建index.html index.js文件
  在index.html中引入index.js
4.局部安装在Parcel在当前项目中
    yarn add parcel-bundler --save-dev
5.输入Parcel index.html启动项目
(在package.json中配置srcipts快捷启动)
6.环境准备完成
~~~
#### jsx和虚拟DOM的实现
> 思考
~~~
1.jsx是什么？他和虚拟dom是什么关系？
2.当我们在使用react时，我们编写的jsx语法，最后怎么渲染到页面中去的？
3.为什么每次我们在编写react代码时，使用ReactDOM是必须引入React,它起了什么作用？
例如：
    import React from 'react';(这个引入干什么)
    import ReactDOM from 'react-dom';
    const ele = (
      <div>
        <h3 className="title">Hello React</h3>
      </div>
    )
    ReactDOM.render(ele,document.querySelector('#root'))
~~~
> 解答
* jsx实际是一种语法糖，类似less,ts等，然后通过一些工具来转化为浏览器可以识别的语法。
* 虚拟DOM和jsx是什么关系呢？
~~~
1.进行babel官网(https://www.babeljs.cn/repl)
2.将一段jsx代码使用babel编译
结果如下：
    * jsx
    const ele = (
      <div className='active' title="123">
        hello,<span>react</span>
      </div>
    )
    * babel编译后
    "use strict";
     var ele = React.createElement("div", {
        className: "active",
        title: "123"
     }, "hello,", React.createElement("span", null, "react"));
到此我们可以轻松的解答出第三个问题，为什么要引入React,因为要调用其createElement方法来得到虚拟DOM.
虚拟DOM:就是就是一种数据结构，是React.createElement函数的返回值。
{
    tag, // 外层标签
    attrs // 所有属性
    childrens:[...], // 所有孩子节点
}
~~~
* 实现渲染一个Hello React
~~~
1.在当前项目中，安装babel相关包
    yarn add babel-core babel-preset-env babel-plugin-transform-react-jsx --save-dev 
2.新建react react-dom文件夹 新建babel配置文件
    .babelrc：
        {
          "presets": ["env"],
          "plugins": [
            ["transform-react-jsx",{
              "prama": "React.createElement"
            }]
          ]
        }
3.在开始新建的index.js编写以下代码
import React from './react';
import ReactDOM from './react-dom';
const ele = (
  <div>Hello React</div>
)
ReactDOM.render(ele,document.querySelector('#root'));
由以上知识总结：
1.我们需要实现React中的createElement方法
2.我们需要实现ReactDOM中的render方法。
~~~
* 代码实现
~~~
index.js
import React from './react';
import ReactDOM from './react-dom';
const ele = (
  <div className='active' title="123">
    Hello React
  </div>
)
console.log(ele);
ReactDOM.render(ele,document.querySelector('#root'))

react->index.js
function createElement(tag,attrs,...childrens){
  return {
    tag, // 外层标签
    attrs, // 所有属性(对象)
    childrens // 所有孩子节点(数组)
  }
}

react-dom->index.js
function render(vnode,container){
  // 参数：虚拟dom,容器节点
  // 先不考虑函数组件和类写法
  const { tag,attrs,childrens } = vnode;
  // 如果Vode是一个文本节点
  if(typeof vnode === 'string'){
    const textNode = document.createTextNode(vnode); 
    return container.appendChild(textNode);
  }
  const dom = document.createElement(tag);
  // 递归渲染子节点
  childrens && childrens.forEach(child => {
    render(child,dom);
  });
  // 设置属性...
  return container.appendChild(dom);
}
~~~
#### 组件化实现
