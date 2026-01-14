"use client";

import Script from "next/script";
import { useRef } from "react";

interface Props {
  classNames?: string;
}

export default function Map({ classNames }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  const drawMap = () => {
    window.kakao.maps.load(() => {
      if (!mapRef.current) {
        return;
      }

      const mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

      // 지도를 생성합니다
      const map = new kakao.maps.Map(mapRef.current, mapOption);

      // 장소 검색 객체를 생성합니다
      const ps = new kakao.maps.services.Places(map);

      // 카테고리로 은행을 검색합니다
      ps.categorySearch(
        "FD6",
        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            for (let i = 0; i < data.length; i++) {
              displayMarker(data[i]);
            }
          }
        },
        { useMapBounds: true }
      );

      // 지도에 마커를 표시하는 함수입니다
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function displayMarker(place: any) {
        // 마커를 생성하고 지도에 표시합니다
        new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
        });
      }
    });
  };

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KKO_MAP_KEY}&libraries=services&autoload=false`}
        onLoad={() => {
          if (!window.kakao?.maps) {
            return;
          }

          drawMap();
        }}
      />

      <div ref={mapRef} className={classNames}></div>
    </>
  );
}
