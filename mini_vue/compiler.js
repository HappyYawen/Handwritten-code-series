/**
 * Compiler
 * 解析每个元素中的指令以及差值表达式，并替换成相应的数据
 * 负责页面的首次渲染
 * 当数据变化后重新渲染视图
 */
class Compiler {
  constructor(vm, el) {
    this.vm = vm
    this.el = el
    this.comilpe(el)
  }
  comilpe(el) {
    // 遍历所有子元素，判断元素是文本节点还是元素节点
    const childs = el.childNodes || []
    childs.forEach(node => {
      if (this.isTextNode(node)) {
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        this.compileElement(node)
      }
      //判断当前节点是否有子节点，如果有则继续编译
      if (node.childNodes && node.childNodes.length) {
        this.comilpe(node)
      }
    })
  }
  // 编译文本节点
  compileText(node) {
    const reg = /\{\{(.+?)\}\}/
    const value = node.textContent
    if (reg.test(value)) {
      // const key = RegExp.$1.trim() //ReExp.$1已被弃用
      const key = value.match(reg)[1].trim()
      node.textContent = value.replace(reg, this.vm[key]) // 匹配的部分替换成对应的数据
      new Watcher(this.vm, key, (val) => {
        node.textContent = val
      })
    }
  }
  // 编译元素节点
  compileElement(node) {
    // 判断元素是不是包含指令
    const attrs = Array.from(node.attributes)
    attrs.forEach(attr => {
      if (attr.nodeName.startsWith('v-')) {
        const key = attr.nodeValue
        const attrName = attr.nodeName.substr(2)
        this.update(node, attrName, key)
      }
    })
  }
  update(node, attrName, key) {
    const updateFn = this[attrName+'Update']
    updateFn && updateFn.call(this, node, key, this.vm[key]) // 改变this指向
  }
  //v-text指令解析
  textUpdate(node, key, value) {
    node.textContent = value
    new Watcher(this.vm, key, (val) => {
      node.textContent = val
    })
  }
  //v-model指令解析，双向绑定
  // 表单元素，使用value接收
  modelUpdate(node, key, value) {
    node.value = value
    // 数据变化更新视图
    new Watcher(this.vm, key, (val) => {
      node.value = val
    })
    // 视图变化更新数据
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }
  isTextNode(node) {
    return node.nodeType === 3
  }
  isElementNode(node) {
    return node.nodeType === 1
  }
  
}