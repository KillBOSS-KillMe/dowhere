// // pages/projectAll/projectAll.js
import * as echarts from '../../ec-canvas/echarts';
const app = getApp();
Page({
  data: {
    userId: null,
    projectListData: [],
    time: 'month',
    planBarHeight: 0,
    lv: '',
    annotationList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    this.setData({
      lv: options.lv,
      userId: app.globalData.userId
    })
    console.log(this.data.userId)
    // 此处加载项目及区域数据 
    let projectListData = [
      {"name": "一区", "project": [
        {"projectName": "生产","id": "1"},
        {"projectName": "技术","id": "2"},
        {"projectName": "质量","id": "3"},
        {"projectName": "项目4","id": "4"},
        {"projectName": "项目1项目1","id": "5"},
        {"projectName": "项目6","id": "6"},
        {"projectName": "项目1项目1","id": "7"}
      ]},
      {"name": "7区", "project": [
        {"projectName": "项目1","id": "1"},
        {"projectName": "项目2","id": "1"},
        {"projectName": "项目3","id": "1"},
        {"projectName": "项目4","id": "1"},
        {"projectName": "项目5","id": "1"},
        {"projectName": "项目6","id": "1"},
        {"projectName": "项目7","id": "1"}
      ]}
    ]
    this.setData({
      projectListData: projectListData
    })
    
    this.getAnnotation()
  },
  // 获取缓存在本地的批注信息
  getAnnotation() {
    wx.getStorage({
      key: 'annotation',
      success: res => {
        console.log(res)
        if (res.data) {
          let annotationList = res.data
          this.setData({
            annotationList: annotationList
          })
        } else {
          
        }
      }
    })
  },
  setAnnotation(name, password) {
    wx.setStorageSync('annotation', ['1111111111111111111', '22222222222222222', '333333333333333333'])
  },
  onShow() {

  },
  onReady() {
    // 获取组件
    this.quantityPie = this.selectComponent('#quantity-pie');
    this.planPie = this.selectComponent('#plan-pie');
    // this.planBar = this.selectComponent('#plan-bar');
    this.init(this.data.time)
    this.setOptionPlanBar()
  },
  // 数据展示时间切换
  // 切换--年
  yearData(){
    if (this.data.time === "month") {
      this.setData({
        time: "year"
      })
    } else {
      return ''
    }
    this.init(this.data.time)
    this.setOptionPlanBar()
  },
  // 切换--月
  monthData(){
    if (this.data.time === "year") {
      this.setData({
        time: "month"
      })
    } else {
      return ''
    }
    this.init(this.data.time)
    this.setOptionPlanBar()
  },
  // 查看产品列表页
  goProduct(e) {
    wx.navigateTo({
      url: `/pages/product/product?projectid=${e.currentTarget.dataset.id}&lv=${this.data.lv}`
    })
  },
  getProjectList() {
    console.log(this.data.userId)
    return ''
    wx.request({
      url: `${this.$parent.globalData.requestUrl}/api/logo`,
      method: 'POST',
      data: {
        userName: this.userName,
        userPaw: this.userPaw
      },
      success: data => {
        if (data.data.success) {
          // data = data.data.novels
          this.$apply()
        } else {
          wx.showModal({
            title: '',
            content: data.data.errmsg
          })
        }
      }
    })
  },
  // 点击按钮后初始化图表
  init(time) {
    // if (this.data.lv == "1" || this.data.lv == "3") {
      this.quantityPie.init((canvas, width, height) => {
        // 获取组件的 canvas、width、height 后的回调函数
        // 在这里初始化图表
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        setOptionQuantityPie(chart, time);
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return chart;
      });
    // }
    
    // if (this.data.lv == "1" || this.data.lv == "2") {
      this.planPie.init((canvas, width, height) => {
        // 获取组件的 canvas、width、height 后的回调函数
        // 在这里初始化图表
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        setOptionPlanPie(chart, time);
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return chart;
      });
    // }
    
    // this.planBar.init((canvas, width, height) => {
    //   // 获取组件的 canvas、width、height 后的回调函数
    //   // 在这里初始化图表
    //   const chart = echarts.init(canvas, null, {
    //     width: width,
    //     height: height
    //   });
    //   setOptionPlanBar(chart, time);
    //   // 注意这里一定要返回 chart 实例，否则会影响事件处理等
    //   return chart;
    // });
  },
  setOptionPlanBar() {
    if (this.data.time == "month") {
      //加载月份数据---此处修改参数
    } else {
      // 加载年份数据---此处修改参数
    }
    let chartData = [
      // {"name": "产品1", "plan": 100, "schedule": 50},
      // {"name": "产品1", "plan": 100, "schedule": 50},
      // {"name": "产品1", "plan": 100, "schedule": 50},
      // {"name": "产品1", "plan": 100, "schedule": 50},
      // {"name": "产品1", "plan": 100, "schedule": 50},
      // {"name": "产品1", "plan": 100, "schedule": 50},
      // {"name": "产品1", "plan": 100, "schedule": 50},
      // {"name": "产品1", "plan": 100, "schedule": 50},
      // {"name": "产品1", "plan": 100, "schedule": 50},
      // {"name": "产品1", "plan": 100, "schedule": 50},
      // {"name": "产品1", "plan": 100, "schedule": 50},
      {"name": "质量", "plan": 100, "schedule": 50},
      {"name": "技术", "plan": 100, "schedule": 50},
      {"name": "生产", "plan": 100, "schedule": 50}
    ]
    let namelist = []
    let planlist = []
    let schedulelist = []
    let remainderlist = []
    let i = 0;
    for (i in chartData) {
      namelist.push(chartData[i].name)
      planlist.push(chartData[i].plan)
      schedulelist.push(chartData[i].schedule)
      remainderlist.push(chartData[i].schedule - chartData[i].plan)
    }
    let data = new Object();
    data.namelist = namelist;
    data.planlist = planlist;
    data.schedulelist = schedulelist;
    data.remainderlist = remainderlist;
    data.chartName = '各区进度';
    // 计算图表显示高度
    let k = 100
    if (chartData.length < 10) {
      k = 150
    } else if (chartData.length < 5) {
      k = 200
    }
    this.setData({
      planBarHeight: k * chartData.length
    })
    this.planBar = this.selectComponent('#plan-bar');
    this.planBar.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      app.barShow(data, chart)
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
    // 图表渲染
    
    // wx.request({
    //   url: `${this.$parent.globalData.requestUrl}/api/getData`,
    //   method: 'POST',
    //   data: {
    //     userName: this.userName,
    //     userPaw: this.userPaw
    //   },
    //   success: data => {
    //     if (data.data.success) {
    //       // data = data.data.novels
          
    //     } else {
    //       wx.showModal({
    //         title: '',
    //         content: data.data.errmsg
    //       })
    //     }
    //   }
    // })
  }
});


// 计划完成度--饼
function setOptionPlanPie(chart, time) {
  if (time == "month") {
    //加载月份数据---此处修改参数
  } else {
    // 加载年份数据---此处修改参数
  }
  let chartData = [
    {"name": "项目1", "value": 100},
    {"name": "项目2", "value": 30},
    {"name": "项目3", "value": 100},
    {"name": "项目4", "value": 30},
    {"name": "项目5", "value": 100},
    {"name": "项目6", "value": 30},
    {"name": "项目7", "value": 100},
    {"name": "项目8", "value": 30},
    {"name": "项目9", "value": 100},
    {"name": "项目11", "value": 30},
    {"name": "项目12", "value": 100},
    {"name": "项目13", "value": 30},
    {"name": "项目14", "value": 80}
  ]
  let data = new Object();
  data.chartData = chartData;
  data.chartName = '完成情况';
  // 图表渲染
  app.pieShow(data, chart)
  // wx.request({
  //   url: `${this.$parent.globalData.requestUrl}/api/getData`,
  //   method: 'POST',
  //   data: {
  //     userName: this.userName,
  //     userPaw: this.userPaw
  //   },
  //   success: data => {
  //     if (data.data.success) {
  //       // data = data.data.novels
        
  //     } else {
  //       wx.showModal({
  //         title: '',
  //         content: data.data.errmsg
  //       })
  //     }
  //   }
  // })
}
// 各区金额占比--饼
function setOptionQuantityPie(chart, time) {
  if (time == "month") {
    //加载月份数据---此处修改参数
  } else {
    // 加载年份数据---此处修改参数
  }
  let chartData = [
    {"name": "项目1", "value": 100},
    {"name": "项目1", "value": 30},
    {"name": "产品3", "value": 80},
  ]
  let data = new Object();
  data.chartData = chartData;
  data.chartName = '总产值';
  // 图表渲染
  app.pieShow(data, chart)
  // wx.request({
  //   url: `${this.$parent.globalData.requestUrl}/api/getData`,
  //   method: 'POST',
  //   data: {
  //     userName: this.userName,
  //     userPaw: this.userPaw
  //   },
  //   success: data => {
  //     if (data.data.success) {
  //       // data = data.data.novels
        
  //     } else {
  //       wx.showModal({
  //         title: '',
  //         content: data.data.errmsg
  //       })
  //     }
  //   }
  // })
}

// 此处代码已无用，更新为柱状图根据数据长度自动跳转高度--备份 勿删
// // 完成数据详情--柱
// function setOptionPlanBar(chart, time) {
//   if (time == "month") {
//     //加载月份数据---此处修改参数
    
//   } else {
//     // 加载年份数据---此处修改参数
//   }
//   let chartData = [
//     {"name": "产品1", "plan": 100, "schedule": 50},
//     {"name": "产品1", "plan": 100, "schedule": 50},
//     {"name": "产品1", "plan": 100, "schedule": 50},
//     {"name": "产品1", "plan": 100, "schedule": 50},
//     {"name": "产品1", "plan": 100, "schedule": 50},
//     {"name": "产品1", "plan": 100, "schedule": 50},
//     {"name": "产品1", "plan": 100, "schedule": 50},
//     {"name": "产品1", "plan": 100, "schedule": 50},
//     {"name": "产品1", "plan": 100, "schedule": 50},
//     {"name": "产品1", "plan": 100, "schedule": 50},
//     {"name": "产品1", "plan": 100, "schedule": 50},
//     {"name": "产品1", "plan": 100, "schedule": 50},
//     {"name": "产品1", "plan": 100, "schedule": 50},
//     {"name": "产品1", "plan": 100, "schedule": 50}
//   ]
//   let namelist = []
//   let planlist = []
//   let schedulelist = []
//   let remainderlist = []
//   let i = 0;
//   for (i in chartData) {
//     namelist.push(chartData[i].name)
//     planlist.push(chartData[i].plan)
//     schedulelist.push(chartData[i].schedule)
//     remainderlist.push(chartData[i].schedule - chartData[i].plan)
//   }
//   let data = new Object();
//   data.namelist = namelist;
//   data.planlist = planlist;
//   data.schedulelist = schedulelist;
//   data.remainderlist = remainderlist;
//   // 图表渲染
//   app.barShow(data, chart)
//   // wx.request({
//   //   url: `${this.$parent.globalData.requestUrl}/api/getData`,
//   //   method: 'POST',
//   //   data: {
//   //     userName: this.userName,
//   //     userPaw: this.userPaw
//   //   },
//   //   success: data => {
//   //     if (data.data.success) {
//   //       // data = data.data.novels
        
//   //     } else {
//   //       wx.showModal({
//   //         title: '',
//   //         content: data.data.errmsg
//   //       })
//   //     }
//   //   }
//   // })
// }
