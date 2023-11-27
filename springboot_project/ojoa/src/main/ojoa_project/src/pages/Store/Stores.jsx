import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import "./Store.css";

const storeList = [
    {
        id: 1,
        imgNo: 1,
        num: 1,
        storeTlt: 'Ojoa Company',
        add: '경기도 성남시 분당구 돌마로 46, 5층 (구미동 7-2)',
        addEn: '46, Dolma-ro, Bundang-gu, Seongnam-si, Gyeonggi-do',
        time: '11:00 - 20:00',
        tel: '02-4321-9876',
        link: 'https://kko.to/VNCvwt7YmQ',
        map: '37.3496888, 127.1069946'  // map1 좌표
    },
    {
        id: 2,
        imgNo: 2,
        num: 2,
        storeTlt: 'Ojoa Boontheshop',
        add: '경기도 용인시 수지구 포은대로 536 (죽전동 1285)',
        addEn: '536, Poeun-daero, Suji-gu, Yongin-si, Gyeonggi-do',
        time: '11:00 - 20:00',
        tel: '070-1234-2345',
        link: 'https://kko.to/5YdvB8WxcG',
        map: '37.3249507, 127.1081252'  // map2 좌표
    },
]; // storeList

const StoreInfo = ({ store }) => {
    useEffect(() => {
        const container = document.getElementById(`map-${store.id}`);
        const [lat, lng] = store.map.split(',').map(parseFloat);
        const options = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level: 4
        };

        // 맵 초기화
        const map = new window.kakao.maps.Map(container, options);

        // 마커 생성
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
            position: markerPosition
        });

        // 마커 지도에 표시
        marker.setMap(map);

        // 마커 클릭시 링크이동 클릭이벤트
        window.kakao.maps.event.addListener(marker, 'click', () => {
            handleMarkerClick(store.link);
        });
    }, [store]);

    // 마커 클릭시 링크 새창에서 열기
    const handleMarkerClick = (link) => {
        window.open(link, '_blank');
    };

    return (
        <div className="storeInfo">
            <p className="storeTlt">{store.storeTlt}</p>
            <p className="add">{store.add}</p>
            <p className="addEn">{store.addEn}</p>
            <p className="time">{store.time}</p>
            <p className="tel">{store.tel}</p>
            <p>&nbsp;</p>
            <div id={`map-${store.id}`} style={{ width: '550px', height: '400px' }}></div>
        </div>
    );
};

const Stores = () => {
    return (
        <div className="store_container">
            <div className="path">
                <span>현재 위치</span>
                <ol>
                    <li>
                        <Link to="/">홈</Link>
                    </li>
                    <li title="현재 위치">&gt; &nbsp;&nbsp;Store</li>
                </ol>
            </div>
            <div className="pageTlt">
                <h2>STORES</h2>
                <div className="txt_01">찾아 오시는 길</div>
            </div>
            <div className="stores">
                {storeList.map((store) => (
                    <React.Fragment key={store.id}>
                        <StoreInfo store={store} />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Stores;