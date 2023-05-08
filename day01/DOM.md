## DOM
### 通过 getElementById 方法就可以根据 id 获取到一个 DOM 节点，所有 DOM 节点都具有这个方法
- 不知道某个元素的父级对象 用 document.getElementById 来获取
- 修改dom节点的innerText属性就可以改掉文案
```html js
 <div>
        <p>我是一段文本</p>
        <a id="link" href="http://www.imooc.com/">我是一个超链接</a>
      <div>
      <script>
        var aEle = document.getElementById('link');
      
        aEle.innerText = '前往慕课网';
      </script>
```
###  element.getElementByName 是通过元素的 name 属性进行查找
```js html
 <form>
          <div>
              <label>
                  <input type="checkbox" name="skill" checked="checked" value="js">js
              </label>

              <label>
                  <input type="checkbox" name="skill" checked="checked" value="c++">c++
              </label>

              <label>
                  <input type="checkbox" name="skill" value="java">java
              </label>
          </div>
      </form>
      <div id="result"></div>
      <script>
          var checkboxes=document.getElementsByName('skill');
          var skills=[];
          checkboxes.forEach(function(checkbox){
              if(checkbox.getAttribute('checked')){
                  skills.push(checkbox.value);
              }
          });
          document.getElementById('result').innerHTML='选中的技能:'+skills.join('、');
      </script>
```
### element.getElementsByTagName 返回带有指定标签名的对象集合
```js
 <div>
          <p>我是第一个段落。</p>
          <p>我是第二个段落。</p>
          <p>我是第三个段落。</p>
      </div>
      <div id="result" style="color: #4caf50;"></div>
      <script>
          var pList=document.getElementsByTagName('p');
          var res=[];
          var i,len;
          for(i=0,len=pList.length;i<len;i++){
              res.push(pList[i].innerText);
          }
        document.getElementById('result').innerHTML='所有p标签的内容:<br>'+res.join('<br>');
      </script>
```
### element.getElementsByClassName 返回一个包含了所有指定类名的子元素的类数组对象
```js
 <div>
          <div class="odd">1</div>
          <div class="even">2</div>
          <div class="odd">3</div>
          <div class="even">4</div>
          <div class="odd">5</div>
          <div class="even">6</div>
      </div>
      <div id="result"></div>
      <script>
          var odd=document.getElementsByClassName('odd');
          var res=[];
          var i,len;
          for(i=0,len=odd.length;i<len;i++){
              res.push(odd[i].innerText);
          }
          var resultElement=document.getElementById('result');
          resultElement.innerHTML='所有奇数:<br>'+res.join('<br>');
```
### element.querySelector  element.querySelectorAll返回的也是一个 NodeList
```js
<ul>
          <li>我是列表1</li>
          <li>我是列表2</li>
          <li>我是列表3</li>
          <li>我是列表4</li>
      </ul>
      <button class="change">变！</button>
      <script>
          var lis=document.querySelectorAll('li');
          var btn=document.querySelector('.change');

          btn.addEventListener('click',function(){
              lis.forEach(function(li,index){
                  li.innerText=index;
              });
          });
      </script>
 ```
 ### 修改 class 属性
 ```html css js
  <style>
        .show{
            display: block;
        }
        .hidden{
            display: none;
        }
    </style>
<body>
      <p class="tip show">早起,别熬夜</p>
      <button class="toggle">切换</button>
      <script>
          var toggleBtn=document.querySelector('.toggle');
          var tipEle=document.querySelector('.tip');
          toggleBtn.addEventListener('click',function(){
              var className=tipEle.className;
              if(className.indexOf('show')>-1){
                  tipEle.className='tip hidden';
                  return;
              }
              tipEle.className='tip show';
          });
      </script>
 </body>
 ```
###  设置 / 获取其他属性
- getAttribute 方法就可以获得某个属性的值
- setAttribute 用于给属性设置属性值
- removeAttribute 则是将属性从元素上移除
```html js
<label>
          <input type="checkbox" class="checkbox">
          啦啦啦
      </label>
      <div style="margin-top: 16px;">
          <button class="toggle">切换！</button>
      </div>
      
      <script>
          var checkbox=document.querySelector('.checkbox');
          var toggleBtn=document.querySelector('.toggle');

          toggleBtn.onclick=function(){
              var checked=checkbox.getAttribute('checked');

              if(checked){
                  checkbox.removeAttribute('checked','');
              }else{
                  checkbox.setAttribute('checked','checked');
              }
          };
      </script>
```
### 将集合转化为数组 slice 方法
- 使用 [].slice.call(类数组) 或 Array.prototype.slice.call(类数组) 即可将一个类数组转化为数组
```html js
<div>
          <ul>
              <li>i</li>
              <li>ii</li>
              <li>iii</li>
          </ul>
      </div>
      <script>
          var lisColl=document.querySelectorAll('li');
          var lisArray1=[].slice.call(lisColl);
          var lisArray2=Array.prototype.slice.call(lisColl);

          var map=function(li){
              return li.innerText;
          };
          console.log(lisArray1.map(map).join(' '));
          console.log(lisArray2.map(map).join(' '));
      </script>
```

- 使用 Array.from 方法 可以将一个类数组转化为数组
```js
 <script>
      var arrayLike={
          0:'9',
          1:'9',
          2:'6',
          3:'bye!',
          length:4,
      };

      var str=Array.from(arrayLike).join('');
      console.log(str);
    </script>
```

### 将数组的原型方法挂载到目标对象的原型上
```html js
<div>
          <ul>
              <li>i</li>
              <li>like</li>
              <li>imooc</li>
          </ul>
      </div>

      <script>
          NodeList.prototype.join=Array.prototype.join;// 提供 join 方法
          var lisColl=document.querySelectorAll('li');
          lisColl.__proto__.map = Array.prototype.map;// 提供 map 方法
          var map=function(li){
              return li.innerText;
          };
          console.log(lisColl.map(map).join(' '));
      </script>
```

### 使用 for 循环遍历集合，将每一项放入新数组
```html js
    <div>
        <ul>
            <li>i</li>
            <li>like</li>
            <li>imooc</li>
        </ul>
    </div>

    <script>
        var lisColl=document.querySelectorAll('li');
        var lis=[];

        var i,len;
        for(i=0,len=lisColl.length;i<len;i++){
            lis.push(lisColl[i]);
        }
        var str=lis
         .map(function(li){
             return li.innerText
         })
         .join(' ');

         console.log(str);
     </script>
```
### ... 即扩展运算符
```html js
 <div>
            <ul>
                <li>i</li>
                <li>like</li>
                <li>imooc</li>
            </ul>
        </div>
        <script>
            var lisColl=document.querySelectorAll('li');
            var arr=[...lisColl];

            console.log(Array.isArray(lisColl));// 输出：false
            console.log(Array.isArray(arr));// 输出：true
        </script>
```
### null 判断
- 方法一
```js
  <script>
            var el=document.querySelector('#dfsafds');
            if(el){
                el.innerHTML='<p>我写的代码不会报错!</p>';
            }else{
                console.log('节点还没渲染');
            }
        </script>
```
- 方法二  try ... catch ...
```js
var el = document.querySelector('#dfsafds');

try {
  el.innerHTML = '<p>我写的代码从来不会报错！</p>';
} catch (err) {
  console.error(err);
  console.log('节点还没渲染出来');
}

```
## DOM与事件
```html css js
 <style>
        .change-bg{
            border:1px solid black;
            height: 40px;
            width: 120px;
            border-radius: 2px;
            margin-top: 16px;
            margin-left: 50%;
            outline: none;
            cursor: pointer;
        }
        .change-bg:active{
            background: #efefef;
        }
        .box{
            width: 120px;
            height: 120px;
            margin-left: 50%;
            background: #4caf50;
            border-radius: 60px;
            
        }
    </style>

    <div class="box"></div>

    <button class="change-bg">戳这里改变背景颜色</button>

<script>
    var boxEle=document.querySelector('.box');
    var btnEle=document.querySelector('.change-bg');

    function getColor(){
        return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
    }
    btnEle.onclick=function(){
        boxEle.style.backgroundColor=getColor();
    };
</script>
```
### DOM事件绑定
- 设置事件处理器属性
- 如果需要清除事件，可以重新将属性重新设置为 null
- 需要去除事件，可以使用 removeEventListener 方法
```html css js
<style>
        .btn{
            border: 1px solid #4caf50;
            font-size: 22px;
            padding: 8px 12px;
            color:#4caf50;
            outline: none;
        }
        .btn:active{
            background: #eee;
        }
        .p{
            font-size: 22px;
        }
    </style>
</head>
<body>
    <button class="btn">我是一个可以改变一切的按钮</button>
    <p>1</p>
    <script>
        var btn=document.querySelector('.btn');

        var p= document.querySelector('p');
        var total=1;

        btn.onclick=function(){
            var text=btn.innerText;
            btn.innerText=text.replace('一切','世界');
            
            p.innerText=++total;
            if(total>=5){
                btn.onclick=null;
            }
        };
    </script>
</body>
```
```html css js
 <style>
        .btn{
            border: 1px solid #4caf50;
            font-size: 22px;
            padding: 8px 12px;
            color:#4caf50;
            outline: none;
        }
        .btn:active{
            background: #eee;
        }
    </style>
     <button class="btn">按钮</button>
    <script>
        var btn=document.querySelector('.btn');
        var total=1;
        function fn(){
            btn.innerText=++total;
            if(total>5){
                btn.removeEventListener('click',fn);
            }
        }
        btn.addEventListener('click',fn);
    </script>

```

- 使用 element.addEventListener 绑定事件
```html css js
 <style>
        .btn{
            border: 1px solid #4caf50;
            font-size: 22px;
            padding: 8px 12px;
            color:#4caf50;
            outline: none;
        }
        .btn:active{
            background: #eee;
        }
        input{
            padding: 10px 12px;
            font-size: 14px;
            outline: none;
        }
        .p{
            font-size: 22px;
        }
    </style>
     <input type="text">
    <button class="btn">
        按钮
    </button>
    <p>1</p>
    <script>
        var btn=document.querySelector('.btn');
        var input=document.querySelector('input');
        var p=document.querySelector('p');
        var total=1;

        btn.addEventListener('click',function(){
            input.value=input.value.split('').reverse().join('');//数据可翻转
            btn.value=input.value;
            p.innerText=input.value;
        });
        input.addEventListener('keyup',function(){
            btn.innerText=input.value;
        });
    </script>
```
- 使用 addEventListener 可以绑定多个事件处理器
```html css js
<style>
  .btn {
    border: 1px solid #4caf50;
    font-size: 14px;
    padding: 8px 12px;
    color: #4caf50;
    outline: none;
  }
  .btn:active {
    background: #eee;
  }
</style>

<button class="btn">
  按钮
</button>
<p></p>

<script>
  var btn = document.querySelector('.btn');
  var p = document.querySelector('p');
  var total = 1;

  btn.addEventListener('click', function() {
    btn.innerText = ++total;
  });

  btn.addEventListener('click', function() {
    p.innerText = total;
  });
</script>
```
### DOM时间对象
- 按下键和松开键 对应的事件就是 onkeydown 和 onkeyup 
- 如果使用二级 DOM 事件，则可以不加 on 前缀
```html css js
<style>
  .btn {
    border: 1px solid #4caf50;
    font-size: 14px;
    padding: 8px 12px;
    color: #4caf50;
    outline: none;
  }
  .btn:active {
    background: #eee;
  }
</style>

<button class="btn">
  按钮
</button>
<p></p>

<script>
  var btn = document.querySelector('.btn');
  var p = document.querySelector('p');
  var total = 1;

  btn.addEventListener('click', function() {
    btn.innerText = ++total;
  });

  btn.addEventListener('click', function() {
    p.innerText = total;
  });
</script>
```
-  stopPropagation 调用此方法就会阻止事件的冒泡
-  使用场景大多为某个父元素和元素本身绑定了相同事件时
```html css js
<style>
        .list{
            width: 300px;
            margin: 0 auto;
        }
        .list .item{
            width: 100%;
            border: 1px dashed #4caf50;
            border-bottom: 0;
            border-radius: 2px;
            padding: 16px;
        }
        .list .item:last-child{
            border-bottom: 1px dashed #4caf50;
        }
        .list .item button{
            border-radius: 2px;
            font-size: 14px;
            color: #666;
            outline: none;
        }
        .list .item button:active{
            background: #eee;
        }
    </style>

<div class="list">
    <div class="item">
        <p>一句简单的介绍</p>
        <button>点击我删除这条</button>
    </div>
    <div class="item">
        <p>两句简单的介绍</p>
        <button>点击我删除这条</button>
    </div>
</div>
<script>
    var items=document.querySelectorAll('.list .item');
    var btns=document.querySelectorAll('.list .item button');

    items.forEach(function(item){
        item.addEventListener('click',function(){
            alert('马上进入到详情');
        });
    });

    btns.forEach(function(btn){
        btn.addEventListener('click',function(e){
            //阻止冒泡
            e.stopPropagation();
            var parent = btn.parentNode;
            parent.parentNode.removeChild(parent);
        });
    });
</script>
```
- preventDefault 取消事件的默认行为
```js
<a href="https://imooc.com">前往慕课网！</a>
<script>
    var aTag=document.querySelector('a');
    aTag.onclick=function(e){
        e.preventDefault();
        alert('跳转被终止');
    };
</script>
```
### DOM事件流阶段   捕获阶段 目标阶段  冒泡阶段
- 事件是点击到的最深层次的节点开始向上执行的
```html css js

    <style>
        .box{
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .size-100{
            width: 100px;
            height: 100px;
            background: #4caf50;
        }
        .size-200{
            width: 200px;
            height: 200px;
            background: chocolate;
        }
        .size-300{
            width: 300px;
            height: 300px;
            background: wheat;
        }
    </style>

    <div class="box size-300">
    <div class="box size-200">
     <div class="box size-100">
     </div>
    </div>
</div>
<div class="result"></div>
<script>
    var boxes=document.querySelectorAll('.box');
    var result=document.querySelector('.result');

    boxes.forEach(function(box){
        box.addEventListener('click',function(){
            var el=document.createElement('p');
            el.innerText='现在触发点击事件的是'+this.className;
            result.appendChild(el);
        });
    });
</script>
```
- addEventListener 的第三个参数 
- 传递 false 则事件会在冒泡阶段触发，传递 true 则会在捕获阶段触发
```html css js
<style>
        .box{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .ele1{
            background: wheat;
            width: 200px;
            height: 200px;
        }
        .ele2{
            background: yellowgreen;
            width: 100px;
            height: 100px;
        }
    </style>

    <div class="box ele1">
    <div class="box ele2"></div>
</div>
<div class="result"></div>
<script>
    var ele1=document.querySelector('.ele1');
    var ele2=document.querySelector('.ele2');
    var result=document.querySelector('.result');

    function getElement(content){
        var el=document.createElement('p');
        el.innerText=content;
        return el;
    }
    ele1.addEventListener('click',function(){
        result.appendChild(getElement('我是元素ele1'));
    },true); //true 从浅到深  false 从深到浅
    ele2.addEventListener('click',function(){
        result.appendChild(getElement('我是元素ele2'));
    });
</script>
```
### DOM事件优化
 主要有两个目的
- 减少不必要的 HTTP 请求
- 减少本机性能的消耗
```html css js
<style>
        .list .item{
            display: flex;
            justify-content: space-between;
            border-bottom: 1px dashed #4caf50;
            padding: 8px 0;
        }
        .list .item .caption{
            font-weight: 700;
        }
        .list .item .operates .delete{
            border: 1px solid rgb(177,107,107);
            color: rgb(207,72,72);
            outline: none;
            cursor: pointer;
        }
    </style>
    <div class="list">
        <div class="item">
            <div class="content caption">
                今天要做的事情
            </div>
            <div class="operates caption">
                操作
            </div>
        </div>

        <div class="item">
            <div class="content">
                吃火锅
            </div>
            <div class="operates">
                <button class="delete">删除</button>
            </div>
        </div>

        <div class="item">
            <div class="content">
                聊天
            </div>
            <div class="operates">
                <button class="delete">删除</button>
            </div>
        </div>
    </div>

    <script>
        var listEle=document.querySelector('.list');
        var deleteEle=document.querySelectorAll('.delete');

        deleteEle.forEach(function(el){
            el.addEventListener('click',function(){
                console.log('开始删除...');

                el.setAttribute('disabled','disabled');
                el.style.color='rgb(226,174,174)';
                el.style.borderColor='rgb(226,174,174)';
                el.style.cursor='wait';
                el.innerHTML='处理中...';

                setTimeout(function(){
                    var itemEl=el.parentNode.parentNode;
                    listEle.removeChild(itemEl);
                    console.log('删除成功');
                },1500);
            });
        });
    </script>
```
- 事件委托(代理)
- 子节点的事件交给父节点来执行，一旦父节点发现子节点触发了对应的事件，就执行对应的事件处理器
```html css js
<style>
        .list .item{
            display: flex;
            justify-content: space-between;
            border-bottom: 1px dashed #4caf50;
            padding: 8px 0;
        }
        .list .item .caption{
            font-weight: 700;
        }
        .list .item .operates .delete{
            border: 1px solid rgb(177,107,107);
            color: rgb(207,72,72);
            outline: none;
            cursor: pointer;
        }
        .add{
            border: 1px dashed #4caf50;
            font-size: 14px;
            padding: 4px 8px;
            margin-top: 22px;
            outline: none;
            cursor: pointer;
        }
        .add:active{
            color: white;
            background: #4caf50;
        }
    </style>
     <div class="list">
        <div class="item">
            <div class="content caption">
                今天要做的事情
            </div>
            <div class="operates caption">
                操作
            </div>
        </div>

        <div class="item">
            <div class="content">
                吃火锅
            </div>
            <div class="operates">
                <button class="delete">删除</button>
            </div>
        </div>

        <div class="item">
            <div class="content">
                聊天
            </div>
            <div class="operates">
                <button class="delete">删除</button>
            </div>
        </div>
    </div>

    <button class="add">增加一项</button>
    <script>
        var listEle=document.querySelector('.list');
        listEle.addEventListener('click',function(e){
            if(e.target.className==='delete'){
                var el=e.target;

                console.log('开始删除...');

                el.setAttribute('disabled','disabled');
                el.style.color='rgb(226,174,174)';
                el.style.borderColor='rgb(226,174,174)';
                el.style.cursor='wait';
                el.innerHTML='处理中...';

                setTimeout(function(){
                    var itemEl=el.parentNode.parentNode;
                    listEle.removeChild(itemEl);
                    console.log('删除成功');
                },1500);
            }
        });

        document.querySelector('.add').addEventListener('click',function(){
            var el=document.createElement('div');

            el.className='item';

            el.innerHTML=[
                '<div class="content">',
                '学习',
                '</div>',
                '<div class="operates">',
                '<button class="delete">删除</button>',
                '</div>',
            ].join('');
            listEle.appendChild(el);
        });
    </script>
```
- 事件节流 用于控制事件触发的最小间隔
```html css js
<style>
  .outer { 
    position: fixed; 
    top: 0; 
    left: 0; 
    right: 0; 
    bottom: 0; 
    background:rgb(0, 0, 0); }
  .outer .text { 
    position: absolute;
     top: 50%; 
     left: 50%;
      transform: translate(-50%, -50%); 
      color: white;
       font-size: 100px; 
       text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff,
                    0 0 20px #FF1177, 0 0 35px #FF1177, 0 0 40px #FF1177, 0 0 50px #FF1177, 0 0 75px #FF1177; }
</style>

<div class="outer">
  <div class="text"></div>
</div>

<script>
  var text = document.querySelector('.text');
  var timer = false;

  var resize = function() {
    if (timer) return; // 判断是不是上一次事件执行完300毫秒内

    var height = window.innerHeight;
    var width = window.innerWidth;

    text.innerText = width + 'x' + height;

    timer = setTimeout(function () {
      timer = null;
    }, 300);
  };

  window.addEventListener('resize', resize);

  resize();
</script>
```
- 事件防抖
```html js css
<style>
        input{
            border:1px solid #eee;
            padding: 4px 8px;
            min-width: 300px;
            font-size: 14px;
            height: 40px;
            display: block;
            margin: 0 auto;
            outline: none;
        }
        .result{
            text-align: center;
        }
    </style>
   <div>
    <input type="text">
    <div class="result"></div>
</div>
     <script>
         var input=document.querySelector('input');
         var result=document.querySelector('.result');
         var timer=null;
         input.addEventListener('input',function(e){
             clearTimeout(timer);
             timer=setTimeout(function(){
                var val=e.target.value;
                result.innerText='联想内容:'+val;
             },300);
         });
     </script>
```
- 异步加载的事件处理器 方案目前使用的比较少
``` js
// 这是一份伪代码

const el = document.querySelector('.delete');

el.addEventListener('click', async () => {
  try {
    const event = await import('./event/delete.js');

    // ...
  } catch (e) {
    // ...
  }
});
```
### DOM自定义事件
- 使用 Event 构造函数
- 使用 CustomEvent 构造函数
- 其主要的区别在参数和工作环境上，CustomEvent 是可以在 WebWorker 中被使用的，而 Event 不行
```html css js
<style>
       .btn{
           border: 1px solid #4caf50;
           padding: 8px 12px;
           min-width: 200px;
           color: #4caf50;
           background: white;
           outline: none;
       }
       .btn:active{
           background: #4caf50;
           color: white;
       }
   </style>
 <div>
        <button class="btn">点击我</button>
    </div>
    <script>
        var afterClick=new Event('afterclick');
        // var afterClick = new CustomEvent('afterclick');

        var btnEle=document.querySelector('.btn');
        btnEle.addEventListener('afterclick',function(){
            alert('我是点击事件执行完后做的事情');
            // alert('我是点击事件执行完后做的事情，我被改成了 CustomEvent');
        });
        btnEle.onclick=function(){
            alert('我被点击了');
            this.dispatchEvent(afterClick);
        };
    </script>
```
- 键盘的点击事件
```html css js
 <style>
       input {width: 200px;
       padding: 8px;
       font-size: 16px;
       outline: none;
       border: 1px dashed #4caf50;}
       input:focus {border: 1px solid #4caf50;}
   </style>
   <div>
         <input type="text">
     </div>
    
     <script>
         var inputEle=document.querySelector('input');
         var onKeyClick=function(value,keyCode){
             alert('现在输入框内容是：'+value+',触发的键是：'+keyCode);
         };
         inputEle.addEventListener('keyup',(e)=>{
             console.log('键盘按键弹起了');
             onKeyClick(e.target.value,e.keyCode);
         });
     </script>
```

## 表单校验
```html css js
<style>
    h3{
        margin-top: 0; 
        color: #4caf50;
    }
    .login{
        width: 300px;
        padding: 32px;
        box-shadow: 2px 2px 10px rgba(0,0,0,.1);
        position: fixed;
        top: 40%;
        left:50%;
        transform: translate(-50%,-50%); 
        }
    .form-item{
        display: flex;
        margin-bottom: 16px;
        border-bottom: 1px solid #ccc;
    }
    .form-item .title{
        width: 70px;
        color: #666;
        font-size: 14px;
    }
    .form-item .content{
        flex: 1;
    }
    .form-item .content input{
        width: 100%;
        border: 0 none;
        padding: 2px 8px;
        outline: none;
        height: 32px;
    }
    .login-btn{
        width: 100%;
        border: 0 none;
        background-color: #4caf50;
        color:white;
        margin-top: 16px;
        outline: none;
        height: 32px;
    }
    .login-btn:active{
        background-color: #2da050;
    }
</style>

 <div class="login">
        <h3>登录</h3>
        <label class="form-item">
            <div class="title">用户名</div>
            <div class="content">
                <input autocomplete="off" id="account" class="account" name="account" type="text">
            </div>
        </label>

        <label class="form-item">
            <div class="title">密码</div>
            <div class="content">
                <input autocomplete="off" name="pwd" type="password">
            </div>
        </label>
        <div>
            <button class="login-btn" type="button">登录</button>
        </div>
    </div>

    <script>
        var loginBtn=document.querySelector('.login-btn');
        var pwdEle=document.querySelector('[name="pwd"]');

        function login(cb){
            //假如登录花了1秒
            setTimeout(function(){
                alert('登录成功');
                cb&&cb();
            },1000);
        }
        loginBtn.addEventListener('click',function(){
            var pwd=pwdEle.value;
            if(pwd.length<6||pwd.length>16){
                alert('密码长度 6-16');
                return;
            }
            login(function(){
              //3种跳转方式
                window.location.href='https://imooc.com';
                 // window.location = 'http://www.imooc.com/';
                // window.location.assign('http://www.imooc.com/');
            });
        });
    </script>
```
### BOM 相关对象 属性及方法
- Location 当前页面地址相关信息，如当前页面地址
- Navigator 当前浏览器相关信息，如浏览器版本
- Screen 包含屏幕相关信息，如屏幕的长宽
- History 浏览器的历史相关信息，如返回上一页
```js
window.location.href='https://imooc.com';
window.location = 'http://www.imooc.com/';
window.location.assign('http://www.imooc.com/');
```
```js
console.log(navigator.userAgent);
console.log(navigator.onLine);
```
```js
var screenWidth = window.screen.width;
var screenHeight = window.screen.height;
console.log('分辨率: ' + screenWidth + 'x' + screenHeight);
```
```js
<section id="app">
  <a href="user" class="link">用户中心</a>
  <a href="setting" class="link">设置</a>

  <div class="container"></div>
</section>

<script>
  // 注册路由
  document.querySelectorAll('.link').forEach(function(item) {
    item.addEventListener('click', function(e) {

      e.preventDefault();

      // 拿到需要注册的地址
      let link = item.getAttribute('href');
      // 往history中添加一个历史记录   0-参数 1-title 2-url
      window.history.pushState({name: link}, link, link);

      // 具体要做的业务
      document.querySelector('.container').innerHTML = link;

    }, false);
  });

  // 监听路由
  window.addEventListener('popstate', function(e) {
    console.log({
      location: location.href,
      state: e.state
    });
    document.querySelector('.container').innerHTML = e.state.name;
  }, false);
</script>
```
- BOM 提供了三种弹出框
- window.alert 警告框
- window.prompt 提示框
- window.confirm 确认框
```js
<script>
    window.alert('警告框！');

    var result=window.prompt('我是提示框！')
    if(result==='确认'){
        alert('操作成功');
    }

    var result=window.confirm('我是确认框！');
    if(result){
        alert('删除成功');
    }else{
        console.log('已取消');
    }
</script>
```
- BOM 提供了两种定时器：
- window.setTimeout 在一定时间后做一些事情    setTimeout(要做的事情, 多少毫秒后做);
- window.setInterval 每隔一段事件做一些事情   setInterval(要做的事情, 多少毫秒后做);
```js
<script>
    setTimeout(function(){
        console.log('1秒过去了');
    },1000);
    setTimeout('console.log("2秒过去了...?")',2000);
</script>

<script>
    var count=0;
    setInterval(function(){
        console.log((++count)+'秒过去了');
    },1000);
</script>
```
- 取消定时器 setTimeout
- 1.利用标志进行取消
- 2.利用 clearTimeout 方法
- 取消setInterval 建议使用 clearInterval
```js
<script>
    var flag=false;
    setTimeout(function(){
        if(flag)return;
        console.log('哈哈哈');
    },5000);
    flag=!confirm('5秒后狂笑');
</script>

<script>
    var timer=setTimeout(function(){
        console.log('哈哈哈');
    },5000);

    if(!confirm('5秒后狂笑')){
        clearTimeout(timer);
    }
</script>

<script>
    var count=0;
    var timer=setInterval(function(){
        console.log((++count)+'秒过去了');
    if (count>=3){
        console.log('浪费时间');
        clearTimeout(timer);
    }
    },1000);
</script>
```
### 当前窗口的尺寸
- 通过 innerHeight 和 innerWidth 属性
```js
<script>
    function logSize(){
        var width=window.innerWidth;
        var height=window.innerHeight;
    console.log('窗口尺寸：'+ width +'x'+ height);
    }
     logSize();
     window.addEventListener('resize',function(){
         logSize();
    });
</script>
```




