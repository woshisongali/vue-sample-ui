###多选框列表 示例参考 
```html example
  <check-group v-model="checkArr"></check-group>

```
```
checkArr: [
          {
            label: 'first',
            checked: true
          },
          {
            label: 'second',
            checked: false
          }
        ]
```

`注意` 列表循环时，会进行key的配置。 当列表信息出现重置时需调用createId（）方法从新生成keyid