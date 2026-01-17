"use client";

import classNames from "classnames/bind";
import Script from "next/script";
import { useRef, useState } from "react";

import ImgCat from "@/assets/img/cat_1.png";

import styles from "./index.module.scss";

const cn = classNames.bind(styles);

interface Props {
  className?: string;
  onClickCatMarker?: (catImg: string) => void;
}

export default function Map({ className, onClickCatMarker }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<kakao.maps.Map>(null);
  const myMarkerRef = useRef<kakao.maps.Marker>(null);
  const infoWindowRef = useRef<kakao.maps.InfoWindow>(null);
  const randomMarkersRef = useRef<kakao.maps.Marker[]>([]);

  const initMap = () => {
    kakao.maps.load(() => {
      if (!mapDivRef.current) {
        return;
      }

      // 지도를 생성합니다
      const map = new kakao.maps.Map(mapDivRef.current, {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: -2, // 지도의 확대 레벨
      });

      // map.setZoomable(false);

      mapRef.current = map;

      showMyPosition();
    });
  };

  const showMyPosition = async () => {
    if (!mapRef.current || !navigator.geolocation) {
      return;
    }

    setIsLoading(true);

    return new Promise<void>((res) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          const position = new kakao.maps.LatLng(latitude, longitude);
          const marker =
            myMarkerRef.current || showMarker(mapRef.current!, position);

          myMarkerRef.current = marker;

          showMarkerInfo(
            marker,
            `<div style="color:black; font-weight:bold; font-size:14px;">
              <span>내 위치</span>
            </div>`
          );

          setIsLoading(false);
          res();
        },
        () => {
          setIsLoading(false);
          res();
        },
        {
          enableHighAccuracy: true,
        }
      );
    });
  };

  // 지도에 마커를 표시하는 함수입니다
  const showMarker = (
    map: kakao.maps.Map,
    position: kakao.maps.LatLng,
    imageSrc?: string
  ) => {
    const markerImage = imageSrc
      ? new kakao.maps.MarkerImage(
          imageSrc,
          new kakao.maps.Size(64, 64), // 마커이미지의 크기입니다
          { offset: new kakao.maps.Point(0, 0) } // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        )
      : undefined;

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      map,
      position,
      image: markerImage,
    });

    return marker;
  };

  const showMarkerInfo = (marker: kakao.maps.Marker, content: string) => {
    if (!mapRef.current) {
      return;
    }

    const infoWindow =
      infoWindowRef.current ||
      new kakao.maps.InfoWindow({
        content,
        removable: true,
      });

    infoWindowRef.current = infoWindow;

    // 인포윈도우를 마커위에 표시합니다
    infoWindow.open(mapRef.current, marker);

    // 중심좌표를 해당 위치로 부드럽게 이동
    mapRef.current.panTo(marker.getPosition());
  };

  const showRandomCatMarkers = async () => {
    await showMyPosition();

    if (!myMarkerRef.current) {
      return;
    }

    const position = myMarkerRef.current.getPosition();

    // 이전에 생성한 랜덤 마커들 해제
    randomMarkersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    randomMarkersRef.current = [];

    // 2. 랜덤 마커 생성 및 Bounds 확장
    for (let i = 0; i < 5; i++) {
      const randomLatLng = getRandomLocation(
        position.getLat(),
        position.getLng(),
        50
      );

      const marker = showMarker(mapRef.current!, randomLatLng, ImgCat.src);

      if (onClickCatMarker) {
        kakao.maps.event.addListener(marker, "click", () => {
          onClickCatMarker(ImgCat.src);
        });
      }

      randomMarkersRef.current.push(marker);
    }
  };

  const getRandomLocation = (
    lat: number,
    lng: number,
    radiusInMeters: number
  ): kakao.maps.LatLng => {
    const lat_diff = (Math.random() - 0.5) * 2 * (radiusInMeters / 111000);
    const lng_diff = (Math.random() - 0.5) * 2 * (radiusInMeters / 88000);
    return new kakao.maps.LatLng(lat + lat_diff, lng + lng_diff);
  };

  return (
    <>
      <div className={cn("Map", className)}>
        <div ref={mapDivRef} className={cn("map-content")}></div>

        {isLoading && (
          <div className={cn("loading")}>
            {["찾", "는", "중", ".", ".", "."].map((ch, i) => (
              <span key={i}>{ch}</span>
            ))}
          </div>
        )}

        <div className={cn("buttons")}>
          <button
            onClick={() => {
              showMyPosition();
            }}
          >
            내 위치
          </button>
          <button
            onClick={() => {
              showRandomCatMarkers();
            }}
          >
            내 주변 고양이
          </button>
        </div>
      </div>

      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KKO_MAP_KEY}&libraries=services&autoload=false`}
        onLoad={() => {
          if (window.kakao?.maps) {
            initMap();
          }
        }}
      />
    </>
  );
}
