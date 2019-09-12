

//判断该点是否出去
  function goout(obj){
		if((parseInt(obj.y)==5)&&(parseInt(obj.x)==15))
			return true;
		if((parseInt(obj.y)==7)&&(parseInt(obj.x)==15))
			return true;
		if((parseInt(obj.y)==15)&&(parseInt(obj.x)==15))
			return true;
		if((parseInt(obj.y)==17)&&(parseInt(obj.x)==15))
			return true;
		if((parseInt(obj.y)==19)&&(parseInt(obj.x)==0))
			return true;
		
		return false;
	}


//寻找下标
function findIndex(time,array){
	var index=0;
	while(array[index].time<=time)
		index++;
	return index;
}

function rep(arr) {
	var res = [];
	var json = {};
	for(var i = arr.length-1; i >=0; i--){
        if(!json[parseInt(arr[i].id)-10000]){
		    res.unshift(arr[i]);
		    json[parseInt(arr[i].id)-10000] = 1;
		}
	}
	return res;
}



