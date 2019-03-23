###引入示例
```html example
<fe-radio v-model="radioVal" label="1">男</fe-radio>
  <fe-radio v-model="radioVal" label="2">女</fe-radio>
```
```
radioVal: "1"
```

## Attributes

### value
说明：`单选组件选中的值， 为双向绑定`
<br/>
类型：`String, Number, Boolean`
<br/>
默认值：`null`

### label
说明：`单个元素对应的值`
<br/>
类型：`String, Number, Boolean`
<br/>
默认值：`null`