$(document).ready(function() {
  // demo用 生成随机数据
  var carFlowData = [400, 200, 150, 80, 70, 30, 25, 20, 15, 10];
  var carFlowDesc = [];
  var max = 0;
  for (var i = 0; i < 10; i++) {
    if (i < 9) {
      carFlowDesc[i] = (i + 1) + ". 0" + i.toString() + ":00-" + "0" + (i + 1).toString() + ":00 (" + carFlowData[i] + " )";
    } else {
      carFlowDesc[i] = (i + 1) + ". 0" + i.toString() + ":00-" + (i + 1).toString() + ":00 (" + carFlowData[i] + " )";
    }
  }


  // 填充数据
  var $td = $("table").find("td");
  for (i = 0; i < 10; i++) {
    $td.eq(i).html(carFlowDesc[i]);
  }

  // 数据处理
  var showData = [];
  var lastFiveData = 0;
  for (i = 5; i < carFlowData.length; i++) {
    lastFiveData += carFlowData[i];
  }
  var temp = [];
  for (i = 0; i < 6; i++) {
    if (i < 5) {
      temp.push(carFlowData[i]);
    } else {
      temp.push(lastFiveData);
    }
  }
  temp.sort(inSort);
  for (i = 0; i < temp.length; i++) {
    showData.push(["test", temp[i]]);
  }

  // 渲染pie饼图
  var plot2 = jQuery.jqplot('pieChart', [showData], {
    title: ' ',
    seriesColors: ["#C2CEF2"],
    seriesDefaults: {
      shadow: false,
      renderer: jQuery.jqplot.PieRenderer,
      rendererOptions: {
        diameter: 200,
        // padding: 20,
        startAngle: 45,
        sliceMargin: 4,
        showDataLabels: true,
        /// 每个面板显示的信息，可以自定义
        dataLabels: ["7%", "8%", "(6~10)<br/>10%", "15%", "20%", "40%"]
          //dataLabels: ["value","percent"],
          // dataLabelFormatString: "%d %d%%"
      }
    },
    legend: {
      show: false,
      location: 'w'
    },
    grid: {
      background: "#fff",
      borderColor: "#fff",
      shadow: false
    }
  });


  var test = [30, 25, 20, 15, 10];
  drawRect(test);

  function inSort(a, b) {
    return a - b;
  }


  function drawRect(arr) {
    // alert("hello");
    //return;
    var sum = 0;
    var rate = [];
    var width = 60;
    var max = arr[0];
    for (var i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    for (i = 0; i < arr.length; i++) {
      rate[i] = Math.floor(arr[i] / sum * 100) + "%";
    }
    var $rateRect = $(".rateRect");
    for (var i = 0; i < $rateRect.length; i++) {
      $rateRect.eq(i).html(rate[i]);
      var setWidth = arr[i] / max * 55;
      $rateRect.eq(i).css("width", setWidth);
      // $rateRect.eq(i).css("background-color","red");
    }
  }
});