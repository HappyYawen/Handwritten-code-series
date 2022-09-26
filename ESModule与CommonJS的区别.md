ESMdule与CommonJS的区别
一共有三个重大差异
- CommonJS模块输出的是一个拷贝值，ESModule模块输出的是值得引用
- CommonJS模块是运行时加载，ESModule是编译时输出接口（静态编译，编译时就确定了模块的依赖关系，以及模块的输入输出）
- CommonJS模块使用require()同步加载模块，ESModule模块的import是异步加载模块，**有一个独立的模块依赖的解析阶段**