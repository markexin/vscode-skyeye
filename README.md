# Skyeye

![version-v0.0.5](https://img.shields.io/badge/version-v0.0.5-yellow.svg) 
![build-passing](https://img.shields.io/badge/build-passing-green.svg) 
[![license-MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE.md) 

<img src="./media/s-icon.png" width="100" style="vertical-align: middle">

**天眼**：vscode extension。主要为了降低命令式的学习成本，提供快捷的方式集成到各业务项目中，以监控node 服务或者前端Web页面内存变化。项目插件基于[memlab](https://github.com/facebook/memlab)，在此十分感谢[memlab](https://github.com/facebook/memlab)为开源做出的贡献，撒花✿✿ヽ(°▽°)ノ✿✿。

插件安装基于需要使用者配有 node 相关的开发环境。<strong style="color: red">请在开发模式下使用，构建工具（如：webpack）编译后的项目不方便定位内存调用栈</strong>。

## Instructions

**Retainer traces**

retainer trace 是从 GC 根到泄漏对象的对象引用链。跟踪显示泄漏的对象为何以及如何在内存中仍然保持活动状态。打破引用链意味着泄漏的对象将不再可以从 GC 根访问，因此可以被垃圾收集。

```
MemLab found 46 leak(s)
--Similar leaks in this run: 4--
--Retained size of leaked objects: 8.3MB--
[Window] (native) @35847 [8.3MB]
  --20 (element)--->  [InternalNode] (native) @130981728 [8.3MB]
  --8 (element)--->  [InternalNode] (native) @130980288 [8.3MB]
  --1 (element)--->  [EventListener] (native) @131009888 [8.3MB]
  --1 (element)--->  [V8EventListener] (native) @224808192 [8.3MB]
  --1 (element)--->  [eventHandler] (closure) @168079 [8.3MB]
  --context (internal)--->  [<function scope>] (object) @181905 [8.3MB]
  --bigArray (variable)--->  [Array] (object) @182925 [8.3MB]
  --elements (internal)--->  [(object elements)] (array) @182929 [8.3MB]
...
```
