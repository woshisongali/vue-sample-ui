<template>
  <div>
    <!-- 采用事件代理方法调用 -->
    <ul class="img-list" @click="delegation($event, potoList1)">
      <li v-for="(item, index) in potoList1" >
        <div class="img-wrapper">
          <img :src="item.smallSrc" :index="index" zoomImg="yes" />
        </div>
      </li>
    </ul>

    <!-- 直接在缩略图上调用 -->
    <ul class="img-list">
      <li v-for="(item, index) in potoList2" >
        <div class="img-wrapper" @click="directHandler(potoList2, index)">
          <img :src="item.smallSrc" alt=""/>
        </div>
      </li>
    </ul>

    <photo-album ref="photoAlbum" ismask="yes"></photo-album>
  </div>
</template>
<script>
import photoAlbum from './index'
export default {
  data () {
    return {
      potoList1: [
        {
          "src": "//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542089629296&di=d7025519cc0cf89b33401d793cfd7a01&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F1c950a7b02087bf4185d64c7f9d3572c11dfcf6e.jpg",
          "smallSrc": "//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542089629296&di=d7025519cc0cf89b33401d793cfd7a01&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F1c950a7b02087bf4185d64c7f9d3572c11dfcf6e.jpg",          
          "id":"1",
        },
        {
          "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542198719748&di=90548b260d83be800a6da9126df5f748&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F012c1559b2441ea801211d258355d3.jpg%401280w_1l_2o_100sh.png",
          "smallSrc": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542198719748&di=90548b260d83be800a6da9126df5f748&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F012c1559b2441ea801211d258355d3.jpg%401280w_1l_2o_100sh.png",          
          "id": '2'
        }
      ],
      potoList2: [
        {
          "src": "//img4.imgtn.bdimg.com/it/u=271516057,1092390759&fm=26&gp=0.jpg",
          "smallSrc": "//img4.imgtn.bdimg.com/it/u=271516057,1092390759&fm=26&gp=0.jpg",
          "id": "1"
        },
        {
          "src": "//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542793508&di=a00d00cdda11b6161426958050268146&imgtype=jpg&er=1&src=http%3A%2F%2Fdingyue.nosdn.127.net%2F01v1M9Wu%3DxzYRydx5r5W7cX3xdxRNSxNy7fceAlaWR1Yo1527652098513.gif",
          "smallSrc": "//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542793508&di=a00d00cdda11b6161426958050268146&imgtype=jpg&er=1&src=http%3A%2F%2Fdingyue.nosdn.127.net%2F01v1M9Wu%3DxzYRydx5r5W7cX3xdxRNSxNy7fceAlaWR1Yo1527652098513.gif",          
          "id": "2"
        },
        {
          "src": "//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542200719967&di=dd63f4c856ee2108223ad66d41b547e4&imgtype=0&src=http%3A%2F%2Fcdnsfb.soufunimg.com%2Fviewimage%2F1%2F2017_4%2F12%2FM16%2F16%2F91a41a85e08144d8933a98c228aaade9%2F600x600.jpg",
          "smallSrc": "//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542200719967&di=dd63f4c856ee2108223ad66d41b547e4&imgtype=0&src=http%3A%2F%2Fcdnsfb.soufunimg.com%2Fviewimage%2F1%2F2017_4%2F12%2FM16%2F16%2F91a41a85e08144d8933a98c228aaade9%2F600x600.jpg",          
          "id": "3"
        }
      ]
    }
  },

  components: {
    photoAlbum
  },

  methods: {

    delegation (e, files) {
      let target = e.target ||  e.srcElement 
      let zoomImg = target.getAttribute('zoomImg')
      if (!zoomImg) return
      let index = target.getAttribute('index')
      this.$refs.photoAlbum.handleZoom(files, index)
    },

    directHandler (files, index) {
      this.$refs.photoAlbum.handleZoom(files, index)
    }
  }
}
</script>

<style lang="stylus">
  
  .img-list {
    &:after {
      display block
      clear both
      height 0
      content "\0020"
    }
    li {
      float left
      cursor pointer
    }
  }
  .img-wrapper {
    width 100px
    height 100px
    img {
      width 100%
      height 100%
    }
  }
</style>



