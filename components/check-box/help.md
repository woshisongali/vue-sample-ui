### 示例

```html example
 <check-box v-model="checkVal">
    <span>这里是一个选框</span>
  </check-box>
  <check-box v-model="checkVal" disabled>
    <span>这里是一个选框</span>
  </check-box>
```

## Attributes

### value
说明：`对于单个选择框时，只有选中和未选中的状态，这时采用Boolean值`
<br/>
类型：`Boolean`
<br/>
默认值：`false`

### label
说明：`针对多个多选框时采用label赋值的方式， 此属性配合CheckGroup组件`
<br/>
类型：`String, Number`
<br/>
默认值：`null`

### disabled
说明：`可将选框置为非可用状态`
<br/>
类型：`Boolean`
<br/>
默认值：`false`

### cls
说明：`可通过该属性传入class样式`
<br/>
类型：`String`
<br/>
默认值：`''`