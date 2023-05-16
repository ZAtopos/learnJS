 ### 获取DOM元素
 - querySelector  querySelectorAll
 ```js
<body>
    <ul class="nav">
        <li>首页</li>
        <li>产品</li>
        <li>电话</li>
    </ul>
    
    <script>
        const lis = document.querySelector('ul li')
        console.log(lis);
        
    </script>

    <script>
        const lis = document.querySelectorAll('.nav li')
        for( let i = 0; i < lis.length; i++){
            console.log(lis[i]);
            
        }
    </script>
</body>
```
- innerText innerHTML
```js
    <div class="box">我是一个盒子</div>

<script>
    const box = document.querySelector('.box')
    console.log(box.innerText);
    box.innerText = '我只能解析内容'
    
    const box = document.querySelector('.box')
    console.log(box.innerHTML);
    box.innerHTML = '<strong>我可以解析标签</strong>'
    
</script>
```
#### 年会抽奖案例
```js

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>年会抽奖</title>
  <style>
    .wrapper {
      width: 840px;
      height: 420px;
      background: url(./images/bg01.jpg) no-repeat center / cover;
      padding: 100px 250px;
      box-sizing: border-box;
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <strong>传智教育年会抽奖</strong>
    <h1>一等奖：<span id="one">???</span></h1>
    <h3>二等奖：<span id="two">???</span></h3>
    <h5>三等奖：<span id="three">???</span></h5>
  </div>
  <script>
      //定义数组
      const personArr = ['周杰伦', '刘德华', '张学友', '周星驰']
      //随机数 数组下标
      const random1 = Math.floor(Math.random() * personArr.length)
      //获取one元素
      const one = document.querySelector('#one')
      //把名字给one
      one.innerHTML = personArr[random1]
      //删除数组这个名字
      personArr.splice(random1, 1)
      console.log(personArr);
      
       
      //随机数 数组下标
      const random2 = Math.floor(Math.random() * personArr.length)

      const two = document.querySelector('#two')
      two.innerHTML = personArr[random2]
      personArr.splice(random2, 1)
      console.log(personArr);

       
      //随机数 数组下标
      const random3 = Math.floor(Math.random() * personArr.length)
      const three = document.querySelector('#three')
      three.innerHTML = personArr[random3]
      personArr.splice(random3, 1)
      console.log(personArr);
      
  </script>
</body>

</html>
```

#### 页面刷新，图片随机更换
```js
 <img src = "./images/1.webp">
  <script>
      function getRandom(N, M){
          return Math.floor(Math.random() * (M - N + 1 ))+N
      }
      const img = document.querySelector('img')
      const random = getRandom(1, 6)
       img.src = `./images/${random}.webp`
  </script>
  ```
 #### 页面刷新，页面随机更换背景图片
 ```js
   <style>
      body{
          background: url(./images/desktop_1.jpg) no-repeat top center/cover;
      }
  </style>

    <script>
         function getRandom(N, M){
          return Math.floor(Math.random() * (M - N + 1 ))+N
      }
      const random = getRandom(1,10)
     document.body.style.backgroundImage =` url(./images/desktop_${random}.jpg)`
    </script>
```
#### 操作元素属性样式
```
//追加一个类
元素.classList.add('类名')
//删除一个类
元素.classList.remove('类名')
//切换一个类 有就删除 没有就添加
元素.classList.toggle('类名')
```

#### 轮播图随机版
```html

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>轮播图点击切换</title>
  <style>
    * {
      box-sizing: border-box;
    }

    .slider {
      width: 560px;
      height: 400px;
      overflow: hidden;
    }

    .slider-wrapper {
      width: 100%;
      height: 320px;
    }

    .slider-wrapper img {
      width: 100%;
      height: 100%;
      display: block;
    }

    .slider-footer {
      height: 80px;
      background-color: rgb(100, 67, 68);
      padding: 12px 12px 0 12px;
      position: relative;
    }

    .slider-footer .toggle {
      position: absolute;
      right: 0;
      top: 12px;
      display: flex;
    }

    .slider-footer .toggle button {
      margin-right: 12px;
      width: 28px;
      height: 28px;
      appearance: none;
      border: none;
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      border-radius: 4px;
      cursor: pointer;
    }

    .slider-footer .toggle button:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .slider-footer p {
      margin: 0;
      color: #fff;
      font-size: 18px;
      margin-bottom: 10px;
    }

    .slider-indicator {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      align-items: center;
    }

    .slider-indicator li {
      width: 8px;
      height: 8px;
      margin: 4px;
      border-radius: 50%;
      background: #fff;
      opacity: 0.4;
      cursor: pointer;
    }

    .slider-indicator li.active {
      width: 12px;
      height: 12px;
      opacity: 1;
    }
  </style>
</head>

<body>
  <div class="slider">
    <div class="slider-wrapper">
      <img src="./images/slider01.jpg" alt="" />
    </div>
    <div class="slider-footer">
      <p>对人类来说会不会太超前了？</p>
      <ul class="slider-indicator">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div class="toggle">
        <button class="prev">&lt;</button>
        <button class="next">&gt;</button>
      </div>
    </div>
  </div>
  <script>
    // 1. 初始数据
    const sliderData = [
      { url: './images/slider01.jpg', title: '对人类来说会不会太超前了？', color: 'rgb(100, 67, 68)' },
      { url: './images/slider02.jpg', title: '开启剑与雪的黑暗传说！', color: 'rgb(43, 35, 26)' },
      { url: './images/slider03.jpg', title: '真正的jo厨出现了！', color: 'rgb(36, 31, 33)' },
      { url: './images/slider04.jpg', title: '李玉刚：让世界通过B站看到东方大国文化', color: 'rgb(139, 98, 66)' },
      { url: './images/slider05.jpg', title: '快来分享你的寒假日常吧~', color: 'rgb(67, 90, 92)' },
      { url: './images/slider06.jpg', title: '哔哩哔哩小年YEAH', color: 'rgb(166, 131, 143)' },
      { url: './images/slider07.jpg', title: '一站式解决你的电脑配置问题！！！', color: 'rgb(53, 29, 25)' },
      { url: './images/slider08.jpg', title: '谁不想和小猫咪贴贴呢！', color: 'rgb(99, 72, 114)' },
    ]
 
 //需要一个随机数
const random = parseInt(Math.random()* sliderData.length)
//把对应的数据渲染到标签里面
//获取图片
const img = document.querySelector('.slider-wrapper img')
//修改图片路径 = 对象.url
img.src = sliderData[random].url
//把P里面的文字更换
//获取P
const p = document.querySelector('.slider-footer p')
//修改P
p.innerHTML = sliderData[random].title

//获取背景颜色
const footer = document.querySelector('.slider-footer ')
footer.style.backgroundColor = sliderData[random].color
//小圆点
const li = document.querySelector(`.slider-indicator li:nth-child(${random +1 })`)
// 让当前这个小li 添加active这个类
li.classList.add('active')

  </script>
</body>

</html>
```

#### 间歇函数 setInterval(函数,间隔时间)
```js
<script>
     function fn(){
       console.log('一秒执行一次');
     }
     let n = setInterval(fn,1000)

    console.log(n);//返回的是一个id

    //关闭定时器
    clearInterval(n)
</script>
```

#### 阅读注册协议
```js

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <textarea name="" id="" cols="30" rows="10">
        用户注册协议
        欢迎注册成为京东用户！在您注册过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体或下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）。
        【请您注意】如果您不同意以下协议全部或任何条款约定，请您停止注册。您停止注册后将仅可以浏览我们的商品信息但无法享受我们的产品或服务。如您按照注册流程提示填写信息，阅读并点击同意上述协议且完成全部注册流程后，即表示您已充分阅读、理解并接受协议的全部内容，并表明您同意我们可以依据协议内容来处理您的个人信息，并同意我们将您的订单信息共享给为完成此订单所必须的第三方合作方（详情查看
    </textarea>
    <br>
    <button class="btn" disabled>我已经阅读用户协议(5)</button>

    <script>
        //获取元素
        const btn = document.querySelector('.btn')
        //倒计时
        let i = 5
        //开启定时器
        let n = setInterval(function(){
            i--
            btn .innerHTML = `我已经阅读用户协议(${i})`
            if(i === 0){
                clearInterval(n)//关闭显示器
                btn.disabled = false
                btn.innerHTML = '同意'
            }
        }, 1000);
    </script>
</body>

</html>
```
#### 轮播图定时器版
```html css js

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>轮播图点击切换</title>
  <style>
    * {
      box-sizing: border-box;
    }

    .slider {
      width: 560px;
      height: 400px;
      overflow: hidden;
    }

    .slider-wrapper {
      width: 100%;
      height: 320px;
    }

    .slider-wrapper img {
      width: 100%;
      height: 100%;
      display: block;
    }

    .slider-footer {
      height: 80px;
      background-color: rgb(100, 67, 68);
      padding: 12px 12px 0 12px;
      position: relative;
    }

    .slider-footer .toggle {
      position: absolute;
      right: 0;
      top: 12px;
      display: flex;
    }

    .slider-footer .toggle button {
      margin-right: 12px;
      width: 28px;
      height: 28px;
      appearance: none;
      border: none;
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      border-radius: 4px;
      cursor: pointer;
    }

    .slider-footer .toggle button:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .slider-footer p {
      margin: 0;
      color: #fff;
      font-size: 18px;
      margin-bottom: 10px;
    }

    .slider-indicator {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      align-items: center;
    }

    .slider-indicator li {
      width: 8px;
      height: 8px;
      margin: 4px;
      border-radius: 50%;
      background: #fff;
      opacity: 0.4;
      cursor: pointer;
    }

    .slider-indicator li.active {
      width: 12px;
      height: 12px;
      opacity: 1;
    }
  </style>
</head>

<body>
  <div class="slider">
    <div class="slider-wrapper">
      <img src="./images/slider01.jpg" alt="" />
    </div>
    <div class="slider-footer">
      <p>对人类来说会不会太超前了？</p>
      <ul class="slider-indicator">
        <li class="active"></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div class="toggle">
        <button class="prev">&lt;</button>
        <button class="next">&gt;</button>
      </div>
    </div>
  </div>
  <script>
    // 1. 初始数据
    const sliderData = [
      { url: './images/slider01.jpg', title: '对人类来说会不会太超前了？', color: 'rgb(100, 67, 68)' },
      { url: './images/slider02.jpg', title: '开启剑与雪的黑暗传说！', color: 'rgb(43, 35, 26)' },
      { url: './images/slider03.jpg', title: '真正的jo厨出现了！', color: 'rgb(36, 31, 33)' },
      { url: './images/slider04.jpg', title: '李玉刚：让世界通过B站看到东方大国文化', color: 'rgb(139, 98, 66)' },
      { url: './images/slider05.jpg', title: '快来分享你的寒假日常吧~', color: 'rgb(67, 90, 92)' },
      { url: './images/slider06.jpg', title: '哔哩哔哩小年YEAH', color: 'rgb(166, 131, 143)' },
      { url: './images/slider07.jpg', title: '一站式解决你的电脑配置问题！！！', color: 'rgb(53, 29, 25)' },
      { url: './images/slider08.jpg', title: '谁不想和小猫咪贴贴呢！', color: 'rgb(99, 72, 114)' },
    ]
 
 //获取元素
 const img = document.querySelector('.slider-wrapper img')
 const p = document.querySelector('.slider-footer p')
 const color = document.querySelector('.slider-footer')
 let i = 0 //信号量 控制图片的张数
 //开启定时器
 let n = setInterval(function(){
     i++
     //无缝衔接位置
     if(i >= sliderData.length ){
         i = 0
     }
    //更换图片路径
    img.src = sliderData[i].url
    //把字写到P里面
    p.innerHTML = sliderData[i].title
    //背景颜色
    color.style.backgroundColor = sliderData[i].color
    //小圆点
    //先删除以前的active
    document.querySelector('.slider-indicator .active').classList.remove('active')
    //只让当前li添加active
    document.querySelector(`.slider-indicator li:nth-child(${i + 1})`).classList.add('active')

 },1000)
  </script>
</body>

</html>
```
#### 随机点名/问答案例
```js

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        h2 {
            text-align: center;
        }

        .box {
            width: 600px;
            margin: 50px auto;
            display: flex;
            font-size: 25px;
            line-height: 40px;
        }

        .qs {

            width: 450px;
            height: 40px;
            color: red;

        }

        .btns {
            text-align: center;
        }

        .btns button {
            width: 120px;
            height: 35px;
            margin: 0 50px;
            cursor: pointer;
        }
    </style>
</head>

<body>
    <h2>随机点名</h2>
    <div class="box">
        <span>名字是：</span>
        <div class="qs">准备好了吗</div>
    </div>
    <div class="btns">
        <button class="start">开始</button>
        <button class="end">结束</button>
    </div>

    <script>
        // 数据数组
        const arr = ['马超', '黄忠', '赵云', '关羽', '张飞']
        //定时器的全局变量
        let timerId = 0
        //随机号要全局变量
        let random = 0
        //业务1.开始按钮块
        const qs = document.querySelector('.qs')
        //1.1获取开始按钮对象
        const start = document.querySelector('.start')
        //1.2 添加点击事件
        start.addEventListener('click', function(){
          timerId = setInterval(function(){
                //随机数
                 random = parseInt(Math.random() * arr.length)
                qs.innerHTML = arr[random]
            },100)

            //如果数组里只有一个值 则不需要抽取
            if(arr.length === 1){
               start.disabled = true
               end.disabled = true
            }
        })

      //业务1.关闭按钮块
      const end = document.querySelector('.end')
      end.addEventListener('click',function(){
          clearInterval(timerId)
          //结束了，可以删除掉当前抽取的那个数组元素
          arr.splice(random, 1)
          console.log(arr);
          
      })
    </script>
</body>

</html>
```
#### 轮播图点击切换 完整版
```js

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>轮播图点击切换</title>
  <style>
    * {
      box-sizing: border-box;
    }

    .slider {
      width: 560px;
      height: 400px;
      overflow: hidden;
    }

    .slider-wrapper {
      width: 100%;
      height: 320px;
    }

    .slider-wrapper img {
      width: 100%;
      height: 100%;
      display: block;
    }

    .slider-footer {
      height: 80px;
      background-color: rgb(100, 67, 68);
      padding: 12px 12px 0 12px;
      position: relative;
    }

    .slider-footer .toggle {
      position: absolute;
      right: 0;
      top: 12px;
      display: flex;
    }

    .slider-footer .toggle button {
      margin-right: 12px;
      width: 28px;
      height: 28px;
      appearance: none;
      border: none;
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      border-radius: 4px;
      cursor: pointer;
    }

    .slider-footer .toggle button:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .slider-footer p {
      margin: 0;
      color: #fff;
      font-size: 18px;
      margin-bottom: 10px;
    }

    .slider-indicator {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      align-items: center;
    }

    .slider-indicator li {
      width: 8px;
      height: 8px;
      margin: 4px;
      border-radius: 50%;
      background: #fff;
      opacity: 0.4;
      cursor: pointer;
    }

    .slider-indicator li.active {
      width: 12px;
      height: 12px;
      opacity: 1;
    }
  </style>
</head>

<body>
  <div class="slider">
    <div class="slider-wrapper">
      <img src="./images/slider01.jpg" alt="" />
    </div>
    <div class="slider-footer">
      <p>对人类来说会不会太超前了？</p>
      <ul class="slider-indicator">
        <li class="active"></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div class="toggle">
        <button class="prev">&lt;</button>
        <button class="next">&gt;</button>
      </div>
    </div>
  </div>
  <script>
    // 1. 初始数据
    const sliderData = [
      { url: './images/slider01.jpg', title: '对人类来说会不会太超前了？', color: 'rgb(100, 67, 68)' },
      { url: './images/slider02.jpg', title: '开启剑与雪的黑暗传说！', color: 'rgb(43, 35, 26)' },
      { url: './images/slider03.jpg', title: '真正的jo厨出现了！', color: 'rgb(36, 31, 33)' },
      { url: './images/slider04.jpg', title: '李玉刚：让世界通过B站看到东方大国文化', color: 'rgb(139, 98, 66)' },
      { url: './images/slider05.jpg', title: '快来分享你的寒假日常吧~', color: 'rgb(67, 90, 92)' },
      { url: './images/slider06.jpg', title: '哔哩哔哩小年YEAH', color: 'rgb(166, 131, 143)' },
      { url: './images/slider07.jpg', title: '一站式解决你的电脑配置问题！！！', color: 'rgb(53, 29, 25)' },
      { url: './images/slider08.jpg', title: '谁不想和小猫咪贴贴呢！', color: 'rgb(99, 72, 114)' },
    ]
    //获取元素
    const img = document.querySelector('.slider-wrapper img')
    const p = document.querySelector('.slider-footer p')
    const color = document.querySelector('.slider-footer')
//按钮业务
    //获取右侧按钮
    const next = document.querySelector('.next')
    let i = 0
    //注册点击事件
    next.addEventListener('click',function(){
      i++
      //判断条件 大于8 恢复0
      i = i >= sliderData.length ? 0 : i
      //调用函数
      common()
    })

    //获取左侧按钮
    const prev = document.querySelector('.prev')
    //注册点击事件
    prev.addEventListener('click',function(){
      i--
      //判断条件 小于0 跑到最后一张
      i = i < 0 ? sliderData.length-1 : i
      //调用函数
      common()
    })

    //声明一个渲染的函数作为复用
      function common(){
      img.src = sliderData[i].url
      p.innerHTML = sliderData[i].title
      color.style.background = sliderData[i].color

      document.querySelector('.slider-indicator .active').classList.remove('active')
      document.querySelector(`.slider-indicator li:nth-child(${i+1})`).classList.add('active')
      }

      //自动播放板块
   let timerId = setInterval(function(){
          //利用JS自动调用点击事件
          next.click()
      },1000)

     //鼠标经过大盒子，停止定时器
     const slider = document.querySelector('.slider')
     //注册事件
     slider.addEventListener('mouseenter',function(){
         //停止定时器
         clearInterval(timerId)
     })

     //鼠标离开大盒子，开启定时器
     //注册事件
     slider.addEventListener('mouseleave',function(){
         //开启定时器
         clearInterval(timerId)
         timerId = setInterval(function(){
          //利用JS自动调用点击事件
          next.click()
      },1000)
     })

  </script>
</body>

</html>
```