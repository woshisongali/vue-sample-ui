<template>
<div style="height: 1000px">
  <Hello></Hello>
  <span class="hover-styl" @click="operaDialog">  fffffclick here to change</span>
  
  <check-box v-model="checkVal" >
    <span>这里是一个选框</span>
  </check-box>
  <!-- <check-group v-model="checkArr" cls="new-group-style">
    <check-box label="1">
      <span>这里是一个选框</span>
    </check-box>
    <check-box label="2">
      <span>第二个</span>
    </check-box>
  </check-group> -->
  <!-- <check-box v-model="checkVal">
    <span>this is only single checkbtn</span>
  </check-box> -->
  <!-- <testElement></testElement> -->
  <!-- <testSample></testSample> -->
  <!-- <ManualTest v-if="showManual"></ManualTest> -->
  <!-- <Dialog :visible="showDialog"
    @hide="showDialog = false"
    v-if="showDialog"
    @confirm="testConfirm"
    @close="handlerDialog('close')"
    @cancel="handlerDialog('cancel')"
    boxClass="customStyle"
  >
    如果是自定义窗口，不对下面的内容进行CSS样式处理
    <div slot="dialbody">
      <p>the content is just a test</p>
      <span>another is ???</span>
    </div>
  </Dialog> -->
  <PhotoAlbum></PhotoAlbum>
  <!-- <wag-btn type="primary" size="large">hi</wag-btn> -->
  <!-- <fe-toast icon="loading" v-model="toast1">网络异常，请稍后再试</fe-toast> -->
  <!-- <fe-pagination :current-page="6" :total="300" :page-size="30" 
  @current-change="handleChange"></fe-pagination> -->
  <!-- <fe-radio v-model="radioVal" label="1">男</fe-radio>
  <fe-radio v-model="radioVal" label="2">女</fe-radio> -->

</div>
  
</template>
<script type="text/babel">
  import Vue from 'vue'
  import Hello from '../../components/Hello.vue'
  import CheckBox from '../../components/check-box/Checkbox.vue'
  import CheckGroup from '../../components/check-group/CheckGroup.vue'
  // import ManualTest from 'components/manual-mount-example/test.vue'
  import Dialog from '../../components/dialog/Dialog.vue'
  import PhotoAlbum from '../../components/photo-album/test.vue'
  // import WagBtn from 'components/wag-btns/Button.vue'
  // import FeToast from 'components/toast/Toast.vue'
  import FePagination from '../../components/pagination/pagination.js'
  import FeRadio from '../../components/radio/radio.vue'
  
  export default{
    data () {
      return {
        msg: 'hello vue',
        checkVal: true,
        manual: null,
        showManual: false,
        showDialog: false,
        toast1: true,
        radioVal: "1",
        checkArr: ['2']
      }
    },
    mounted () {
      setTimeout(() => {
        this.toast1 = false
      }, 3000)
    },
    components: {
      Hello,
      CheckBox,
      CheckGroup,
      // ManualTest,
      Dialog,
      PhotoAlbum,
      // WagBtn,
      // FeToast,
      FePagination,
      FeRadio
    },
    methods: {
      chgManual () {
        console.log('click here')
        this.showManual = !this.showManual
      },

      operaDialog () {
        this.showDialog = true
      },

      handlerDialog (type) {
        console.log('do some thing after ' + type)
      },

      testConfirm (next) {
        console.log('the confirm in')
        next()
      },
      
      handleChange (num) {
        console.log(num)
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.hover-styl {
  cursor pointer
}

</style>
<style lang="stylus">
.customStyle {
  width 500px
  margin 0px auto
  background #fff
}
</style>

