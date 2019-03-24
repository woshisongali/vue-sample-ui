### 创建一个弹框

遮罩弹窗通常是覆盖在整个页面上的，如果它的结构位于最外层的话从结构层面来看更符合逻辑

利用appendChild对已有的节点可进行位置转移特点
<br/>


#### 引入用例如下
```html example
<Dialog :visible="showDialog"
    @hide="showDialog = false"
    @confirm="testConfirm"
    @close="handlerDialog('close')"
    @cancel="handlerDialog('cancle')"
  ></Dialog>
```
visible表示当前窗口是否可显示， 为了确保改变量的一致性。在窗口关闭时需修改调用父层修改props，所以需在父层绑定`@hide="showDialog = false"`。
<br/>
可以通过在父层绑定confirm、close、cancel的回调函数
<br/>
可以通过v-if来避免父层提前载入其DOM结构

#### 关于confirm
对于弹窗，在取消和关闭时并没有做太多的处理， 但对于确认时回调函数可能是个异步的。 我们有时候需要在异步函数完成之后才进行关闭窗口的处理， 所以针对确认进行了进一步的封装，可以在回调函数完成后出发next方法执行关闭。
```
testConfirm (next) {
        console.log('the confirm in')
        next()
      }
```
确认按钮可通过设置disdConfirm进行置灰操作

### 自定义内容
props isCustom
引入代码如下所示
```html example
<Dialog :visible="showDialog"
    @hide="showDialog = false"
    @confirm="testConfirm"
    @close="handlerDialog('close')"
    @cancel="handlerDialog('cancle')"
    boxClass="customStyle"
    isCustom
  >
    <!--如果是自定义窗口，不对下面的内容进行CSS样式处理-->
    <div>
      <p>the content is just a test</p>
      <span>another is ???</span>
    </div>
  </Dialog>
```
自定义窗口只是对你的组件进行简单的封装，不做过多处理
<br/>
你可以通过boxClass设置外框大小或其他样式自行控制，主动权掌握在你的手中， `自定义窗口在设置样式时， 请通过margin确保水平居中`因为对于垂直采用js进行控制，水平只做CSS处理。


## Attributes

### topDiff
说明：`在居中的方式上叠加距离上部的位置， 主要是考虑的人的注意力会在中心偏上一些的位置。 
如果刚好居中的话再加上浏览器本身top信息会使弹框显得偏低， 这个值你可以自行调节。`
<br/>
类型：`Number`
<br/>
默认值：`-80`

### visible
说明：`模态窗是否可见`
<br/>
类型：`Boolean`
<br/>
默认值：`false`

### title
说明：`窗口title`
<br/>
类型：`String`
<br/>
默认值：`提示`

### showCancel
说明：`是否展示底部的取消按钮`
<br/>
类型：`Boolean`
<br/>
默认值：`true`

### disdConfirm
说明：`确认按钮是否是置灰状态`
<br/>
类型：`Boolean`
<br/>
默认值：`false`

### confirmText
说明：`确认按钮文字可配置`
<br/>
类型：`String`
<br/>
默认值：`确认`

### isCustom
说明：`是否是自定义弹窗`
<br/>
类型：`Boolean`
<br/>
默认值：`false`

### boxClass
说明：`传入一个class值`
<br/>
类型：`String`
<br/>
默认值：`''`

### lockScroll
说明：`展示弹窗时， 窗口是否有滚动条`
<br/>
类型：`Boolean`
<br/>
默认值：`true`
