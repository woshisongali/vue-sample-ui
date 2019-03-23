### 示例引入

```html example
<fe-pagination :current-page="6" :total="300" :page-size="30" @current-change="handleChange"></fe-pagination>

or

<fe-pagination :current-page="7" :page-count="30" @current-change="handleChange"></fe-pagination>
```

## Attributes

### current-page

说明：`当前页数`
<br/>
类型：`Number`
<br/>
默认值：`1`

### page-count

说明：`总页数，total 和 page-count 设置任意一个就可以显示页码；如果要更改 page-size，则需要使total`
<br/>
类型：`Number`
<br/>
默认值：`-`

### total

说明：`总条目数`
<br/>
类型：`Number`
<br/>
默认值：`-`

### page-size

说明：`每页显示条目个数`
<br/>
类型：`Number`
<br/>
默认值：`10`

### theme

说明：`风格颜色`
<br/>
类型：`String`
<br/>
可选：`white、gray`
<br/>
默认值：`white`

## Events

### current-change

说明：`currentPage 改变时触发`
<br/>
回调参数：`当前 currentPage`
