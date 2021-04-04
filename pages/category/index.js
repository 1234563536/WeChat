// pages/category/index.js
import { request } from"../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
//左侧的菜单数据
leftMenuList:[],
//右侧的菜单数据
rightContent:[],
currentIndex:0,
scrollTop:0
  },
Cates:[],//接口的返回数据
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
   1先判斷一下本地缓存中有没有旧的数据
   time.Date.now()
   2没有旧数据 直接发送新请求
   3有旧的数据 同时 旧的数据也没有过期 就使用本地存储中的旧数据即可
   web中的本地存储和小程序中的本地存储的区别
   写代码的方式不一样了
   web localStorage.setItem("key","value") localStorage.getItem("key")
   小程序中
   wx.setStorageSync('key', data) wx.getStorageSync('key')
   web 不管存入的是什么类型的数据，最终都会先调用以下tostring()把数据变成了字符串，在存入进去
   小程序中不存在类型转化
   */
const Cates=wx.getStorageSync("cates");
if(!Cates){
  //不存在 发送请求获取数据
  this.getCates();
}
else{
  //判断有没有过期
  if(Date.now()-Cates.time>1000*10){
    this.getCates();//重新发送请求
  }
  else{
    //可以使用旧的数据
    this.Cates=res.data.message;
    //把接口的数据存入到本地存储中
    let leftMenuList=this.Cates.map(v=>v.cat_name);
    let rightContent=this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  }
}
  },
  //获取分类数据
  async getCates(){
  // request({
  //   url:"/categories"
  // })
  // .then(res=>{
  //   this.Cates=res.data.message;
  //   //把接口的数据存入到本地存储中
  //   wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
  //   let leftMenuList=this.Cates.map(v=>v.cat_name);
  //   let rightContent=this.Cates[0].children;
  //   this.setData({
  //     leftMenuList,
  //     rightContent
  //   })
  // })
  const res=await request({url:"/categories"});
  this.Cates=res;
    //把接口的数据存入到本地存储中
    wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
    let leftMenuList=this.Cates.map(v=>v.cat_name);
    let rightContent=this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  //左侧点击事件
  handleItemTap(e){
    // 获取被点击的标题身上的索引
    const {index}=e.currentTarget.dataset;
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0
    })
    //重新设置距离顶部的距离

  }
})