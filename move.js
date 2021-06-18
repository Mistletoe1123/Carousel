function move(obj, target) {
    //防抖 多个计时器同时
    if(obj.timer){
        clearInterval(obj.timer)
    }
    let leader = obj.offsetLeft;
    let step = 10;
    step = target > leader ? step : -step
    obj.timer = setInterval(function () {
        if (Math.abs(target - leader) > Math.abs(step)) {
            leader += step;
            obj.style.left = leader + 'px'
        }
        else {
            obj.style.left = target + 'px'
            clearInterval(obj.timer)
        }
    }, 15)
}