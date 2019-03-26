<template>
  <div :class="['mod-wcity',sT ? 't' : '','normal']" @click.stop>
    <!-- <input type="text" :name="name" datastr="selectaddr" class="hide" :value="value"> -->
    <div
      class="input-box"
      :class="addrstyl"
      @click="toogleST">
      {{ value ? value : placeholder}}
    </div>
    <i class="arrow" @click="toogleST"></i>
    <div class="city-content">
      <ul class="city-header">
        <li :class="[cST == 1 ? 't' : '']" @click="cST = 1">省</li>
        <li :class="[cST == 2 ? 't' : '']" @click="clickCityHeader">市</li>
        <li :class="[cST == 3 ? 't' : '']" @click="clickAreaHeader">区</li>
      </ul>
      <ul class="city-middle">
        <li
          v-for="(item, index) in itemsR"
          @click="clickItem(index)"
          :title="item.name"
          :class="{active: hasActive(index)}"
        >{{item.name | limit(3) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/babel">
  /* global PCA_DATA */
  // var cityData = PCA_DATA

  import {getAddress} from './getAddress'

  // 所有的省
  // function getProvices () {
  //   return cityData[0]
  // }
  export default {
    name: 'wcity',
    props: ['value', 'placeholder', 'addrstyl'],
    data () {
      return {
        cityData: null,
        hasAddress: false,
        sT: false, // 控制区域显示与否
        cST: 1, // 1省 2市 3区
        pidx: -1, // 当前省的索引
        cidx: -1, // 当前市的索引
        aidx: -1 // 当前区域的索引
      }
    },
    watch: {
      sT (nv) {
        if (nv === false) {
          this.$emit('blur')
        }
      }
    },
    computed: {
      itemsR () {
        let cST = this.cST
        if (cST === 1) {
          return this.getProvices()
        } else if (cST === 2) {
          return this.getCurrCitys()
        } else {
          return this.getCurrAreas()
        }
      }
    },
    filters: {
      limit (str, n) {
        return str.slice(0, n)
      }
    },
    methods: {
      getAddress () {
        let self = this
        getAddress().then(data => {
          self.cityData = data
          self.hasAddress = true
        })
      },
      getProvices () {
        if (this.hasAddress) {
          return this.cityData[0]
        }
      },
      hasActive (idx) {
        let cST = this.cST
        let match = false
        if (cST === 1) {
          match = this.pidx === idx
        } else if (cST === 2) {
          match = this.cidx === idx
        } else {
          match = this.aidx === idx
        }
        return match
      },
      getCurrProvice () {
        if (this.pidx === -1) return null
        return this.cityData[0][this.pidx]
      },
      getCurrCitys () {
        if (this.pidx === -1) return null
        return this.cityData[1][this.pidx]
      },
      getCurrCity () {
        if (this.cidx === -1) return null
        return this.getCurrCitys()[this.cidx]
      },
      getCurrAreas () {
        if (this.cidx === -1) return null
        return this.cityData[2][this.pidx][this.cidx]
      },
      getCurrArea () {
        if (this.aidx === -1) return null
        return this.getCurrAreas()[this.aidx]
      },
      clickCityHeader () {
        let city = this.getCurrCitys()
        if (city !== null) {
          this.cST = 2
        } else {
          void null
        }
      },
      clickAreaHeader () {
        let area = this.getCurrAreas()
        if (area !== null) {
          this.cST = 3
        } else {
          void null
        }
      },
      clickItem (idx) {
        if (this.cST === 1) {
          this.pidx = idx
          this.cST = 2
        } else if (this.cST === 2) {
          this.cidx = idx
          this.cST = 3
        } else {
          this.aidx = idx
          this.$emit('input',
              `${this.getCurrProvice().name}/${this.getCurrCity().name}/${this.getCurrArea().name}`,
          `${this.getCurrProvice().code}/${this.getCurrCity().code}/${this.getCurrArea().code}`)
          this.sT = false
        }
      },
      toogleST () {
        this.sT = !this.sT
      },
      hide () {
        this.sT = false
      }
    },
    mounted () {
      this.getAddress()

      let self = this
      document.addEventListener('click', function () {
        self.sT = false
      })
    }
  }
</script>

<style scoped>
  .mod-wcity {
    display: inline-block;
    position: relative;
    cursor: pointer;
    vertical-align: middle;
    top: -2px;
  }

  .mod-wcity .hide {
    display: none;
  }

  .mod-wcity .input-box {
    height: 28px;
    line-height: 26px;
    width: 190px;
    font-size: 12px;
    padding: 0 10px;
    border: #bfcbd9 1px solid;
    line-height: 1.5;
    box-sizing: border-box;
    border-radius: 4px;
    color: #353535;
    position: relative;
    background: #ffffff;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .mod-wcity .addr-input{
    width: 250px;
    border: 1px solid red;
  }
  .mod-wcity.t .input-box {
    z-index: 2;
  }

  .mod-wcity .input-box.placeholder {
    color: #8391a5;
  }

  .mod-wcity i.arrow {
    display: block;
    position: absolute;
    background: url('./i/down.png');
    background-size: 26px;
    height: 20px;
    width: 30px;
    right: 9px;
    top: 7px;
  }

  .mod-wcity.t i.arrow {
    z-index: 2;
  }

  .mod-wcity.t i.arrow {
    background: url('./i/arrow-up.png');
    background-size: 26px;
  }

  .mod-wcity .city-content {
    display: none;
    background: #ffffff;
    width: 100%;
    position: absolute;
    top: 32px;
    left: 0px;
    box-shadow: 0 0 16px 0 #c5c5c5;
    overflow: hidden;
  }

  .mod-wcity.t .city-content {
    z-index: 1;
    display: block;
  }

  .mod-wcity .city-header {
    font-size: 0px;
    margin: 0px;
    padding: 0px;
    background: #f5f5f5;
    border-bottom: 1px solid #e5e5e5;
  }

  .mod-wcity .city-header > li {
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    text-align: center;
    width: 33.33%;
    box-sizing: border-box;
    border-right: 1px solid #e5e5e5;
    line-height: 30px;
    background: #f5f5f5;
  }

  .mod-wcity .city-header > li.t {
    background: #ffffff;
  }

  .mod-wcity .city-header > li:last-child {
    border-right: none;
  }

  .mod-wcity .city-middle {
    display: block;
    background: #ffffff;
    padding: 16px 12px;
    color: #656565;
    font-size: 0px;
  }

  .mod-wcity .city-middle > li {
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    width: 25%;
    line-height: 28px;
    overflow: hidden;
  }

  .mod-wcity .city-middle > li:hover {
    color: #316ccb;
  }

  .mod-wcity .city-middle > li.active {
    color: #316ccb;
  }

  /*normal*/
  .mod-wcity.normal .input-box {
    border-radius: 0;
    border-color: #e5e5e5;
    line-height: 26px;
  }

  .mod-wcity.t.normal .input-box {
    border-color: #316ccb;
  }

  .mod-wcity.normal .input-box.red-bd {
    border-color: #ff7300;
  }

  .mod-wcity.normal i.arrow {
    right: 8px;
    top: 2px;
  }

  .mod-wcity.normal .city-content {
    top: 34px;
  }

  .mod-wcity.normal .input-box.placeholder {
    color: #c5c5c5;
  }
</style>
