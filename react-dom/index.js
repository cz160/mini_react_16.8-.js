function render(vnode,container){ // 参数：虚拟dom,容器节点
  if(vnode === undefined || typeof vnode === 'boolean'|| vnode===null) return;
  if(typeof vnode === 'number') vnode = String(vnode);
  // 如果Vode是一个文本节点
  if(typeof vnode === 'string'){
    const textNode = document.createTextNode(vnode); 
    return container.appendChild(textNode);
  }
  const { tag,attrs,childrens } = vnode;
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
  return container.appendChild(dom);
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