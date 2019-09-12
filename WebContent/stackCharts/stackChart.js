//设置显示窗口大小
WIDTH = document.body.clientWidth;
HEIGHT = document.body.clientHeight;

var padding = {
    left: 30,
    right: 30,
    top: 30,
    bottom: 30
};

var axisX;   // 三个比例尺

var numPeople = 0;  // 人数
var numLabels = 0;  // 类总数
var IDS = [];       // ID 集合
var LABELS = [];    // label 集合

var groupPeopleByLabel = [];
var columns = 0;    //时间间隔

var colors = [
    'AliceBlue','antiquewhite','coral','steelblue',
    'lime','limegreen','silver','yellowgreen',
    'yellow','gold','orange','pink',
    'blue','green','darkgreen','brown',
    'blueviolet','red','purple','white',
    'aquamarine'
];

var posZH = [
    "未到场","主会场","展示厅","厕所",
    "room1","room2","海报区","分会场 A",
    "分会场 B","分会场 C","分会场 D","签到处",
    "服务台","room3","room4","休闲区",
    "room5","餐厅","room6","一楼走廊",
    "二楼走廊"
];

// var position = [
//     "zhuhuichang", "zhanting", "room1",
//     "room2", "haibaoqu", "A", "B", "C",
//     "D", "qiandao", "fuwu", "room3",
//     "room4", "room5", "room6", "blank"
// ];

// var posZH=
// ["主会场","展示厅","房间  1","房间  2",
// "海报区","分场 A","分场 B","分场 C","分场 D",
// "签到处","服务区","房间 3","房间 4",
// "房间 5","房间 6","空地"];



// var colors = [

// ]

var svg = d3.select('body')
    .append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

d3.csv('reduce_day1_9.csv',function (error,dataLabel){
    if(error)
        console.log(error); //处理人员 LABEL
    processLabel(dataLabel);
    d3.csv('day1_10_.csv', function (error, dataPath) {
        if (error)
            console.log(error);
        processPath(dataPath);      //处理人员轨迹
        draw(8);    //参数代表绘制某一类的人员栈图
    });
});

function processLabel(dataLabel)
{   //统计类别信息
    for(var i=0;i<9;i++)
        groupPeopleByLabel[i] = [];
}

function processPath(dataPath)
{   //将读入的成员轨迹分类
    numPeople = dataPath.length;
    var iter = null;
    var id = 0;
    var label = 0;
    columns = dataPath.columns;
    for(var i=0;i<dataPath.length;i++)
    {
        iter = dataPath[i];
        label = parseInt(iter['label']);
        id = parseInt(iter['id']);
        groupPeopleByLabel[label].push(iter);
        IDS.push(id);
    }
}

function draw(option)
{   //通过 option 筛选
    var data = groupPeopleByLabel[option];
    console.log(data.length)
    axisX = d3.scaleLinear()
        .domain([0, columns.length-2])
        .range([padding.left, WIDTH - padding.right]);
    var numPlaces = 21;
    var numTimes = columns.length-2;
    var groupPeopleByPlace = [];    //通过地点将人员分开
    for(var i=0;i<numTimes;i++)
    {
        groupPeopleByPlace[i] = [];
        for(var j=0;j<numPlaces;j++)
            groupPeopleByPlace[i][j] = 0;
    }
    var placeNo = 0;
    var item = null;
    for(var i=0;i<data.length;i++)
    {
        iter = data[i];
        for(var j=0;j<numTimes;j++)
        {
            item = iter[columns[j+1]];
            groupPeopleByPlace[columns[j+1]][parseInt(item)]++;
        }
    }
    //groupPeopleByPlace 行表示时间，列表示地点
    var stackChartContainer = svg.append('g')
        .attr('transform','translate('+0+','+padding.top/2+')')
    for(var index=0;index<numTimes;index+= 3)
    {
        iter = groupPeopleByPlace[index];
        stackChartContainer.append('g')
            .selectAll('rect')
            .data(calRatio(iter,HEIGHT - padding.top - padding.bottom))
            .enter()
            .append('rect')
            .attr('x',function(d){
                return axisX(index);
            })
            .attr('y',function(d,i){
                return partSum(calRatio(iter,HEIGHT - padding.top - padding.bottom),i-1);
            })
            .attr('width',function(d,i){
                return (WIDTH-padding.left - padding.right)/columns.length*6;
                // return 10
            })
            .attr('height',function(d,i){
                return d;
            })
            // .attr('stroke','black')
            // .attr('stroke-width',0.5)
            .attr('fill',function(d,i){
                return colors[i];
            })
    }
    var legend = svg.append('g')
        .attr('id','myLegend')
        .selectAll('rect')
        .data(posZH)
        .enter()
        .append('rect')
        .attr('width',15)
        .attr('height',15)
        .attr('x',function(d,i){
            return padding.top + 5;
        })
        .attr('y',function(d,i){
            return i*20 + padding.top - 10;
        })
        .attr('stroke','black')
        .attr('strokw-width',0.5)
        .attr('fill',function(d,i){return colors[i];})
    var legendText = svg.selectAll('text')
        .data(posZH)
        .enter()
        .append('text')
        .attr('x',function(d,i){
            return padding.top + 5;
        })
        .attr('y',function(d,i){
            return i*20 + padding.top - 10;
        })
        .attr('dx',20)
        .attr('dy',"1em")
        .attr('font-size',12)
        .text(function(d){return d;})
}

function calRatio(array, factor)
{
    var sum = d3.sum(array);
    var retRatio = [];
    for(var i=0;i<array.length;i++)
        retRatio[i] = array[i]/sum * factor;
    return retRatio;
}

function partSum(array, index)
{
    var sum = 0;
    for(var i=0;i<=index;i++)
        sum += array[i];
    return sum;
}