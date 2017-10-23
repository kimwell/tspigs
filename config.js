//正式接口地址
var HOST_ROOT = 'https://m.XXXX.com/v1.1/phone/common/';
//测试接口地址
// var HOST_ROOT = 'http://tspig.XXXX.cn/v1.1/phone/common/'

var CONFIG_INTERFACE = {
    interface: {
        // 获取书目 
        libBookList: HOST_ROOT + 'libBookList.json',
        // 搜索书目曲目
        searchCourceOrBook: HOST_ROOT + 'searchCourceOrBook.json',
        // 获取曲目
        libMusicList: HOST_ROOT + 'libMusicList.json',
    }
};
module.exports = CONFIG_INTERFACE;