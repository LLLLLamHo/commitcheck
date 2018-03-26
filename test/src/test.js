
import { screen } from '../screen/screen.js';

const cache = {};

export default function ( state, list, selectedData, sortType, leftScreen ) {
    // 组成各种筛选条件的key
    const screenDataArr = [];

    for ( const key in selectedData ) {
        const str = `${key}=${selectedData[key]}`;
        screenDataArr.push( str );
    }
    screenDataArr.push( `leftScreen=${leftScreen}` );
    screenDataArr.push( `sortType=${sortType}` );

    const cacheKey = screenDataArr.join( '&' );
    // 查看缓存中是否有对应key的缓存数据
    if ( cache[cacheKey] ) {
        return JSON.parse( cache[cacheKey] );
    } else {
        //综合排序直接返回所有数据
        if ( sortType == 0 ) {
            const screenData = screen( leftScreen, state.data, sortType, selectedData );
            cache[cacheKey] = JSON.stringify( screenData );
            return screenData;
        }
        //价格从低到高
        else if ( sortType == 1 ) { 
            const sortedList = _sort( list, sortType );
            cache[cacheKey] = JSON.stringify( sortedList );
            return sortedList;
        }
        //价格从高到低
        else if ( sortType == 2 ) {
            const sortedList = _sort( list, sortType );
            cache[cacheKey] = JSON.stringify( sortedList );
            return sortedList;
        }
    }
    return false;
}

//升序
function _sort( list, type ) {
    let newList = JSON.parse( JSON.stringify( list ) );
    newList = _sortCard( newList, type );
    return newList;
}

function _sortCard( newList, type ) {
    const len = newList.length;
    let minIndex, temp;

    //循环车型
    for ( let i = 0; i < len; i++ ) {
        minIndex = i;
        //对车型进行排序
        newList[i].meal_list = _sortShop( newList[i].meal_list, type );
        newList[i].minPrice = newList[i].meal_list[0].unit_price;//添加一个变量记录车型最低价格
    }

    for ( let k = 0; k < len - 1; k++ ) {
        minIndex = k;
        for ( let j = k + 1; j < len; j++ ) {
            if ( newList[j].minPrice < newList[minIndex].minPrice ) {
                minIndex = j;
            }
        }
        temp = newList[k];
        newList[k] = newList[minIndex];
        newList[minIndex] = temp;
    }
    if ( type == 2 ) {
        return newList.reverse();
    } else {
        return newList;
    }
}

function _sortShop( shopList, type ) {
    var len = shopList.length;
    var minIndex, temp;
    for ( var i = 0; i < len - 1; i++ ) {
        minIndex = i;
        for ( var j = i + 1; j < len; j++ ) {
            // 寻找最小的数
            if ( shopList[j].unit_price < shopList[minIndex].unit_price ) {     
                // 将最小数的索引保存
                minIndex = j;                 
            }
        }
        temp = shopList[i];
        shopList[i] = shopList[minIndex];
        shopList[minIndex] = temp;
    }
    if ( type == 2 ) {
        return shopList.reverse();
    } else {
        return shopList;
    }
}

console.log( 333 );
alert( 333 );
debugger;

for ( let i = 0; i < 100; i++ ) { 
    console.log( 123 );
}