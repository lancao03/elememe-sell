export function formatDate(date, fmt) {
	//(y+) 以y开头，1个或者多个 
	//RegExp.$1 分组1
	//substr 截取 2 2-最后一个
	//replace
	//date.getFullYear()
	if(/(y+)/g.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.lenght));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	}
	for(let k in o) {
		if(new RegExp(`(${k})`,'g').test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
		}
	}
	return fmt
}

function padLeftZero(str) {
	return('00' + str).substr(str.length);
}