var EventUtil = {
    addHnadler:function (element, type, handler){
        if(element.addEventListener){
            element.addEventListener(type, handler, false);
        }else if(element.attachEvent){
            element.attachEvent('on'+type, handler);
        }else{
            element['on'+type]=handler;
        }
    },
    removeHnadler:function (element, type, handler){
        if(element.removeEventListener){
            element.removeEventListener(type, handler, false);
        }else if(element.detachEvent){
            element.detachEvent('on'+type, handler);
        }else{
            element['on'+type]=null;
        }
    },
    getEvent:function (event){
        return event ? event : window.event;
    },
    getTarget:function(event){
        return event.target || event.srcElement;
    },
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    stopPropagation:function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    }
};
/*该Util用于浏览器的兼容性处理，该Util不支持事件捕获
适合事件委托的事件有：click,mousedown,mouseup,keydown,keyup,keypress*/
var list = document.getElementById('ul');
EventUtil.addHnadler(list, 'click', function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    switch (target.id) {
        case 'id1':
            console.log('do something');
            break;
        case 'id2':
            console.log('do something');
            break;
        case 'id3':
            console.log('do something');
            break;
    }
});
/*所有事件都会经历capture phase,只有部分事件会经历bubble phase,不会冒泡的事件：submit,change...
    实现事件模型：
核心需求：可以对某个事件名称绑定多个事件处理函数，然后触发该事件，依次按照事件处理函数绑定的顺序执行
原理：写一个类或匿名函数，有两个函数，一个bind用于替事件名称绑定事件处理函数，一个trigger函数用于触发事件，在二者外面，建立一个对象，用于保存事件名称和与之对应的事件处理函数，
bind时，若字典里没有该事件名称，则创建一个，key是事件名称，value是数组，保存事件处理函数，trigger时依次调用
实现：*/
var EventModel = {
    listener:{},
    bind: function(eventName){
        var listenerCbArr = this.listener[eventName] || [];
        var cbFromArgs = Array.prototype.slice.call(arguments, 1);
        cbArr = listenerCbArr.reduce(function(arr, cb){
            return arr.push(cb);
        },cbFromArgs);
        this.listener[eventName] = cbFromArgs;
    },
    trigger: function(eventName){
        if(!this.listener.hasOwnProperty(eventName)){
            console.log('事件未绑定');
            return;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        var listenerCbArr = this.listener[eventName];
        var _this = this;
        listenerCbArr.forEach(function(callback){
            try{
                callback.call(_this, args);
            }catch(e){
                console.log(e);
            }
        });
    },
    unbind: function(eventName, callback){
        this.listener[eventName] && delete this.listener[eventName];
        callback && callback();
    }
}
EventModel.bind('event1', function(){
    console.log('绑定成功1');
    Array.prototype.forEach.call(arguments, function(item){
        console.log('参数是：'+item);
    });
},function(){
    console.log('哈哈，我也被绑定了');
    console.log('传给我的参数是：'+Array.prototype.slice.call(arguments));
});
EventModel.bind('event2', function(){
    console.log('绑定成功2');
    Array.prototype.forEach.call(arguments, function(item){
        console.log('参数是：'+item);
    });
});
EventModel.trigger('event1','aa','bb');
EventModel.trigger('event2','aa','bb','cc');
EventModel.unbind('event1', function (){
    console.log('解除event1的事件绑定');
});
EventModel.trigger('event1', 'aaa','bbb');