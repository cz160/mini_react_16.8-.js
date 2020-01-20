function createElement(tag,attrs,...childrens){
  return {
    tag, // 外层标签
    attrs, // 所有属性(对象)
    childrens // 所有孩子节点(数组)
  }
}
export default {
  createElement,
};