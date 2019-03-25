## 下拉选框及模糊搜索

该组件支持类似select option 类型的选框， 同时也可实现关键字模糊匹配提示。

## 下拉选框示例引入

```html example
<down-select-only
        :orginOpts="weightTypeOpts"
        v-model="weightType"
        indexKey="indexKey"
        asycn
      ></down-select-only>
```

```js example
      weightType: '2',
      weightTypeOpts: [
        {value: '1', label: 'the first'},
        {value: '2', label: 'the second'},
        {value: '3', label: 'the thrid'},
        {value: '4', label: 'the sss'},
        {value: '5', label: 'the fff'},
        {value: '6', label: 'the dddddd'}

      ],
```
## 下拉选框 Attributes

### value

说明：`选框带入值， 与orginOpts单项元素的value一致`
<br/>
类型：`String Number`
<br/>
默认值：`null`

### orginOpts

说明：`option选项`
<br/>
类型：`Array`
<br/>
默认值：`[]`



### placeholder

说明：`placeholder`
<br/>
类型：`String`
<br/>
默认值：`''`

### styleVal

说明：`input可重写样式`
<br/>
类型：`String`
<br/>
默认值：`''`

### extroClass

说明：`可注入的class样式`
<br/>
类型：`String`
<br/>
默认值：`''`

## 模糊搜索提示
### 异步请求后台数据
```html example
 <down-select
        :orginOpts="productnameOpts"
        v-model="productName"
        indexKey="indexKey"
        styleVal="width: 100px;"
        asycn
        @asycnSendData="getProductName"
      >
        <span>钢材信息</span>
      </down-select>
```
对于模糊搜索异步请求， 可以通过设置asycn 和@asycnSendData属性进行实现。
asycnSendData的方法是通过value值变化来实时触发， 你可以通过thorttle 或者debounce对该回调函数进行封装，以减小服务器压力。
[测试用例参考](./test.vue)

### 对于原始数据可进行过滤筛选
```html example
<down-select
        :orginOpts="factoryOPts"
        v-model="factoryName"
        indexKey="indexKey"
        styleVal="width: 100px;"
        asycn
        @asycnSendData="getFactoryName"
        isFilter
      >
        <span>工厂信息</span>
      </down-select>
```
通过设置isFilter 可开启筛选功能
[测试用例参考](./test.vue)

## 模糊匹配 Attributes

### value

说明：`选框带入值， 与orginOpts单项元素的label一致`
为什么与label一致， 它本身就不应该跟select类型的元素纠结在一起。 这也是刚开始急于开发，遗留问题。
<br/>
类型：`String Number`
<br/>
默认值：`null`

### orginOpts

说明：`option选项`
<br/>
类型：`Array`
<br/>
默认值：`[]`



### placeholder

说明：`placeholder`
<br/>
类型：`String`
<br/>
默认值：`''`

### styleVal

说明：`input可重写样式`
<br/>
类型：`String`
<br/>
默认值：`''`

### extroClass

说明：`可注入的class样式`
<br/>
类型：`String`
<br/>
默认值：`''`

### readOnlyStr
说明：`是否为只读模式`
<br/>
类型：`Boolean`
<br/>
默认值：`false`

### asycn
说明：`回调是否是异步请求`
<br/>
类型：`Boolean`
<br/>
默认值：`false`

### isFilter
说明：`是否进一步对数据进行筛选过滤`
<br/>
类型：`Boolean`
<br/>
默认值：`false`


### 项目背景
组件开发的背景是，再做商品信息列表模块时—— 产品希望用户输入品名材质 和工厂信息会有相应的信息提示、 类似	质保书计重方式则希望直接是下拉选框选择、 使用上下快捷键也可以选择信息。
刚开始做的时候将下拉选框和模糊匹配封装的一个组件中，发现这样做是有问题的， 在原有的基础上将该组件进行拆分。
目前来说还是有黏连耦合的，以后会继续优化。

