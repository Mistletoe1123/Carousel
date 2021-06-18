/**
 * 
 * @param {Object} el 一个需要运动的DOM元素
 * @param {Number} target DOM元素运动的距离目标
 */
class Bbox {
    $ = id => document.getElementById(id)
    _c = tagName => document.createElement(tagName)
    constructor() {
        this.box = this.$('box')
        this.uu = this.box.children[0];
        this.dir = this.box.children[1];
        this.lis = this.uu.children;
        this.left = this.dir.children[0];
        this.right = this.dir.children[1];
        this.pcindex = 0;
        //视口 一个宽度
        this.liWidth = this.lis[0].offsetWidth;
        this.uuWidth = this.lis.length * this.liWidth + 'px'
        this.uu.style.width = this.uuWidth
        this.circul = false
        this.delay = null;
    }


    mouseEvent = () => {
        this.box.onmouseenter = () => {
            this.dir.style.display = 'block'
            clearInterval(this.tim)
        }
        this.box.onmouseleave = () => {
            this.dir.style.display = 'none'
            this.autoPlay(this.timer)
        }

        this.left.onclick = () => {
            if (this.delay) {
                clearTimeout(this.delay)
            }
            this.delay = setTimeout(() => {
                this.pre()
            }, 500)
        }
        this.right.onclick = () => {
            if (this.delay) {
                clearTimeout(this.delay)
            }
            this.delay = setTimeout(() => {
                this.next()
            }, 500)
        }

    }
    pre = () => {
        this.pcindex--;
        console.log(this.pcindex);
        if (this.pcindex < 0 && this.circul) {
            this.uu.style.left = -(this.lis.length - 1) * this.liWidth + 'px'
            this.pcindex = this.lis.length - 2
        } else {
            if (this.pcindex < 0) {
                this.pcindex = this.lis.length - 1
            }
        }
        this.slider()
        this.bindLight()
    }
    next = () => {
        this.pcindex++;
        console.log(this.pcindex);
        if (this.pcindex === this.lis.length && this.circul) {
            this.uu.style.left = '0'
            this.pcindex = 1
        } else {
            if (this.pcindex === this.lis.length) {
                this.pcindex = 0
            }
        }
        this.slider()
        this.bindLight()
    }


    //位置确定好后移动位置
    slider() {
        move(this.uu, -this.pcindex * this.liWidth)
    }

    //创建下面span，点击按钮对应按钮高亮
    show() {
        let circleEl = this._c('div')
        circleEl.id = 'circle'
        circleEl.class = 'circle'
        for (let i = 0; i < this.lis.length; i++) {
            let span = this._c('span')
            span.innerText = i + 1
            //span[i] = i
            span.index = i//i是span的索引

            span.onclick = () => {
                //点击划到相应图片
                this.pcindex = i//图片索引=span索引 再移动位置
                this.slider()


                //获取每个span
                let spans = span.parentNode.children
                //console.log(span);
                for (let j = 0; j < spans.length; j++) {
                    spans[j].className = ""
                }
                span.className = 'active'
            }
            //图片切换和高亮按钮绑定
            circleEl.appendChild(span)
        }
        this.circleEl = circleEl;
        this.box.appendChild(circleEl)
    }

    //滑动图片对应按钮高亮
    bindLight() {
        if (this.circleEl) {
            let spans = this.circleEl.children
            for (let i = 0; i < spans.length; i++) {
                spans[i].className = ""
            }
            if (this.pcindex === this.lis.length - 1 && this.circul) {
                spans[0].className = 'active'
                return
                //手动处理最后一个className不高亮
            }
            spans[this.pcindex].className = 'active'
        }
    }


    //无缝
    circular = () => {
        //克隆
        let lastPic = this.lis[0].cloneNode(true)
        this.uu.appendChild(lastPic)
        //ul宽度 加上一张图的宽度
        this.uu.style.width = this.lis.length * this.liWidth + 'px'
        this.circul = true
    }

    autoPlay = (timer = 1000) => {
        this.timer = timer//第二次继续使用用户传入的时间间隔
        window.onblur = () => {
            if (this.tim) { clearInterval(this.tim) }
        }
        window.onfocus = () => {
            this.autoPlay(this.timer)
        }


        this.tim = setInterval(() => {
            this.next()
        }, timer)
    }

}




let dd = new Bbox();
dd.mouseEvent();
dd.show();//指示器
dd.bindLight();//下面按钮高亮
dd.circular();
dd.autoPlay(1000);