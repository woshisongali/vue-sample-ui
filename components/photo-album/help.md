###入口引入方式
```html example
    <zoom-img ref="photoAlbum" ismask="yes"></zoom-img>
```

### 调用方式如下 
```
    this.$refs.photoAlbum.handleZoom(files, index)
```

通过filse[index].src获取大图的url
<br/>
可通过test.vue查看调用方法
<br/>
该模块没有没对缩略图列表进行封装，而是直接采用方法调用，目的就是将缩略图展示的模块与大图查看进行解耦。
<br/>

当时的项目背景是： 1.一个模块含有多个图片列表信息
                2. 图片列表模块又区分为可以再次上传编辑图片的，和不可以进行编辑的图片
                <br/>
针对该模块起名的时候也是比较纠结，叫相册吧它缺少缩略图列表模块的封装，可从功能上来说它又基本完成相册的功能
。 
<br/>
当然你可以选择另外对缩略列表进行封装

