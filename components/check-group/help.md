###多选框列表 示例参考 
```html example
  <check-group v-model="checkArr">
    <check-box label="1">
      <span>这里是一个选框</span>
    </check-box>
    <check-box label="2">
      <span>第二个</span>
    </check-box>
  </check-group>

```

## Attributes

### value
说明：`已经选中的数组值`
<br/>
类型：`Array`
<br/>
默认值：`[]`

### cls
说明：`可以传入的class值`
<br/>
类型：`Array`
<br/>
默认值：`[]`

最初设想采用数组对象方式， 即数组对象中包括value值和是否选中状态值， 然后利用for循环展示单项状态。 
参考element后发现，他们那种包装方式可以更好的解耦，也就按照这种形式进行实现。