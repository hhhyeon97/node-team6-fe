import React, { useEffect, useState } from "react";
const { kakao } = window

const KaKaoMap = ({ lat, lot }) => {
    const [address, setAddress] = useState('')

    useEffect(() => {
        const mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = {
                center: new kakao.maps.LatLng(lat, lot), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };

        const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();
        // 마커가 표시될 위치입니다 
        const markerPosition = new kakao.maps.LatLng(lat, lot);

        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });

        var callback = function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                setAddress(result[0].address.address_name);
            }
        };

        geocoder.coord2Address(markerPosition.getLng(), markerPosition.getLat(), callback);

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
    }, [])

    return (
        <div>
            <div>{address}</div>
            <div id="map" style={{ width: '500px', height: '400px' }}></div>
        </div>
    )
}

export default KaKaoMap;