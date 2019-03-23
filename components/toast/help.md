### 示例引入

```html example
<fe-toast icon="loading" v-model="toast1">网络异常，请稍后再试</fe-toast>

or

<fe-toast theme="gray" icon="warn" v-model="toast2">查询失败</fe-toast>
```

## Attributes

### value

说明：`toast是否显示，可使用v-model双向绑定数据`
<br/>
类型：`Boolean`
<br/>
默认值：`false`

### theme

说明：`主题`
<br/>
类型：`String`
<br/>
默认值：`white`
<br/>
可选：`white、gray`

### icon

说明：`显示图标`
<br/>
类型：`String`
<br/>
默认值：`-`
<br/>
可选：`loading、warn、success`

后续可引入渐入渐出动画效果