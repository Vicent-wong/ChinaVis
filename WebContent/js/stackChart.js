//设置显示窗口大小
WIDTH = 790;
HEIGHT = 317;

var PADDING = {
    left: 80,
    right: 10,
    top: 10,
    bottom: 10
};

var AXISX;   // 三个比例尺

var numPeople = 0;  // 人数
var numLabels = 0;  // 类总数
var IDS = [];       // ID 集合
var LABELS = [];    // label 集合

var groupPeopleByLabel = [];
var columns = [];    //时间间隔

columns[0]="id";
for(var i=0;i<3962;i++){
	columns.push(i+"");
}
columns.push("label");

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

var svg00 = d3.select('#P_trace')
    .append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

d3.csv('../data/label9/reduce_day1_9.csv',function (error,dataLabel){
    if(error)
        console.log(error); //处理人员 LABEL
    processLabel(dataLabel);
    d3.csv('../data/trace/day1_10.csv', function (error, dataPath) {
        if (error)
            console.log(error);
        processPath(dataPath);      //处理人员轨迹
        DRAW(8);    //参数代表绘制某一类的人员栈图
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
    for(var i=0;i<dataPath.length;i++)
    {
        iter = dataPath[i];
        label = parseInt(iter['label']);
        id = parseInt(iter['id']);
        groupPeopleByLabel[label].push(iter);
        IDS.push(id);
    }
}

function DRAW(option)
{   //通过 option 筛选
    var data = groupPeopleByLabel[option];
    AXISX = d3.scale.linear()
        .domain([0, columns.length-2])
        .range([PADDING.left, WIDTH - PADDING.right]);
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
    var stackChartContainer = svg00.append('g')
        .attr('transform','translate('+0+','+PADDING.top+')')
    for(var index=0;index<numTimes;index+= 3)
    {
        iter = groupPeopleByPlace[index];
        stackChartContainer.append('g')
            .selectAll('rect')
            .data(calRatio(iter,HEIGHT - PADDING.top - PADDING.bottom))
            .enter()
            .append('rect')
            .attr('x',function(d){
                return AXISX(index);
            })
            .attr('y',function(d,i){
                return partSum(calRatio(iter,HEIGHT - PADDING.top - PADDING.bottom),i-1);
            })
            .attr('width',function(d,i){
                return (WIDTH-PADDING.left - PADDING.right)/columns.length*6;
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
            .on('mouseover',function(d,i){
                d3.select('#placeText')
                .text(function(){
                    return "Place: " + posZH[i];
                });
            })
    }
    var legend = svg00.append('g')
        .attr('id','myLegend')
        .selectAll('rect')
        .data(posZH)
        .enter()
        .append('rect')
        .attr('width',10)
        .attr('height',10)
        .attr('x',function(d,i){
            return PADDING.left/8;
        })
        .attr('y',function(d,i){
            return i*14 + PADDING.top;
        })
        .attr('stroke','black')
        .attr('strokw-width',0.5)
        .attr('fill',function(d,i){return colors[i];})
    var legendText = svg00.selectAll('text')
        .data(posZH)
        .enter()
        .append('text')
        .attr('x',function(d,i){
            return PADDING.left/8;
        })
        .attr('y',function(d,i){
            return i*14 + PADDING.top;
        })
        .attr('dx',18)
        .attr('dy',"1em")
        .attr('font-size',11)
        .text(function(d){return d;})
    var timeText = svg00.append('g')
        .append('text')
        .attr('id','mouseText')
        .attr('x',AXISX(0))
        .attr('y',PADDING.top)
        .attr('dx',5)
        .attr('dy','1em')
        .attr('text-anchor','left')
        .attr('font-size',14)
        .text('Time: 08:00:00');
    var placeText = svg00.append('g')
        .append('text')
        .attr('id','placeText')
        .attr('x',AXISX(0))
        .attr('y',PADDING.top)
        .attr('dx',5)
        .attr('dy','2em')
        .attr('text-anchor','left')
        .attr('font-size',14)
        .text('Place: 未到场');
    svg00.append('g')
        .attr('transform','translate('+0+','+PADDING.top+')')
        .append('line')
        .attr('id','timeLine')
        .attr('fill','none')
        .attr('stroke','black')
        .attr('stroke-width',0.5)
        .attr('x1',-100)
        .attr('x2',-100)
        .attr('y1',0)
        .attr('y2',partSum(calRatio(iter,HEIGHT - PADDING.top - PADDING.bottom),9)+4);
    svg00.on('mousemove',function(){
        WIDTH = 790;
        HEIGHT = 317;
        var mouse = d3.mouse(this);
        var posx = mouse[0];
        // var posy = mouse[1];

        var deltaX = posx - AXISX(0);
        if(deltaX <= 0)
            deltaX = 0;
        if(deltaX > WIDTH - PADDING.right)
            deltaX = WIDTH - PADDING.right;
        var seconds = deltaX / (WIDTH - PADDING.right - PADDING.left) * (columns.length - 2)*10;
        d3.select('#mouseText')
            .text(function(){
                return "Time: " + translateToTime(parseInt(seconds),8,0,0);
            });
        d3.select('#timeLine')
            .attr('x1',function(){
                if(posx < PADDING.left)
                    return PADDING.left;
                else if(posx > WIDTH - PADDING.right)
                    return WIDTH - PADDING.right;
                else
                    return posx;
            })
            .attr('x2',function(){
                if(posx < PADDING.left)
                    return PADDING.left;
                else if(posx > WIDTH - PADDING.right)
                    return WIDTH - PADDING.right;
                else 
                    return posx;
            });
    })

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

function translateToTime(seconds, startHour,startMinute,startSecond)
{
    var hour = parseInt(seconds/3600);
    var minute = parseInt((seconds - hour*3600)/60);
    var second = seconds - hour*3600 - minute*60;
    var retHour = startHour + hour;
    var retMinute = startMinute + minute;
    var retSecond = startSecond + second;
    if(retHour < 10)
        retHour = "0" + retHour;
    if(retMinute < 10)
        retMinute = "0" + retMinute;
    if(retSecond < 10)
        retSecond = "0" + retSecond;
    return retHour + ":" + retMinute + ":" + retSecond;
}