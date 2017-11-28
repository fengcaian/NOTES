//思路：找到将两个数字（转换为数组）前面补零，再新建一个与前者长度一致的数组，值为0，如下：
var b = '058954545789896666545441369885410255';//前面补零是考虑进位
var a = '000000000043525346454353513134334534';
var c = '000000000000000000000000000000000000';
/*（需转换为数组）
然后for循环，从最后一位开始相加，看其结果是否大于10，若大于，则c数组对应的位置上设置为相加的和的个位数字，小于则直接设置为加和
代码实现：*/
var a = '43525346454353513134334534';
var b = '58954545789896666545441369885410255';
var arr = a.split(''),
    brr = b.split('');
var aLength = arr.length;
var bLength = brr.length;
var l = aLength > bLength ? aLength+1 : bLength+1;
var ll = aLength - bLength;
ll = Math.sqrt(ll*ll);
var crr = [];
for(var j=0;j<l;j++){
    crr.push('0');
}
if(aLength > bLength || aLength == bLength) {
    arr.unshift('0');
    for(var i=0;i<ll+1;i++){
        brr.unshift('0');
    }
}else{
    brr.unshift('0');
    for(var i=0;i<ll+1;i++){
        arr.unshift('0');
    }
}
var lk = l-1;
for(;lk>0;lk--){
    var aa = Number(arr[lk]);
    var bb = Number(brr[lk]);
    var cc = Number(crr[lk]);
    var s = aa+bb+cc;
    if(s < 10){
        crr[lk]= s+'';
    }else{
        crr[lk]=s%10+'';
        crr[lk-1]=1+'';
    }
}
console.log(arr);
console.log(brr);
console.log(crr);
/*
最后的crr就是结果，只不过保存为数组形式，对数组处理可以将其转化为最终的结果
代码很差，一时性起所写，慢慢优化。*/
//大数字相减同样的思路，进位与借位的差别：第一个就是c[lk-1]的地方，进位设置为1，借位设置为-1；第二个就是减数值在加和的时候全部转换为负值即可
