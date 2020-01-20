import Component from "../react/Component";

// 创建组件
function createComponent(comp,props){
  // 区分函数形式和类形式
  let instance;
  if(comp.prototype && comp.prototype.render){ // 类组件
    instance = new comp();
    console.log(instance);
  }else{ // 函数组件(将其转换为类组件)
    instance = new Component(props);
    instance.constructor = comp;
    instance.render = function(){
      return this.constructor(props);
    }
  }
  return instance;
}
// 渲染||更新组件
export function renderComponent(comp){
  let base;
  const renderer = comp.render(); // 虚拟dom
  base = _render(renderer) // 节点
  // 替换节点
  if(comp.base && comp.base.parentNode){
    comp.base.parentNode.replaceChild(base,comp.base)
  }
  comp.base = base;
}
// 设置组件属性
function setComponentProps(comp,props){
  comp.props = props;
}

// 渲染页面
function render(vnode,container){ // 参数：虚拟dom,容器节点
  return container.appendChild(_render(vnode))
}
// 将虚拟dom转化为真实dom
function _render(vnode){ 
  if(vnode === undefined || typeof vnode === 'boolean'|| vnode===null) return;
  if(typeof vnode === 'number') vnode = String(vnode);
  // 如果Vode是一个文本节点
  if(typeof vnode === 'string'){
    return document.createTextNode(vnode);  
  }
  const { tag,attrs,childrens } = vnode;
  // 如果为组件
  if(typeof tag === 'function'){
    // 创建组件
    const comp = createComponent(tag,attrs);
    // 设置组件属性
    setComponentProps(comp,attrs);
    // 渲染组件
    renderComponent(comp);
    // 返回组件待渲染的节点
    return comp.base;
  }
  const dom = document.createElement(tag);
  if(attrs){
    Object.keys(attrs).forEach(key=>{
      // 设置属性
      setAttribute(dom,key,attrs[key]);
    })
  }
  // 递归渲染子节点
  childrens && childrens.forEach(child => {
    render(child,dom);
  });
  return dom;
}
// 设置属性
function setAttribute(dom,key,value){
  if(key === 'className'){
    key = 'class';
  }
  // 如果是事件：onClick...
  if(/on\w+/.test(key)){
    // 转为小写
    key = key.toLowerCase();
    dom[key] = value || '';
  }else if(key === 'style'){ // 值可以为对象和字符串
    if(!value || typeof value ==='string'){
      dom.style.cssText = value || '';
    }else if(value && typeof value === 'object'){
      for(let k in value){
        if(typeof value[k] === 'number'){
          dom.style[k] = value[k]+'px';
        }else{
          dom.style[k] = value[k];
        }
      }
    }
  }else{
    if(key in dom){
      dom[key] = value || '';
    }
    if(value){
      // 更新值
      dom.setAttribute(key,value);
    }else{
      dom.removeAttribute(key);
    }
  }
}
export default {
  render
}