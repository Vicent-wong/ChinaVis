//设置显示窗口大小
// WIDTH = document.body.clientWidth;
// HEIGHT = document.body.clientHeight;
WIDTH =470;
HEIGHT = 370;

var padding = {
    left: 70,
    right: 80,
    top: 20,
    bottom: 95
};

var axisX, axisY, axisRadius;   // 三个比例尺
var axisPeopleBar;

var numPeople = 0;  // 人数
var numLabels = 0;  // 类总数
var IDS = [];       // ID 集合
var labels = [];    // label 集合
var matrix = [];    // 所有地点为一组，共 numLables 组
var max_Time = 0;    // 停留的最长时间

var svg = d3.select('#win')
    .append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

d3.csv('../data/groupAnalysis/reduce_day2_9.csv', function (error, data) {
    if (error)
        console.log(error);
    // 对象转为数组的办法，可以计算长度
    // console.log(Object.keys(table1969[0]).length);
    // console.log(data);
    draw(data);
});

var colors = [
	'yellow', 'red', 'green', 'steelblue',
    'blue', 'lime', 'coral', 'purple',
    'brown', 'pink'
];

var position = [
    "zhuhuichang", "zhanting", "room1",
    "room2", "haibaoqu", "A", "B", "C",
    "D", "qiandao", "fuwu", "room3",
    "room4", "room5", "room6", "blank"
];

var posZH=
["主会场","展示厅","房间  1","房间  2",
"海报区","分场 A","分场 B","分场 C","分场 D",
"签到处","服务区","房间 3","房间 4",
"房间 5","房间 6","空地"];

function draw(data) {
    generateID(data);
    //添加坐标系
    axisX = d3.scale.linear()
        .domain([0, numLabels])
        .range([padding.left, WIDTH - padding.right]);
    axisY = d3.scale.linear()
        .domain([0, position.length])
        .range([HEIGHT - padding.bottom, padding.top]);
    axisRadius = d3.scale.linear()
        // .domain([0,max_Time])
        // .domain([0,Math.log(max_Time)])
        .domain([0,Math.sqrt(max_Time)])
        .range([1,d3.min([WIDTH/numLabels/2, HEIGHT/position.length/2])]);
    axisPeopleBar = d3.scale.linear()
        .domain([0,1200])
        .range([1,axisX(1) - axisX(0)]);

    svg.append('g')
        .append('line')
        .attr('id','coordinateX')
        .attr('x1',axisX(0.3))
        .attr('y1',-10)
        .attr('x2',WIDTH - padding.right)
        .attr('y2',-10)
        .attr('stroke','black')
        .attr('stroke-width',1)
        .attr('stroke-dasharray',3)
        .attr('opacity',0.8)

    svg.append('g')
        .append('line')
        .attr('id','coordinateY')
        .attr('x1',-10)
        .attr('y1',padding.top)
        .attr('x2',-10)
        .attr('y2',HEIGHT - padding.bottom)
        .attr('stroke','black')
        .attr('stroke-width',1)
        .attr('stroke-dasharray',3)
        .attr('opacity',0.8)

    svg.append('g')
        .append('text')
        .attr('id','numpeopleText')
        .attr('x',axisX(5))
        .attr('y',axisY(6.5))
        .attr('font-size',WIDTH/6)
        .attr('text-anchor','middle')
        .attr('color','gray')
        .attr('opacity',0.15)
        .text("0")
    
    //添加人员数量bar 
    var peopleBar = svg.append('g')
        .attr('transform','translate('+0+','+0+')')
        .selectAll('rect')
        .data(matrix)
        .enter()
        .append('rect')
        .attr('x',function(d,i){
            var seqClass = parseInt(i/position.length);
            var numPeople = sumNotZero(d);
            var cirlceRadius = axisRadius(Math.sqrt(d3.mean(d)));
            var barWidth = axisPeopleBar(numPeople) + 2*cirlceRadius;
            return axisX(seqClass+1) - barWidth/2;
        })
        .attr('y',function(d,i){
            var seqPosition = parseInt(i%position.length);
            return axisY(seqPosition+1)-1;
        })
        .attr('width',function(d,i){
            var numPeople = sumNotZero(d);
            var cirlceRadius = axisRadius(Math.sqrt(d3.mean(d)));
            return axisPeopleBar(numPeople) + 2*cirlceRadius;
        })
        .attr('height',function(d,i){
            return 2;
        })
        .attr('fill',function(d,i){
            return colors[parseInt(i/position.length)];
        })
        .attr('stroke','white')
        .attr('stroke-width',1)
        .on('mouseover',function(d){
            //在这里输出人数
            var num = sumNotZero(d);
            d3.select('#numpeopleText')
                .text(num);
        })
        .on('mouseout',function(){
            d3.select('#numpeopleText')
                .text(0);
        })
    // 添加圆
    var circles = svg.append('g')
        .attr('transform', 'translate(' + 0 + ',' + 0 + ')')
        .selectAll('circle')
        .data(matrix)
        .enter()
        .append('circle')
        .attr('cx',function(d,i){
            // 求类别并转换为横坐标
            var seqClass = parseInt(i/position.length);
            return axisX(seqClass+1);
        })
        .attr('cy',function(d,i){
            // 求地点并转换为纵坐标
            var seqPosition = parseInt(i%position.length);
            return axisY(seqPosition+1);
        })
        .attr('r',function(d,i){
            //圆的半径，取均值，可以用其他的尝试
            // if(d3.mean(d)== 0)
            //     return 0;
            // else
            //     return axisRadius(Math.log(d3.mean(d)))
            return axisRadius(Math.sqrt(d3.mean(d)))
            // return axisRadius(d3.max(d))
            // return axisRadius((d3.max(d) + d3.min(d))/2)
            // return axisRadius(d3.mean(d));
            // return axisRadius(d3.variance(d)/300);
            // return axisRadius(Math.sqrt(d3.variance(d))*10);
        })
        .attr('fill',function(d,i){
            return colors[parseInt(i/position.length)];
        })
        .attr('stroke','white')
        .attr('stroke-width',0.5)
        .on('mouseover',function(d){
            //在这里输出人数
            var num = sumNotZero(d);
            d3.select('#numpeopleText')
                .text(num);
        })
        .on('mouseout',function(){
            d3.select('#numpeopleText')
                .text(0);
        })

    // 横坐标
    // svg.append('g')
    //     .attr('class','axisX')
    //     .attr('transform','translate(' + 0 + ',' + (HEIGHT - padding.top) + ')')
    //     .call(d3.axisBottom(axisX).ticks(numLabels).tickSize(5))
    //     .attr('font-size',10)
    svg.append('g')
        .selectAll('text')
        .data([1,2,3,4,5,6,7,8,9])
        .enter()
        .append('text')
        .attr('x',function(d){return axisX(d);})
        .attr('y',axisY(0))
        .attr('dx',0)
        .attr('dy',"1em")
        .attr('font-size',12)
        .attr('text-anchor','middle')
        .text(function(d){return "类别 " + d;})

    //添加文字
    svg.append('g')
        .selectAll('text')
        .data(posZH)
        .enter()
        .append('text')
        .attr('x',axisX(-0.3))
        .attr('y',function(d,i){return axisY(i+1);})
        .attr('dx',0)
        .attr('dy',"0.5em")
        .attr('font-size',12)
        .attr('text-anchor','middle')
        .text(function(d){return d;});


    svg.on('mousemove',function(){
        var mouse = d3.mouse(this);
        var posx = mouse[0];
        var posy = mouse[1];
        if(posx < padding.left)
            posx = padding.left;
        if(posx > WIDTH - padding.right)
            posx = WIDTH - padding.right;
        if(posy < padding.top)
            posy = padding.top;
        if(posy > HEIGHT - padding.bottom)
            posy = HEIGHT - padding.bottom;
        d3.select('#coordinateX')
            .attr('y1',posy)
            .attr('y2',posy);
        d3.select('#coordinateY')
            .attr('x1',posx)
            .attr('x2',posx);
    });

    svg.append('g')
        .attr('id','radiusLegend')
        .append('circle')
        .attr('cx',axisX(10))
        .attr('cy',axisY(16))
        .attr('r',10)
        .attr('fill','darkgray');
    svg.append('g')
        .attr('id','lengthLegend')
        .append('rect')
        .attr('fill','red')
        .attr('stroke','white')
        .attr('stroke-width',1)
        .attr('x',axisX(10.6))
        .attr('y',axisY(16))
        .attr('width',3)
        .attr('height',axisY(14) - axisY(16));
    svg.append('g')
        .attr('id','radiusLegendText')
        .append('text')
        .attr('x',axisX(10))
        .attr('y',axisY(16.3))
        .attr('dx',15)
        .attr('dy',8)
        .attr('font-size',12)
        .text('停留时间')
        .attr('transform','rotate(90,'+axisX(10) + ' ' + axisY(16) + ')');
    svg.append('g')
        .attr('id','barLegendText')
        .append('text')
        .attr('x',axisX(10.6))
        .attr('y',axisY(14))
        .attr('dx',5)
        .attr('dy',4)
        .attr('font-size',12)
        .text('人数')
        .attr('transform','rotate(90,'+axisX(10.6) + ' ' + axisY(14) + ')');

}

//计算数组中不为 0 的元素个数
function sumNotZero(d)
{
    var N=d.length;
    var sum = 0;
    for(var i=0;i<N;i++)
        if(d[i] != 0)
            sum++;
    return sum;
}

function generateID(data) {
    //遍历数组处理数据
    var numPeople = data.length;

    var item = null;
    var LABEL = 0;
    numLabels = 0;
    for(var i=0;i<numPeople;i++)
    {
        item = data[i];
        IDS.push(parseInt(item["id"]));
        LABEL = parseInt(item["label"]);
        labels.push(LABEL);
        if(LABEL >= numLabels)
            numLabels = LABEL + 1;
    }
    for(var i=0;i<position.length * numLabels;i++)
        matrix[i] = [];

    var index = null;
    var itemLabel = null;
    for(var i=0;i<numPeople;i++)
    {
        item = data[i];
        itemLabel = data[i]["label"];
        for(var j=0;j<position.length;j++)
        {
            index = item[position[j]];
            matrix[parseInt(itemLabel) * position.length + j].push(parseInt(index));
            if(parseInt(index) > max_Time)
                max_Time = parseInt(index);
        }
    }
}