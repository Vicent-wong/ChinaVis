//设置显示窗口大小

WIDTH = 470;
HEIGHT = 317;

var padding = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
};

var colors=[];
var color = [
    'yellow', 'red', 'green', 'steelblue',
    'blue', 'lime', 'coral', 'purple',
    'brown', 'pink'
];
var Color_Index=[0,0,0,0,0,0,0,0,0,0];
colors.push(d3.rgb(255,192,193));
colors.push(d3.rgb(123,104,238));
colors.push(d3.rgb(135,206,250));
colors.push(d3.rgb(0,250,154));
colors.push(d3.rgb(255,255,0));
colors.push(d3.rgb(205,149,12));
colors.push(d3.rgb(255,0,0));
colors.push(d3.rgb(0,100,0));
colors.push(d3.rgb(255,215,0));
colors.push(d3.rgb(0,139,139));

var svg0 = d3.select('#win')
    .append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

d3.csv('../data/label9/day1_9.csv', function (error, data) {
    if (error)
        console.log(error);
    //console.log(data);
    draw(data);
});


// var pie = d3.pie()
//     .sort(null)
//     .value(function (d) {
//         return d;
//     });
var trans=0;
var labels = [];    //标签
var ids = [];       //ID
var labelClass = [];//统计
var maxLabel = 0;   //最大标签
var minLabel = 0;   //最小标签
var labelSum = 0;   //标签总数
var numPeople = 0;  //人数
var maxR = Math.min(WIDTH, HEIGHT) / 2 - padding.top - padding.bottom; //外半径
var maxR = maxR / 2;// 外半径调整
var ringWidth = 40; //圆环宽度
var reachOUTline = ringWidth; //直线延展长度
var minR = maxR - ringWidth; //内半径

function draw(data) {
    initialData(data);  //初始化数据
    labelSum = maxLabel - minLabel + 1;
    for (var i = 0; i < labelSum; i++)
        labelClass[i] = 0;
    // 统计，类别为 labels[i] 的作为下标让 labelClass ++
    for (var i = 0; i < numPeople; i++)
        labelClass[labels[i]]++;
    drawPieChart(); //画饼图
}

function drawPieChart() {
    var pieGroup = svg0.append('g')
        .attr('id', 'pieGroup')
        .attr('transform', 'translate(' + (WIDTH / 2-trans) + ',' + (HEIGHT / 2) + ')');
    var partRatio = countRatio(labelClass, Math.PI * 2);    //计算labelClass 每一个分量所占的比例，第二个参数为缩放比例尺
    var arc = d3.svg.arc()
        .innerRadius(minR)
        .outerRadius(maxR)
        .startAngle(function (d, i) {
            return partSum(partRatio, i - 1);
        })
        .endAngle(function (d, i) {
            return partSum(partRatio, i);
        })
        .padAngle(0.2 * Math.PI / 180)//白色间距
        .cornerRadius(5);    //扇形圆角

    var path = svg0.select('g')
        .selectAll('path')
        .data(partRatio)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d, i) {
            return color[i];
        })
        .attr('stroke', 'white')
        .attr('stroke-width', 0.5)
        .on("click",function(d,i){
        	$("#P_trace").innerHTML = '<object type="text/html" data="../html_trace/stackCharts.html"></object>';
        	$("._F"+i).attr("fill",function(d){
        		if(Color_Index[i]==0){
        			return color[i];
        		}else{
        			return color[9];
        		}
        		//return color[i];
        	});
        		
        	$("._S"+i).attr("fill",function(d){
        		if(Color_Index[i]==0){
        			return color[i];
        		}else{
        			return color[9];
        		}
        		//return color[i];
        	});
        	if(Color_Index[i]==0)
        		Color_Index[i]=1;
        	else {
				Color_Index[i]=0;
			}
        	document.getElementById("button").value=0;
        	$('.myli').each(function(i){
                this.setAttribute("style","background-color:rgba(248,248,255,0.5)");
           }); 
        });
    var centroid = svg0.append('g')
        .attr('id', 'textGroup')
        .attr('transform', 'translate(' + (WIDTH / 2-trans) + ',' + (HEIGHT / 2) + ')')
        .selectAll('circle')
        .data(partRatio)
        .enter()
        .append('circle')
        .attr('r', '3')
        .attr('cx', function (d, i) {
            return arc.centroid(d, i)[0];   //圆弧中心点 x 坐标
        })
        .attr('cy', function (d, i) {
            return arc.centroid(d, i)[1];   //圆弧中心点 y 坐标
        })
        .attr('fill', 'black')
        .attr('opacity', 0.7);
    //绘制放射线
    var lineGroup = svg0.append('g')
        .attr('id', 'lineGroup')
        .attr('transform', 'translate(' + (WIDTH / 2-trans) + ',' + (HEIGHT / 2) + ')')
        .selectAll('line')
        .data(partRatio)
        .enter()
        .append('line')
        .attr('x1', function (d, i) {
            return arc.centroid(d, i)[0];
        })
        .attr('y1', function (d, i) {
            return arc.centroid(d, i)[1];
        })
        .attr('x2', function (d, i) {
            var x = arc.centroid(d, i)[0];
            var y = arc.centroid(d, i)[1];
            var dis = Math.sqrt(x * x + y * y);
            return x / dis * (dis + reachOUTline);
        })
        .attr('y2', function (d, i) {
            var x = arc.centroid(d, i)[0];
            var y = arc.centroid(d, i)[1];
            var dis = Math.sqrt(x * x + y * y);
            var extendY = 1 / Math.abs(x/maxR);
            if(y > 0)
                return y / dis * (dis + reachOUTline) + extendY;
            else
                return y / dis * (dis + reachOUTline) - extendY;
        })
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('opacity', 0.7)
        .attr('fill', 'none');
    //绘制水平线
    var lineGroup = svg0.append('g')
        .attr('id', 'exlineGroup')
        .attr('transform', 'translate(' + (WIDTH / 2-trans) + ',' + (HEIGHT / 2) + ')')
        .selectAll('line')
        .data(partRatio)
        .enter()
        .append('line')
        .attr('x1', function (d, i) {
            var x = arc.centroid(d, i)[0];
            var y = arc.centroid(d, i)[1];
            var dis = Math.sqrt(x * x + y * y);
            return x / dis * (dis + reachOUTline);
        })
        .attr('y1', function (d, i) {
            var x = arc.centroid(d, i)[0];
            var y = arc.centroid(d, i)[1];
            var dis = Math.sqrt(x * x + y * y);
            var extendY = 1 / Math.abs(x/maxR);
            if(y > 0)
                return y / dis * (dis + reachOUTline) + extendY;
            else
                return y / dis * (dis + reachOUTline) - extendY;
        })
        .attr('x2', function (d, i) {
            var x = arc.centroid(d, i)[0];
            var y = arc.centroid(d, i)[1];
            if (x < 0)
                return -maxR - reachOUTline;
            else
                return maxR + reachOUTline;
        })
        .attr('y2', function (d, i) {
            var x = arc.centroid(d, i)[0];
            var y = arc.centroid(d, i)[1];
            var dis = Math.sqrt(x * x + y * y);
            var extendY = 1 / Math.abs(x/maxR);
            if(y > 0)
                return y / dis * (dis + reachOUTline) + extendY;
            else
                return y / dis * (dis + reachOUTline) - extendY;
        })
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('opacity', 0.7)
        .attr('fill', 'none');
    //文字组
    var text = svg0.append('g')
        .attr('id', 'textGroup')
        .attr('transform', 'translate(' + (WIDTH / 2-trans) + ',' + (HEIGHT / 2) + ')')
        .selectAll('text')
        .data(partRatio)
        .enter()
        .append('text')
        .attr('x', function (d, i) {
            var x = arc.centroid(d, i)[0];
            if (x < 0)
                return -maxR - reachOUTline;
            else
                return maxR  + reachOUTline;
        })
        .attr('y', function (d, i) {
            var x = arc.centroid(d, i)[0];
            var y = arc.centroid(d, i)[1];
            var dis = Math.sqrt(x * x + y * y);
            var extendY = 1 / Math.abs(x/maxR);
            if(y > 0)
                return y / dis * (dis + reachOUTline) + extendY;
            else
                return y / dis * (dis + reachOUTline) - extendY;
        })
        .attr('dx', function (d, i) {
            var x = arc.centroid(d, i)[0];
            if(x > 0)
                return "0.25em";
            else
                return "-2em";
        })
        .attr('dy', function (d, i) {
            return "0.4em";
        })
        .text(function (d, i) {
            return labelClass[i];
        });
}

function initialData(data) {
    var items = data.length;
    numPeople = items;
    var ID = null;
    var label = null;
    for (var i = 0; i < items; i++) {
        ID = parseInt(data[i]['id']);
        label = parseInt(data[i]['label']);
        ids.push(ID);
        labels.push(label);
        if (label > maxLabel)
            maxLabel = label;
        if (label < minLabel)
            minLabel = label;
    }
    // console.log(maxLabel + ":" + minLabel)
}

function countRatio(array, spacing) {
    var length = array.length;
    var retValue = [];
    var sum = d3.sum(array);
    for (var i = 0; i < length; i++)
        retValue[i] = array[i] / sum * spacing;
    return retValue;
}

function partSum(array, index) { //计算 0 到 index 的部分和
    if (index < 0)
        return 0;
    else
        return array[index] + partSum(array, index - 1);
}