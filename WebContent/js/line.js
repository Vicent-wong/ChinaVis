var head=document.getElementsByTagName("head");
var es=document.createElement("link");
es.href='../css/line.css';
es.rel="stylesheet";
es.type="text/css";
head[0].appendChild(es);

var margin = {top:40, right:30, bottom: 30, left: 50};
    width = 570 - margin.left -margin.right;
    height = 317 - margin.top - margin.bottom;

function formatSeconds(value) {
    var secondTime = parseInt(value);// 秒
    var minuteTime = 0;// 分
    var hourTime = 0;// 小时
    if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if(minuteTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60);
        }
    }
    var result = getzf(hourTime)+":"+getzf(minuteTime)+":"+getzf(parseInt(secondTime));
    return result;
}

function getzf(num){
	if(parseInt(num)<10){
		num="0"+num;
		}
	return num;
}
	//var format = d3.time.format("%H:%M:%S");
	// 时间数量数据
	var timeset1 =[];
	var timeset2 =[];
	var timeset3 =[];//对应主会场三天的时间和人数
	
	var timeset4 =[];
	var timeset5 =[];
	var timeset6 =[];//对应分会场A三天的时间和人数
	
	var timeset7 =[];
	var timeset8 =[];
	var timeset9 =[];//对应分会场B三天的时间和人数
	
	var timeset10 =[];
	var timeset11 =[];
	var timeset12 =[];//对应分会场C三天的时间和人数
	
	var timeset13 =[];
	var timeset14 =[];
	var timeset15 =[];//对应分会场D三天的时间和人数
	
	//时间向量
	var times1 =[];//第一天的时间
	var times2 =[];//第二天的时间
	var times3 =[];//第三天的时间
	
	//人数向量
	var p_main1=[];//主会场第一天的人数
	var p_main2=[];//主会场第二天的人数
	var p_main3=[];//主会场第三天的人数	
	
	var A_main1=[];//分会场A第一天的人数
	var A_main2=[];//分会场A第二天的人数
	var A_main3=[];//分会场A第三天的人数	
	
	var B_main1=[];//分会场B第一天的人数
	var B_main2=[];//分会场B第二天的人数
	var B_main3=[];//分会场B第三天的人数	
	
	var C_main1=[];//分会场C第一天的人数
	var C_main2=[];//分会场C第二天的人数
	var C_main3=[];//分会场C第三天的人数	
	
	var D_main1=[];//分会场D第一天的人数
	var D_main2=[];//分会场D第二天的人数
	var D_main3=[];//分会场D第三天的人数
	
    var parseDate = d3.time.format("%H:%M:%S").parse;
	//y坐标轴
	var y1;
	var y2;
	var y3;
	var y4;
	var y5;
	//y方向上的格栅
	var makey1;
	var makey2;
	var makey3;
	var makey4;
	var makey5;
	//线条
	var svg_path1;
	var svg_path2;
	var svg_path3;
	var svg_path4;
	var svg_path5;
	var svg_path6;
	var svg_path7;
	var svg_path8;
	var svg_path9;
	var svg_path10;
	var svg_path11;
	var svg_path12;
	var svg_path13;
	var svg_path14;
	var svg_path15;
	//绘制标签线条所用的数据
	var x_transition,y_transition=-30;
	var label1 =[[width-margin.right-45,margin.top+y_transition],[width-margin.right-9,margin.top+y_transition]];
	var label2 =[[width-margin.right-45,margin.top+y_transition+20],[width-margin.right-9,margin.top+y_transition+20]];
	var label3 =[[width-margin.right-45,margin.top+y_transition+40],[width-margin.right-9,margin.top+y_transition+40]];
    //Get the data
    d3.csv("../data1/all.csv",function(error, data){
//处理主会场的数据
  data.forEach(function(d) {
    var cx1 = d.time1;
    var cy1 = d.zhu1;
    timeset1.push([cx1,cy1]);
    times1.push(cx1);
	p_main1.push(cy1);
  })
  data.forEach(function(d) {
    var cx2 = d.time2; 
	var cy2 = d.zhu2;
	timeset2.push([cx2,cy2]);
    times2.push(cx2);
	p_main2.push(cy2);
  })
  data.forEach(function(d) {
    var cx3 = d.time3;
	var cy3 = d.zhu3;
	timeset3.push([cx3,cy3]);
    times3.push(cx3);
	p_main3.push(cy3);
  })
//处理分会场A的数据
 data.forEach(function(d) {
    var cx1 = d.time1;
    var cy4 = d.A1;
    timeset4.push([cx1,cy4]);
    //times1.push(cx1);
	A_main1.push(cy4);
  })
  data.forEach(function(d) {
    var cx2 = d.time2; 
	var cy5 = d.A2;
	timeset5.push([cx2,cy5]);
    //times2.push(cx2);
	A_main2.push(cy5);
  })
  data.forEach(function(d) {
    var cx3 = d.time3;
	var cy6 = d.A3;
	timeset6.push([cx3,cy6]);
    //times3.push(cx3);
	A_main3.push(cy6);
  })
 //处理分会场B的数据
  data.forEach(function(d) {
    var cx1 = d.time1;
    var cy7 = d.B1;
    timeset7.push([cx1,cy7]);
    //times1.push(cx1);
	B_main1.push(cy7);
  })
  data.forEach(function(d) {
    var cx2 = d.time2; 
	var cy8 = d.B2;
	timeset8.push([cx2,cy8]);
    //times2.push(cx2);
	B_main2.push(cy8);
  })
  data.forEach(function(d) {
    var cx3 = d.time3;
	var cy9 = d.B3;
	timeset9.push([cx3,cy9]);
    //times3.push(cx3);
	B_main3.push(cy9);
  })
//处理分会场C的人数
  data.forEach(function(d) {
    var cx1 = d.time1;
    var cy10 = d.C1;
    timeset10.push([cx1,cy10]);
    //times1.push(cx1);
	C_main1.push(cy10);
  })
  data.forEach(function(d) {
    var cx2 = d.time2; 
	var cy11 = d.C2;
	timeset11.push([cx2,cy11]);
    //times2.push(cx2);
	C_main2.push(cy11);
  })
  data.forEach(function(d) {
    var cx3 = d.time3;
	var cy12 = d.C3;
	timeset12.push([cx3,cy12]);
    //times3.push(cx3);
	C_main3.push(cy12);
  })
//处理分会场D的人数
  data.forEach(function(d) {
    var cx1 = d.time1;
    var cy13 = d.D1;
    timeset13.push([cx1,cy13]);
    //times1.push(cx1);
	D_main1.push(cy13);
  })
  data.forEach(function(d) {
    var cx2 = d.time2; 
	var cy14 = d.D2;
	timeset14.push([cx2,cy14]);
    //times2.push(cx2);
	D_main2.push(cy14);
  })
  data.forEach(function(d) {
    var cx3 = d.time3;
	var cy15 = d.D3;
	timeset15.push([cx3,cy15]);
    //times3.push(cx3);
	D_main3.push(cy15);
  })
  //定义坐标轴的范围
	var xscale = d3.time.scale()
	.domain([parseDate(times1[0]),parseDate(times2[times2.length-1])])
	.range([0, width]);
	//主会场y坐标轴
    var yscale1 = d3.scale.linear()
	.domain([0, d3.max(p_main2, function(d){ return d*1.03;})])
	.range([height, 0]);
	//分会场A的y坐标轴
	var yscale2 = d3.scale.linear()
	.domain([0, d3.max(A_main3, function(d){ return d*1.06;})])
	.range([height, 0]);
	//分会场B的y坐标轴
	var yscale3 = d3.scale.linear()
	.domain([0, d3.max(B_main2, function(d){ return d*1.01;})])
	.range([height, 0]);
	//分会场C的y坐标轴
	var yscale4 = d3.scale.linear()
	.domain([0, d3.max(C_main1, function(d){ return d*1.01;})])
	.range([height, 0]);
	//分会场D的y坐标轴
	var yscale5 = d3.scale.linear()
	.domain([0, d3.max(D_main1, function(d){ return d*1.03;})])
	.range([height, 0]);
	//x的坐标轴
    var xAxis = d3.svg.axis().scale(xscale).orient("bottom").ticks(10);
	//主会场的y坐标轴
    var yAxis1 = d3.svg.axis().scale(yscale1).orient("left").ticks(10);
	//分会场A的y坐标轴
    var yAxis2 = d3.svg.axis().scale(yscale2).orient("left").ticks(10);
	//分会场B的y坐标轴
    var yAxis3 = d3.svg.axis().scale(yscale3).orient("left").ticks(10);
	//主会场C的y坐标轴
    var yAxis4 = d3.svg.axis().scale(yscale4).orient("left").ticks(10);
	//分会场D的y坐标轴
    var yAxis5 = d3.svg.axis().scale(yscale5).orient("left").ticks(10);
	//定义格栅绘制函数
	//从x轴向上的格栅函数
	function make_x_axis(){
    return d3.svg.axis()
        .scale(xscale)
        .orient("bottom")
        .ticks(10);
	}
	//主会场从y轴向右的格栅函数
	function make_y_axis1(){
    return d3.svg.axis()
        .scale(yscale1)
        .orient("left")
        .ticks(10);
	}
	//分会场A从y轴向右的格栅函数
	function make_y_axis2(){
    return d3.svg.axis()
        .scale(yscale2)
        .orient("left")
        .ticks(10);
	}
	//分会场B从y轴向右的格栅函数
	function make_y_axis3(){
    return d3.svg.axis()
        .scale(yscale3)
        .orient("left")
        .ticks(10);
	}
	//分会场C从y轴向右的格栅函数
	function make_y_axis4(){
    return d3.svg.axis()
        .scale(yscale4)
        .orient("left")
        .ticks(10);
	}
	//分会场D从y轴向右的格栅函数
	function make_y_axis5(){
    return d3.svg.axis()
        .scale(yscale5)
        .orient("left")
        .ticks(10);
	}
    //定义主会场线条
    var valueline1 = d3.svg.line()
        .x(function(d){return xscale(parseDate(d[0]));})
        .y(function(d){return yscale1(d[1]);})
		.interpolate("basis-open");;
		
	//定义分会场A线条
    var valueline2 = d3.svg.line()
        .x(function(d){return xscale(parseDate(d[0]));})
        .y(function(d){return yscale2(d[1]);})
		.interpolate("basis-open");;
		
	//定义分会场B线条
    var valueline3 = d3.svg.line()
        .x(function(d){return xscale(parseDate(d[0]));})
        .y(function(d){return yscale3(d[1]);})
		.interpolate("basis-open");;
		
	//定义分会场C线条
    var valueline4 = d3.svg.line()
        .x(function(d){return xscale(parseDate(d[0]));})
        .y(function(d){return yscale4(d[1]);})
		.interpolate("basis-open");;
		
	//定义分会场D线条
    var valueline5 = d3.svg.line()
        .x(function(d){return xscale(parseDate(d[0]));})
        .y(function(d){return yscale5(d[1]);})
		.interpolate("basis-open");;
	//定义绘制标签说明的线条
	var labelline = d3.svg.line()
		.x(function(d){return d[0];})
		.y(function(d){return d[1];})
		
    var svg = d3.select("#Line_3")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //绘制x轴
        svg.append("g")
            .attr("class", " axis")
            .attr("transform", "translate(0," + height + ")")
			.style("font-weight","bold")
			.style("font-size", 16)
			.attr("opacity",0)
            .call(xAxis);

    //绘制主会场的y轴
	var yFontSize = 13;
    y1 =svg.append("g")
            .attr("class", " axis")
			.style("font-weight","bold")
			.style("font-size", yFontSize)
            .call(yAxis1);
			
	//绘制分会场A的y轴
    y2 =svg.append("g")
            .attr("class", " axis")
			.attr("opacity", 0)
			.style("font-weight","bold")
			.style("font-size", yFontSize)
            .call(yAxis2);
			
    //绘制分会场B的y轴
    y3 =svg.append("g")
            .attr("class", " axis")
			.attr("opacity", 0)
			.style("font-weight","bold")
			.style("font-size", yFontSize)
            .call(yAxis3);

    //绘制分会场C的y轴
    y4  =svg.append("g")
            .attr("class", " axis")
			.attr("opacity", 0)
			.style("font-weight","bold")
			.style("font-size", yFontSize)
            .call(yAxis4);			

    //绘制分会场D的y轴
    y5  =svg.append("g")
            .attr("class", " axis")
			.attr("opacity", 0)
			.style("font-weight","bold")
			.style("font-size", yFontSize)
            .call(yAxis5);
			
	//增加一个x轴的标签
	svg.append("text")
	// .attr("transform", "translate(" + (width/2) + "," + (height + margin.bottom) + ")")
	.attr('x',width/2)
	.attr('y',height + margin.bottom/2)
	.attr('dx',0)
	.attr('dy',10)
    .style("text-anchor", "middle")
	.style("font-weight","bold")
	.style("font-size", 12)
    .text("Time");
	
	//增加一个y轴的标签
	svg.append("text")
    //.attr("transform", "rotate(-90)")
    //.attr("y", -5 - margin.left)
    //.attr("x", 0 - (height/2))
    //.attr("dy", "1em")
	.attr("transform", "translate(" + 0 + "," + -margin.top/3 + ")")
    .style("text-anchor" , "middle")
	.style("font-weight","bold")
	.style("font-size", 12)
	.text("People");
	
	//绘制格栅-x方向
	
	svg.append("g")
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .call(make_x_axis()
        .tickSize(-height, 0, 0)
        .tickFormat("")
    )
	
	//绘制主会场格栅-y方向
	makey1 = svg.append("g")
    .attr("class", "grid")
    .call(make_y_axis1()
        .tickSize(-width, 0, 0)
        .tickFormat("")
    )
	//绘制分会场A格栅-y方向
	makey2 = svg.append("g")
    .attr("class", "grid")
	.attr("opacity", 0)
    .call(make_y_axis2()
        .tickSize(-width, 0, 0)
        .tickFormat("")
    )
	//绘制分会场B格栅-y方向
	makey3 = svg.append("g")
    .attr("class", "grid")
	.attr("opacity", 0)
    .call(make_y_axis3()
        .tickSize(-width, 0, 0)
        .tickFormat("")
    )
	//绘制分会场C格栅-y方向
	makey4 = svg.append("g")
    .attr("class", "grid")
	.attr("opacity", 0)
    .call(make_y_axis4()
        .tickSize(-width, 0, 0)
        .tickFormat("")
    )
	//绘制分会场D格栅-y方向
	makey5 = svg.append("g")
    .attr("class", "grid")
	.attr("opacity", 0)
    .call(make_y_axis5()
        .tickSize(-width, 0, 0)
        .tickFormat("")
    )
	
	//绘制主会场第一天
    svg_path1=svg
		//.append('g')
		.append("path")
		.attr("d", valueline1(timeset1))
		//.attr("class", "line")
		.style('stroke','red');
	//绘制主会场第二天
	svg_path2=svg
		//.append('g')
		.append("path")
		.attr("d", valueline1(timeset2))
		//.attr("class", "line")
		.style("stroke", "green");
	 //绘制主会场第三天
	svg_path3=svg
		//.append('g')
		.append("path")
		.attr("d", valueline1(timeset3))
		//.attr("class", "line")
		.style("stroke", "steelblue");
		
	//绘制分会场A第一天
    svg_path4=svg
		//.append('g')
		.append("path")
		.attr("d", valueline2(timeset4))
		.attr("opacity", 0)
		//.attr("class", "line")
		.style('stroke','red');
	//绘制分会场A第二天
	svg_path5=svg
		//.append('g')
		.append("path")
		.attr("d", valueline2(timeset5))
		.attr("opacity", 0)
		//.attr("class", "line")
		.style("stroke", "green");
	 //绘制分会场A第三天
	svg_path6=svg
		//.append('g')
		.append("path")
		.attr("d", valueline2(timeset6))
		.attr("opacity", 0)
		//.attr("class", "line")
		.style("stroke", "steelblue");
		
	//绘制分会场B第一天
    svg_path7=svg
		//.append('g')
		.append("path")
		.attr("d", valueline3(timeset7))
		.attr("opacity", 0)
		//.attr("class", "line")
		.style('stroke','red');
	//绘制分会场B第二天
	svg_path8=svg
		//.append('g')
		.append("path")
		.attr("d", valueline3(timeset8))
		.attr("opacity", 0)
		//.attr("class", "line")
		.style("stroke", "green");
	 //绘制分会场B第三天
	svg_path9=svg
		//.append('g')
		.append("path")
		.attr("d", valueline3(timeset9))
		.attr("opacity", 0)
		//.attr("class", "line")
		.style("stroke", "steelblue");
		
	//绘制分会场C第一天
    svg_path10=svg
		//.append('g')
		.append("path")
		.attr("d", valueline4(timeset10))
		.attr("opacity", 0)
		//.attr("class", "line")
		.style('stroke','red');
	//绘制分会场C第二天
	svg_path11=svg
		//.append('g')
		.append("path")
		.attr("d", valueline4(timeset11))
		.attr("opacity", 0)
		//.attr("class", "line")
		.style("stroke", "green");
	 //绘制分会场C第三天
	svg_path12=svg
		//.append('g')
		.append("path")
		.attr("d", valueline4(timeset12))
		.attr("opacity", 0)
		//.attr("class", "line")
		.style("stroke", "steelblue");
		
	//绘制分会场D第一天
    svg_path13=svg
		//.append('g')
		.append("path")
		.attr("d", valueline5(timeset13))
		.attr("opacity", 0)
		//.attr("class", "line")
		.style('stroke','red');
	//绘制分会场D第二天
	svg_path14=svg
		//.append('g')
		.append("path")
		.attr("d", valueline5(timeset14))
		.attr("opacity", 0)
		//.attr("class", "line")
		.style("stroke", "green");
	 //绘制分会场D第三天
	svg_path15=svg
		//.append('g')
		.append("path")
		.attr("d", valueline5(timeset15))
		.attr("opacity", 0)
		//.attr("class", "line")
		.style("stroke", "steelblue");
	  
	  	//添加说明1
	svg.append("path")
		//.append("circle")
		//.attr("cx",1000)
		//.attr("cy",20)
		//.attr("width",1000)
		//.attr("height",30)
		//.attr("r",10)
		.attr("d", labelline(label1))
		//.attr('stroke-width', '2')
		.style("stroke","red")
		//.attr("stroke","white")
	
	//添加文字1
	svg.append("text")
		.attr("x", width-margin.right-3)
		.attr("y", margin.top+y_transition+5)
		//.attr("text-anchor", "middle")
		.style("font-size", 14)
		//.style("text-decoration", "underline")
		.text("day1");
		
	//添加说明2
	svg.append("path")
		//.append("circle")
		//.attr("cx",1000)
		//.attr("cy",60)
		//.attr("width",550)
		//.attr("height",30)
		//.attr("r",10)
		.attr("d", labelline(label2))
		.style("stroke","green")
		//.attr("stroke","white")
		
	//添加文字2
	svg.append("text")
		.attr("x", width-margin.right-3)
		.attr("y", margin.top+y_transition+25)
		//.attr("text-anchor", "middle")
		.style("font-size", 14)
		//.style("text-decoration", "underline")
		.text("day2");
		
	//添加说明3
	svg.append("path")
		//.append("circle")
		//.attr("cx",1000)
		//.attr("cy",100)
		//.attr("r",10)
		.attr("d", labelline(label3))
		.style("stroke","steelblue")
		//.attr("stroke","white")
		
	//添加文字3
	svg.append("text")
		.attr("x", width-margin.right-3)
		.attr("y", margin.top+y_transition+45)
		//.attr("text-anchor", "middle")
		.style("font-size", 14)
		//.style("text-decoration", "underline")
		.text("day3");
svg.append("text")
	.attr("x",25)
	.attr("y",height+10)
	.style("font-size","10px")
	.style("font-weight","bold")
	.text("08AM")
	
svg.append("text")
	.attr("x",63)
	.attr("y",height+10)
	.style("font-size","10px")
	.style("font-weight","bold")
	.text("09AM")
	
svg.append("text")
	.attr("x",101)
	.attr("y",height+10)
	.style("font-size","10px")
	.style("font-weight","bold")
	.text("10AM")
	
svg.append("text")
	.attr("x",139)
	.attr("y",height+10)
	.style("font-size","10px")
	.style("font-weight","bold")
	.text("11AM")
	
svg.append("text")
	.attr("x",177)
	.attr("y",height+10)
	.style("font-size","10px")
	.style("font-weight","bold")
	.text("12AM")
	
svg.append("text")
	.attr("x",215)
	.attr("y",height+10)
	.style("font-size","10px")
	.style("font-weight","bold")
	.text("01PM")
	
svg.append("text")
	.attr("x",253)
	.attr("y",height+10)
	.style("font-size","10px")
	.style("font-weight","bold")
	.text("02PM")
	
svg.append("text")
	.attr("x",291)
	.attr("y",height+10)
	.style("font-size","10px")
	.style("font-weight","bold")
	.text("03PM")
	
svg.append("text")
	.attr("x",329)
	.attr("y",height+10)
	.style("font-size","10px")
	.style("font-weight","bold")
	.text("04PM")
	
svg.append("text")
	.attr("x",367)
	.attr("y",height+10)
	.style("font-size","10px")
	.style("font-weight","bold")
	.text("05PM")
	
svg.append("text")
	.attr("x",405)
	.attr("y",height+10)
	.style("font-size","10px")
	.style("font-weight","bold")
	.text("06PM")
	
svg.append("text")
	.attr("x",443)
	.attr("y",height+10)
	.style("font-size","10px")
	.style("font-weight","bold")
	.text("07PM")
	
svg.append("text")
	.attr("x",481)
	.attr("y",height+10)
	.style("font-size","10px")
	.style("font-weight","bold")
	.text("08PM")
	
svg.append("line")
	.attr("x1",0)
	.attr("y1",520)
	.attr("x2",1120)
	.attr("y2",520)
	.style("stroke","grey")
	.attr("stroke-width",1)
	
var timenumber=svg.append("text")
	.attr("id","textbegin")
	.attr("x",0)
	.attr("y",height-10)
	.text(formatSeconds(25240))
	
	//随鼠标的点击时间数字的移动
	svg.on('mousemove',function(){
		var mouse=d3.mouse(this)
		var posx=mouse[0]
		var posy=mouse[1]
		if(posx<0)
		 posx=0;
		if(posx>1120)
		 posx=1120;
		if(posy<0)
		 posy=0;
		if(posy>520)
		 posy=520;
		d3.select("#textbegin")
			.attr("x",posx)
			.text(formatSeconds(46821/width*posx+25240))
	})
    });

function updateData1() {
  y1.attr("opacity", 1)
  y2.attr("opacity", 0)
  y3.attr("opacity", 0)
  y4.attr("opacity", 0)
  y5.attr("opacity", 0)
  makey1.attr("opacity", 1)
  makey2.attr("opacity", 0)
  makey3.attr("opacity", 0)
  makey4.attr("opacity", 0)
  makey5.attr("opacity", 0)
  svg_path1.attr("opacity", 1)
  svg_path2.attr("opacity", 1)
  svg_path3.attr("opacity", 1)
  svg_path4.attr("opacity", 0)
  svg_path5.attr("opacity", 0)
  svg_path6.attr("opacity", 0)
  svg_path7.attr("opacity", 0)
  svg_path8.attr("opacity", 0)
  svg_path9.attr("opacity", 0)
  svg_path10.attr("opacity", 0)
  svg_path11.attr("opacity", 0)
  svg_path12.attr("opacity", 0)
  svg_path13.attr("opacity", 0)
  svg_path14.attr("opacity", 0)
  svg_path15.attr("opacity", 0)
}
function updateData2() {
  y1.attr("opacity", 0)
  y2.attr("opacity", 1)
  y3.attr("opacity", 0)
  y4.attr("opacity", 0)
  y5.attr("opacity", 0)
  makey1.attr("opacity", 0)
  makey2.attr("opacity", 1)
  makey3.attr("opacity", 0)
  makey4.attr("opacity", 0)
  makey5.attr("opacity", 0)
  svg_path1.attr("opacity", 0)
  svg_path2.attr("opacity", 0)
  svg_path3.attr("opacity", 0)
  svg_path4.attr("opacity", 1)
  svg_path5.attr("opacity", 1)
  svg_path6.attr("opacity", 1)
  svg_path7.attr("opacity", 0)
  svg_path8.attr("opacity", 0)
  svg_path9.attr("opacity", 0)
  svg_path10.attr("opacity", 0)
  svg_path11.attr("opacity", 0)
  svg_path12.attr("opacity", 0)
  svg_path13.attr("opacity", 0)
  svg_path14.attr("opacity", 0)
  svg_path15.attr("opacity", 0)
}

function updateData3() {
  y1.attr("opacity", 0)
  y2.attr("opacity", 0)
  y3.attr("opacity", 1)
  y4.attr("opacity", 0)
  y5.attr("opacity", 0)
  makey1.attr("opacity", 0)
  makey2.attr("opacity", 0)
  makey3.attr("opacity", 1)
  makey4.attr("opacity", 0)
  makey5.attr("opacity", 0)
  svg_path1.attr("opacity", 0)
  svg_path2.attr("opacity", 0)
  svg_path3.attr("opacity", 0)
  svg_path4.attr("opacity", 0)
  svg_path5.attr("opacity", 0)
  svg_path6.attr("opacity", 0)
  svg_path7.attr("opacity", 1)
  svg_path8.attr("opacity", 1)
  svg_path9.attr("opacity", 1)
  svg_path10.attr("opacity", 0)
  svg_path11.attr("opacity", 0)
  svg_path12.attr("opacity", 0)
  svg_path13.attr("opacity", 0)
  svg_path14.attr("opacity", 0)
  svg_path15.attr("opacity", 0)
}

function updateData4() {
  y1.attr("opacity", 0)
  y2.attr("opacity", 0)
  y3.attr("opacity", 0)
  y4.attr("opacity", 1)
  y5.attr("opacity", 0)
  makey1.attr("opacity", 0)
  makey2.attr("opacity", 0)
  makey3.attr("opacity", 0)
  makey4.attr("opacity", 1)
  makey5.attr("opacity", 0)
  svg_path1.attr("opacity", 0)
  svg_path2.attr("opacity", 0)
  svg_path3.attr("opacity", 0)
  svg_path4.attr("opacity", 0)
  svg_path5.attr("opacity", 0)
  svg_path6.attr("opacity", 0)
  svg_path7.attr("opacity", 0)
  svg_path8.attr("opacity", 0)
  svg_path9.attr("opacity", 0)
  svg_path10.attr("opacity", 1)
  svg_path11.attr("opacity", 1)
  svg_path12.attr("opacity", 1)
  svg_path13.attr("opacity", 0)
  svg_path14.attr("opacity", 0)
  svg_path15.attr("opacity", 0)
}

function updateData5() {
  y1.attr("opacity", 0)
  y2.attr("opacity", 0)
  y3.attr("opacity", 0)
  y4.attr("opacity", 0)
  y5.attr("opacity", 1)
  makey1.attr("opacity", 0)
  makey2.attr("opacity", 0)
  makey3.attr("opacity", 0)
  makey4.attr("opacity", 0)
  makey5.attr("opacity", 1)
  svg_path1.attr("opacity", 0)
  svg_path2.attr("opacity", 0)
  svg_path3.attr("opacity", 0)
  svg_path4.attr("opacity", 0)
  svg_path5.attr("opacity", 0)
  svg_path6.attr("opacity", 0)
  svg_path7.attr("opacity", 0)
  svg_path8.attr("opacity", 0)
  svg_path9.attr("opacity", 0)
  svg_path10.attr("opacity", 0)
  svg_path11.attr("opacity", 0)
  svg_path12.attr("opacity", 0)
  svg_path13.attr("opacity", 1)
  svg_path14.attr("opacity", 1)
  svg_path15.attr("opacity", 1)
}