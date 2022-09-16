// 柱状图1模块

(function bar1(){
  var myChart = echarts.init(document.querySelector('.bar .chart'));
  var xAxisData = ['9月8日', '9月9日', '9月10日', '9月11日', '9月12日', '9月13日', '9月14日'];
  var data1 = [301 ,290 ,234 ,226 ,242 ,237 ,167];
  var data2 = [1103 ,1090 ,1069 ,868 ,806 ,825 ,916];

  var emphasisStyle = {
      itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.3)'
      }
  };
  var option = {
  color: ['red', 'yellow'],
  legend: {
      data: ['新增确诊病例', '新增无症状感染者'],
      left: '10%',
      itemWidth: 10,
      itemHeight: 5,
      textStyle: {
          color:"rgba(255,255,255,.6)"
      }
  },
  tooltip: {
      
  },
  xAxis: {
      data: xAxisData,
      name: '日期',
      axisLine: { onZero: true },
      splitLine: { show: false },
      splitArea: { show: false },
      axisLabel: {
          color: "rgba(255,255,255,.6)",
          fontSize:"12"
      }
  },
  yAxis: {
      axisLabel: {
          color: "rgba(255,255,255,.6)",
          fontSize:"12"
      }
  },
  grid: {
      left: "0%",
      right: "0%",
      top: "20px",
      bottom: "4%",
      containLabel: true
  },
  series: [
      
      {
      barWidth: "35%",
      name: '新增确诊病例',
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: data1
      },
      {
      barWidth: "35%",
      name: '新增无症状感染者',
      type: 'bar',
      stack: 'one',
      emphasis: emphasisStyle,
      data: data2
      },
  ]
  };
  myChart.setOption(option);
  window.addEventListener("resize", function(){
      myChart.resize();
  });
})();
//setInterval(bar1, 1000);
// 折线图定制
(function() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".line .chart"));

  // (1)准备数据
  var data = {
    year: [
      [301 ,290 ,234 ,226 ,242 ,237 ,167],
      [1103 ,1090 ,1069 ,868 ,806 ,825 ,916]
    ]
  };

  // 2. 指定配置和数据
  var option = {
    color: ["#00f2f1", "#ed3f35"],
    tooltip: {
      // 通过坐标轴来触发
      trigger: "axis"
    },
    legend: {
      // 距离容器10%
      right: "10%",
      // 修饰图例文字的颜色
      textStyle: {
        color: "#4c9bfd"
      }
      // 如果series 里面设置了name，此时图例组件的data可以省略
      // data: ["邮件营销", "联盟广告"]
    },
    grid: {
      top: "20%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      show: true,
      borderColor: "#012f4a",
      containLabel: true
    },

    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ['9月8日', '9月9日', '9月10日', '9月11日', '9月12日', '9月13日', '9月14日'],
      // 去除刻度
      axisTick: {
        show: false
      },
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "rgba(255,255,255,.7)"
      },
      // 去除x坐标轴的颜色
      axisLine: {
        show: false
      }
    },
    yAxis: {
      type: "value",
      // 去除刻度
      axisTick: {
        show: false
      },
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "rgba(255,255,255,.7)"
      },
      // 修改y轴分割线的颜色
      splitLine: {
        lineStyle: {
          color: "#012f4a"
        }
      }
    },
    series: [
      {
        name: "新增无症状感染者",
        type: "line",
        // 是否让线条圆滑显示
        smooth: true,
        data: data.year[0]
      },
      {
        name: "新增确诊病例",
        type: "line",
        smooth: true,
        data: data.year[1]
      }
    ]
  };
  // 3. 把配置和数据给实例对象
  myChart.setOption(option);

  // 重新把配置好的新数据给实例对象
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();

// 折线图 优秀作品
(function() {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".line1 .chart"));

  option = {
  polar: {
    radius: [30, '80%']
  },
  radiusAxis: {
    max: 1000000
  },
  angleAxis: {
    type: 'category',
    data: ['香港', '澳门', '台湾'],
    startAngle: 75
  },
  tooltip: {},
  color:["#ed3f35"],
  series: {
    type: 'bar',
    data: [402928, 793, 5804343],
    coordinateSystem: 'polar',
    label: {
      show: true,
      position: 'middle',
      formatter: '{b}: {c}'
    }
  },
  animation: false
};

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
  });
})();

// 点位分布统计模块
(function() {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".pie1  .chart"));
  // 2. 指定配置项和数据
  var option = {
    legend: {
      top: "90%",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 注意颜色写的位置
    color: [
      "#006cff",
      "#60cda0",
      "#ed8884",
      "#ff9f7f",
      "#0096ff",
      "#9fe6b8",
      "#32c5e9",
      "#1d9dff"
    ],
    series: [
      {
        name: "点位统计",
        type: "pie",
        // 如果radius是百分比则必须加引号
        radius: ["10%", "70%"],
        center: ["50%", "42%"],
        roseType: "radius",
        data: [
          { value: 84, name: "四川" },
          { value: 9, name: "西藏" },
          { value: 7, name: "内蒙古" },
          { value: 5, name: "广东" },
          { value: 5, name: "广西" },
          { value: 5, name: "贵州" },
          { value: 2, name: "北京" },
          { value: 2, name: "重庆" },
          { value: 2, name: "新疆" },
          { value: 1, name: "天津" },
          { value: 1, name: "江西" },
          { value: 1, name: "山东" },
          { value: 1, name: "云南" },
          { value: 1, name: "陕西" },
        ],
        // 修饰饼形图文字相关的样式 label对象
        label: {
          fontSize: 10
        },
        // 修饰引导线样式
        labelLine: {
          // 连接到图形的线长度
          length: 10,
          // 连接到文字的线长度
          length2: 10
        }
      }
    ]
  };

  // 3. 配置项和数据给我们的实例化对象
  myChart.setOption(option);
  // 4. 当我们浏览器缩放的时候，图表也等比例缩放
  window.addEventListener("resize", function() {
    // 让我们的图表调用 resize这个方法
    myChart.resize();
  });
})();
