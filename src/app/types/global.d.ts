export { };

declare global {
  interface Window {
    kakao: typeof kakao;
  }

  namespace kakao {
    namespace maps {
      /** 지도를 초기화하는 로드 함수 (autoload=false 일 때 필수) */
      function load(callback: () => void): void;

      /** 지도 객체 */
      class Map {
        constructor(container: HTMLElement, options: MapOptions);
        setCenter(latlng: LatLng): void;
        getCenter(): LatLng;
        setLevel(level: number, options?: { animate: boolean | { duration: number } }): void;
        getLevel(): number;
        relayout(): void;
      }

      interface MapOptions {
        center: LatLng;
        level?: number;
        mapTypeId?: MapTypeId;
      }

      /** 위경도 좌표 객체 */
      class LatLng {
        constructor(latitude: number, longitude: number);
        getLat(): number;
        getLng(): number;
      }

      /** 마커 객체 */
      class Marker {
        constructor(options: MarkerOptions);
        setMap(map: Map | null): void;
        setPosition(latlng: LatLng): void;
      }

      interface MarkerOptions {
        map?: Map;
        position: LatLng;
        image?: MarkerImage;
        title?: string;
        zIndex?: number;
      }

      /** 장소 검색 서비스 */
      namespace services {
        class Places {
          constructor(map?: Map);
          keywordSearch(
            keyword: string,
            callback: (result: unknown[], status: Constant, pagination: unknown) => void,
            options?: {
              location?: LatLng;
              radius?: number;
              bounds?: unknown;
              useMapBounds?: boolean;
            }
          ): void;
        }

        enum Status {
          OK,
          ZERO_RESULT,
          ERROR,
        }
      }

      /** 이벤트 리스너 */
      namespace event {
        function addListener(
          target: unknown,
          type: string,
          callback: (...args: unknown[]) => void
        ): void;
      }

      // 상수 및 기타 타입
      type MapTypeId = number;
      type Constant = unknown;
      class MarkerImage { }
    }
  }
}