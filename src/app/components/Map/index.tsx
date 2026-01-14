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
      if (!mapRef.current) return;

      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 시청 기준
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapRef.current, options);
      // 마커 생성 예시
      const marker = new window.kakao.maps.Marker({
        position: options.center,
      });
      marker.setMap(map);

      console.log(map);
    });
  };

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KKO_MAP_KEY}&autoload=false`}
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
