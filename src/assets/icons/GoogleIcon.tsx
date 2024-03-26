import React from 'react';
import {Path, Svg} from 'react-native-svg';

const GoogleIcon = ({size}: {size: number}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 128 128" fill="none">
      <Path
        d="M44.59 4.21C31.8008 8.64669 20.7714 17.0677 13.1219 28.236C5.47239 39.4044 1.60592 52.7314 2.09043 66.2597C2.57493 79.7879 7.38489 92.8042 15.8138 103.397C24.2427 113.989 35.8462 121.6 48.92 125.11C59.5192 127.845 70.6241 127.965 81.28 125.46C90.9332 123.292 99.8578 118.654 107.18 112C114.801 104.863 120.332 95.7848 123.18 85.74C126.274 74.8165 126.825 63.3294 124.79 52.16H65.27V76.85H99.74C99.0511 80.7879 97.5748 84.5463 95.3995 87.9003C93.2242 91.2544 90.3946 94.135 87.08 96.37C82.8714 99.1554 78.1263 101.029 73.15 101.87C68.1595 102.798 63.0405 102.798 58.05 101.87C52.9915 100.825 48.2064 98.7376 44 95.74C37.2415 90.9559 32.1668 84.1592 29.5 76.32C26.7889 68.3338 26.7889 59.6762 29.5 51.69C31.3983 46.0922 34.5363 40.9954 38.68 36.78C43.4219 31.8675 49.4253 28.356 56.0316 26.6308C62.6378 24.9056 69.5916 25.0333 76.13 27C81.238 28.5672 85.9089 31.3068 89.77 35C93.6567 31.1333 97.5367 27.2567 101.41 23.37C103.41 21.28 105.59 19.29 107.56 17.15C101.665 11.6652 94.7466 7.39704 87.2 4.59C73.457 -0.400101 58.4198 -0.534206 44.59 4.21Z"
        fill="white"
      />
      <Path
        d="M44.59 4.21C58.4186 -0.53743 73.4559 -0.406856 87.2 4.58C94.7479 7.40611 101.664 11.6948 107.55 17.2C105.55 19.34 103.44 21.34 101.4 23.42C97.52 27.2933 93.6433 31.1533 89.77 35C85.9089 31.3068 81.238 28.5672 76.13 27C69.5938 25.0264 62.6402 24.8913 56.0322 26.6094C49.4242 28.3276 43.4171 31.8326 38.67 36.74C34.5263 40.9554 31.3883 46.0522 29.49 51.65L8.76 35.6C16.1801 20.8856 29.0275 9.63024 44.59 4.21Z"
        fill="#E33629"
      />
      <Path
        d="M3.26 51.5C4.37339 45.9777 6.22326 40.6299 8.76 35.6L29.49 51.69C26.7789 59.6762 26.7789 68.3338 29.49 76.32C22.5833 81.6533 15.6733 87.0133 8.76 92.4C2.41151 79.7632 0.475325 65.365 3.26 51.5Z"
        fill="#F8BD00"
      />
      <Path
        d="M65.27 52.15H124.79C126.825 63.3194 126.274 74.8065 123.18 85.73C120.332 95.7748 114.801 104.853 107.18 111.99C100.49 106.77 93.77 101.59 87.08 96.37C90.3968 94.1328 93.2277 91.2489 95.4031 87.8913C97.5785 84.5337 99.0536 80.7714 99.74 76.83H65.27C65.26 68.61 65.27 60.38 65.27 52.15Z"
        fill="#587DBD"
      />
      <Path
        d="M8.75 92.4C15.6633 87.0667 22.5733 81.7067 29.48 76.32C32.1521 84.162 37.234 90.9589 44 95.74C48.2195 98.7237 53.015 100.794 58.08 101.82C63.0705 102.748 68.1895 102.748 73.18 101.82C78.1563 100.979 82.9014 99.1054 87.11 96.32C93.8 101.54 100.52 106.72 107.21 111.94C99.8889 118.597 90.9642 123.239 81.31 125.41C70.6541 127.915 59.5492 127.795 48.95 125.06C40.567 122.822 32.7368 118.876 25.95 113.47C18.7673 107.766 12.9003 100.579 8.75 92.4Z"
        fill="#319F43"
      />
    </Svg>
  );
};

export default GoogleIcon;