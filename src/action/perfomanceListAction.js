import api from "../utils/api";
import * as types from "../constants/performanceList.constants";
import { useEffect, useState } from 'react';
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
const getPerformanceList = async ({ setLoading, setPerformanceListData, setErrorMsg }) => {
    try {
        const queryParams = new URLSearchParams({
            service: REACT_APP_YEJIN_SERVICE_KEY,
            stdate: '20230101',
            eddate: '20230630',
            cpage: 1,
            rows: 10,
            prfstate: '02',
        }).toString();

        // ['01', '02'].forEach(state => queryParams.append('prfstate', state));

        let url = `https://corsproxy.io/?http://www.kopis.or.kr/openApi/restful/pblprfr?${queryParams.toString()}`
        setLoading(true)

        console.log('call url:', url)

        const response = await fetch(url)
        if (!response.ok) throw new Error("Failed to fetch data");
        const xmlText = await response.text();
        // console.log("xmlText:", xmlText)

        const domParser = new DOMParser();
        const XmlNode = domParser.parseFromString(xmlText, 'text/xml');
        const jsonData = xmlToJson(XmlNode)

        const cleanedData = cleanUp(jsonData);
        console.log("Cleaned json data:", cleanedData.dbs.db); // 불필요한거 지우기

        setPerformanceListData(cleanedData.dbs.db)
        setLoading(false)
    } catch (error) {
        setErrorMsg(error)
        console.log("get data error:", error)
        setLoading(false)
    }
}

export const perfomanceListAction = {
    getPerformanceList,
}