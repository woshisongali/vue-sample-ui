## vee-validate用法

### 安装

```
npm install vee-validate --save
```

### 引入

#### 1.完全引入

``` js
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
```

#### 2.按模块引入

``` js
import {
  ValidationProvider, Validator, install
  as VeeValidate
} from 'vee-validate/dist/vee-validate.minimal.esm.js'

import {
  required,
  min,
  max,
  max_value,
  min_value,
  numeric,
  is,
  email
} from 'vee-validate/dist/rules.esm.js'

Validator.extend('required', required)
Validator.extend('min', min)
Validator.extend('max', max)
Validator.extend('numeric', numeric)
Validator.extend('max_value', max_value)
Validator.extend('min_value', min_value)
Validator.extend('is', is)
Validator.extend('email', email)
```

### 一个简单的示例
```
  <input v-validate="'required|email'" name="email" type="text">
  <span>{{ errors.first('email') }}</span>  
```

### Error本地化

#### 1.引入vee库中的中文文档
```
import zh_CN from 'vee-validate/dist/locale/zh_CN'

```

#### 2.可以引入自定义文档
自定义文档格式
``` js
export default {
  name: 'zh_CN',
  messages: { ...}
} 
```

#### 组件注入 $validator

veevalidate默认为开启注入的$validator， 即每个组件都会被注入$validator属性
可以通过配置关闭注入，然后手动注入需要进行校验的组件

示例如下
``` js
Vue.use(VeeValidate, { inject: false })
```
``` js
export default {
  inject: ['$validator'],
  // ...
};

// OR use object syntax

export default {
  inject: {
    $validator: '$validator'
  },
  // ...
};
```
 
### 自定义校验规则

#### 1.同步校验函数
```js
Validator.extend('truthy', {
  getMessage: field => 'The ' + field + ' value is not truthy.',
  validate: value => !! value
});
```

#### 2.异步校验函数
```js
Validator.extend('promiseTest', {
  validate: (value)=> {
    return new Promise(resolve => {
      if (value.length > 5) {
        return resolve({
          valid: true
        })
      }
      return resolve({
        valid: false,
        data: {
          message: `the lenght to short`
        }
      })
    })
  },
  getMessage: (field, params, data) => data.message
})
```

#### 3.在组件内自定义校验规则

我更倾向于将校验规则放到配置文件中， 然后大家通过命名空间来对各自的校验加以区分， 主要用来防止规则覆盖问题。 但对于有些组件还是要采用在组件内注册的方式

``` js
    this.$validator.extend('validMsgCodeRemote', this.validMsgCodeRemote())

```
``` js

validMsgCodeRemote () {
      const self = this
      return {
        validate: value => {
          return new Promise(resolve => {
            let captcha = value
            let mobile = self.value
            let masterMemberId = this.masterMemberId
            validCode({captcha, mobile, masterMemberId}).then(d => {
              let data = d.data || {isSuccess: false}
              if (!data.isSuccess) {
                return resolve({
                  valid: false,
                  data: {
                    message: data.errorMsg || '校验异常，请稍后再试～'
                  }
                })
                self.isMsgCodeOk = false
              }
              self.isMsgCodeOk = true
              return resolve({
                valid: true,
              })
            })
          })
        },
```

### 自定义相关class

``` js
Vue.use(VeeValidate, {
  classes: true,
  classNames: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});
```

### 自定义校验事件
veeValidate默认是通过input事件来触发校验的

#### 1.全局定义
```js
Vue.use(VeeValidate, {
  events: 'change'
});
```

#### 2.直接在元素上
``` html example
<input name="field" v-validate="'required'" data-vv-validate-on="change|custom">
```


### 互动方式 Interaction Modes
VeeValidate有四种模式
> 1.aggressive 默认方式，当触发input事件是执行校验
  2.passive 跳过校验
  3.lazy 在元素发生change或blur事件后进行校验
  4.eager 当当前元素无效时 此时通过input事件执行校验， 当当前元素有效时此时通过change事件来校验
  其相关配置如下

  ``` js
  const eager = ({ errors }) => {
  if (errors.length) {
    return {
      on: ['input']
    };
  }

  return {
    on: ['change']
  };
};


  ```

  ### 动态显示input问题

  在项目中会遇到类似如下的情况
  ``` html
  <template v-if="loginType === 'username'">
    <label>Username</label>
    <input placeholder="Enter your username">
  </template>
  <template v-else>
    <label>Email</label>
    <input placeholder="Enter your email address">
  </template>
  ```

  根据Vue的diff原则，就会把 username 的input和 email的input看做一个对象来处理， 此时会出现校验出错情况。 我们可以通过增加不同的key值来加以区分
  示例如下
  
  ``` html
  <template v-if="loginType === 'username'">
    <label>Username</label>
    <input placeholder="Enter your username" key="username-input">
  </template>
  <template v-else>
    <label>Email</label>
    <input placeholder="Enter your email address" key="email-input">
  </template>
  ```

  v-for中可能也会遇到这种情况，我们要做的是保证key值的不同


  ### Validation Provider

 该组件为你的input对象提供作用域插槽

 ``` html example
 <template>
  <ValidationProvider rules="required" v-slot="{ errors }">
    <input v-model="value" type="text">
    <span id="error">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
  components: {
    ValidationProvider
  }
};
</script>
 ```

 ### Validation Observer
 提供一个作用域来对validation的属性进行包装

一个常见的示例， 当元素校验未通过时此时我们希望 button按钮为置灰状态。可以通过该组件进行封装

``` html example
<ValidationObserver v-slot="{ invalid }">
  <form @submit.prevent="submit">
    <InputWithValidation rules="required" v-model="first" :error-messages="errors" />

    <InputWithValidation rules="required" v-model="second" :error-messages="errors" />

    <v-btn :disabled="invalid">Submit</v-btn>
  </form>
</ValidationObserver>
```

### Scopes

通过data-vv-scope可以设置一个作用域， 当有部分校验的需求时可只校验该作用域内的。

``` html example
<form @submit.prevent="validateForm('form-1')" class="columns column is-multiline is-12" data-vv-scope="form-1">
            <legend>Form 1</legend>
            <div class="column is-12">
                <label class="label">Email</label>
                <p class="control has-icon has-icon-right">
                    <input name="email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('form-1.email') }" type="text" placeholder="Email">
                    <i v-show="errors.has('form-1.email')" class="fa fa-warning"></i>
                    <span v-show="errors.has('form-1.email')" class="help is-danger">{{ errors.first('form-1.email') }}</span>
                </p>
            </div>
            <div class="column is-12">
                <label class="label">Password</label>
                <p class="control has-icon has-icon-right">
                    <input name="password" v-validate="'required|min:6'" :class="{'input': true, 'is-danger': errors.has('form-1.password') }" type="password" placeholder="Password">
                    <i v-show="errors.has('form-1.password')" class="fa fa-warning"></i>
                    <span v-show="errors.has('form-1.password')" class="help is-danger">{{ errors.first('form-1.password') }}</span>
                </p>
            </div>
            <div class="column is-12">
                <p class="control">
                    <button class="button is-primary" type="submit" name="button">Sign up</button>
                    <button class="button is-danger" type="button" name="button" @click="errors.clear('form-1')">Clear</button>
                </p>
            </div>
        </form>
```
``` js
methods: {
    validateForm(scope) {
      this.$validator.validateAll(scope).then((result) => {
        if (result) {
          // eslint-disable-next-line
          alert('Form Submitted!');
        }
      });
    }
  }
```


