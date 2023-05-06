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