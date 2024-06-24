import api from "../utils/api";
import * as types from "../constants/performanceList.constants";
import { useEffect } from 'react';
import { StringDateformat, EndDateformat } from '../utils/Date'

const { DOMParser } = require('xmldom');

const REACT_APP_YEJIN_SERVICE_KEY = process.env.REACT_APP_YEJIN_SERVICE_KEY;


// xml -> json
function xmlToJson(xml) {
    var obj = {};

    if (xml.nodeType === 1) { // element node
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (let j = 0; j < xml.attributes.length; j++) {
                const attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType === 3) { // text node
        obj = xml.nodeValue.trim();
    }

    // do children
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            const item = xml.childNodes.item(i);
            const nodeName = item.nodeName;
            if (typeof obj[nodeName] === "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof obj[nodeName].push === "undefined") {
                    const old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
}

// xml 다듬기
function cleanUp(obj) {
    if (typeof obj === 'object' && obj !== null) {
        if (Array.isArray(obj)) {
            return obj.map(item => cleanUp(item));
        } else {
            const newObj = {};
            for (const prop in obj) {
                if (prop === '#text') {
                    if (typeof obj[prop] === 'string' && obj[prop].trim() !== '') {
                        return obj[prop].trim();
                    }
                } else {
                    newObj[prop] = cleanUp(obj[prop]);
                }
            }
            return newObj;
        }
    }
    return obj;
}

// api 데이터 호출

// 공연 리스트 호출
// const getPerformanceList = async ({ setLoading, setPerformanceListData, setErrorMsg, selectDate, status, selectedRegion }) => {
//     console.log('recieve selectedRegion:', selectedRegion)

//     if (!selectDate) {
//         console.error('Error: selectDate is undefined');
//         setErrorMsg('Invalid date selected');
//         return;
//     }

//     try {
//         const queryParams = new URLSearchParams({
//             service: REACT_APP_YEJIN_SERVICE_KEY,
//             stdate: StringDateformat(selectDate),
//             eddate: EndDateformat(selectDate),
//             cpage: 1,
//             rows: 10,
//             signgucode: selectedRegion ? selectedRegion.code : '',
//             prfstate: status ? status : '02',
//         }).toString();

//         // ['01', '02'].forEach(state => queryParams.append('prfstate', state));

//         let url = `https://corsproxy.io/?http://www.kopis.or.kr/openApi/restful/pblprfr?${queryParams.toString()}`
//         setLoading(true)

//         console.log('call url:', url)

//         const response = await fetch(url)
//         if (!response.ok) throw new Error("Failed to fetch data");
//         const xmlText = await response.text();
//         // console.log("xmlText:", xmlText)

//         const domParser = new DOMParser();
//         const XmlNode = domParser.parseFromString(xmlText, 'text/xml');
//         const jsonData = xmlToJson(XmlNode)

//         const cleanedData = cleanUp(jsonData);
//         // console.log("Cleaned json data:", cleanedData.dbs.db); // 불필요한거 지우기

//         setPerformanceListData(cleanedData.dbs.db)
//         setLoading(false)
//     } catch (error) {
//         setErrorMsg(error)
//         console.log("get data error:", error)
//         setLoading(false)
//     }
// }

const getPerformanceList = (query, settingQuery) => async (dispatch) => {
    try {
        dispatch({ type: types.PERFORMANCELIST_GET_REQUEST })

        const params = new URLSearchParams({ ...query, ...settingQuery });
        let url = `https://corsproxy.io/?http://www.kopis.or.kr/openApi/restful/pblprfr?${params.toString()}`

        console.log('url', url)

        const response = await fetch(url)

        if (response.status !== 200) throw new Error(response.error)

        const xmlText = await response.text();
        const domParser = new DOMParser();
        const XmlNode = domParser.parseFromString(xmlText, 'text/xml');
        const jsonData = xmlToJson(XmlNode)

        const cleanedData = cleanUp(jsonData);
        // console.log("Cleaned json data:", cleanedData.dbs.db); // 불필요한거 지우기

        dispatch({ type: types.PERFORMANCELIST_GET_SUCCESS, payload: cleanedData.dbs.db })
    } catch (error) {
        dispatch({ type: types.PERFORMANCELIST_GET_FAIL, payload: error.message })
    }
};

// 상세 정보 호출
const getPerformanceDetail = (id, settingQuery) => async (dispatch) => {
    try {
        dispatch({ type: types.GET_PERFORMANCE_DETAIL_REQUEST })

        const params = new URLSearchParams({ ...settingQuery });

        let url = `https://corsproxy.io/?http://www.kopis.or.kr/openApi/restful/pblprfr/${id}/?${params.toString()}`

        const response = await fetch(url)

        if (!response.ok) throw new Error("Failed to fetch data");

        const xmlText = await response.text();
        const domParser = new DOMParser();
        const XmlNode = domParser.parseFromString(xmlText, 'text/xml');
        const jsonData = xmlToJson(XmlNode)

        const cleanedData = cleanUp(jsonData);

        dispatch({ type: types.GET_PERFORMANCE_DETAIL_SUCCESS, payload: cleanedData.dbs.db })

    } catch (error) {
        dispatch({ type: types.GET_PERFORMANCE_DETAIL_FAIL, payload: error.message })
    }
}

const getLocationLatLot = (location, settingQuery) => async (dispatch) => {
    try {
        dispatch({ type: types.GET_LOCATIONLATLOT_REQUEST })

        const params = new URLSearchParams({ ...settingQuery });

        let url = `https://corsproxy.io/?http://www.kopis.or.kr/openApi/restful/prfplc/${location}/?${params.toString()}`

        const response = await fetch(url)

        if (!response.ok) throw new Error("Failed to fetch data");

        const xmlText = await response.text();
        const domParser = new DOMParser();
        const XmlNode = domParser.parseFromString(xmlText, 'text/xml');
        const jsonData = xmlToJson(XmlNode)

        const cleanedData = cleanUp(jsonData);

        dispatch({ type: types.GET_LOCATIONLATLOT_DETAIL_SUCCESS, payload: cleanedData.dbs.db })

        // setLat(cleanedData.dbs.db.la)
        // setLot(cleanedData.dbs.db.lo)
    } catch (error) {
        dispatch({ type: types.GET_LOCATIONLATLOT_DETAIL_FAIL, payload: error.message })
    }
}

const getPerformanceListWithStatus = (query, settingQuery) => async (dispatch) => {
    try {
        dispatch({ type: types.PERFORMANCELISTWITHSTATUS_GET_REQUEST })

        const params = new URLSearchParams({ ...query, ...settingQuery });
        let url = `https://corsproxy.io/?http://www.kopis.or.kr/openApi/restful/pblprfr?${params.toString()}`

        // console.log('url', url)

        const response = await fetch(url)

        if (response.status !== 200) throw new Error(response.error)

        const xmlText = await response.text();
        const domParser = new DOMParser();
        const XmlNode = domParser.parseFromString(xmlText, 'text/xml');
        const jsonData = xmlToJson(XmlNode)

        const cleanedData = cleanUp(jsonData);
        // console.log("Cleaned json data:", cleanedData.dbs.db); // 불필요한거 지우기

        dispatch({ type: types.PERFORMANCELISTWITHSTATUS_GET_SUCCESS, payload: cleanedData.dbs.db })
    } catch (error) {
        dispatch({ type: types.PERFORMANCELISTWITHSTATUS_GET_FAIL, payload: error.message })
    }
};

const getRankingPerformance = (query, settingQuery) => async (dispatch) => {
    try {
        dispatch({ type: types.GET_RANKING_PERFORMANCE_REQUEST })

        const params = new URLSearchParams({ ...query, ...settingQuery });
        let url = `https://corsproxy.io/?http://www.kopis.or.kr/openApi/restful/boxoffice?${params.toString()}`

        console.log('url', url)

        const response = await fetch(url)

        if (response.status !== 200) throw new Error(response.error)

        const xmlText = await response.text();
        const domParser = new DOMParser();
        const XmlNode = domParser.parseFromString(xmlText, 'text/xml');
        const jsonData = xmlToJson(XmlNode)
        // console.log("json",jsonData)
        const cleanedData = cleanUp(jsonData);
        // console.log("Cleaned json data:", cleanedData.boxofs.boxof); // 불필요한거 지우기

        dispatch({ type: types.GET_RANKING_PERFORMANCE_SUCCESS, payload: cleanedData.boxofs.boxof })
    } catch (error) {
        dispatch({ type: types.GET_RANKING_PERFORMANCE_FAIL, payload: error.message })
    }
};

export const perfomanceListAction = {
    getPerformanceList,
    getPerformanceDetail,
    getLocationLatLot,
    getPerformanceListWithStatus,
    getRankingPerformance,
}