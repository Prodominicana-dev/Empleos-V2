import React from "react";

export default function Experience({
  size,
  color,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size || 32}
      height={size || 32}
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${color || "fill-black"}`}
    >
      <path d="M570.938 590C594.375 704.375 431.406 718.75 447.813 590.469C449.063 580.677 444.74 575.365 434.844 574.531C305.156 564.115 183.333 526.198 69.375 460.781C55.9375 453.125 46.5625 445.312 46.5625 428.125C46.7708 379.062 46.9792 331.927 47.1875 286.719C47.5 240.781 65.2604 209.062 100.469 191.562C117.76 182.917 150.313 178.594 198.125 178.594C337.604 178.698 472.552 179.01 602.969 179.531C630.052 179.635 638.906 166.979 629.531 141.562L626.25 132.344C616.563 105.99 597.656 92.7604 569.531 92.6562C524.844 92.552 479.063 92.6041 432.188 92.8125C410.313 92.9166 390.781 104.323 373.594 127.031C367.76 134.844 360.417 136.615 351.563 132.344L347.656 130.469C333.49 123.698 330.469 113.594 338.594 100.156C359.115 66.302 388.698 48.9583 427.344 48.125C468.177 47.2916 507.76 46.5104 546.094 45.7812C624.531 44.0625 682.813 88.75 677.813 170.312C677.704 171.608 677.866 172.911 678.289 174.14C678.711 175.37 679.385 176.498 680.266 177.453C681.148 178.408 682.218 179.169 683.41 179.688C684.601 180.207 685.888 180.473 687.188 180.469C736.563 180.781 787.708 180.625 840.625 180C988.281 178.281 951.25 340.781 954.219 430.625C954.359 435.592 953.172 440.501 950.781 444.843C948.39 449.185 944.883 452.8 940.625 455.312C830.521 520.625 711.458 559.792 583.438 572.812C572.917 573.854 568.75 579.583 570.938 590ZM850.469 451.25C867.135 443.646 883.385 435 899.219 425.312C901.361 424.023 903.134 422.209 904.365 420.046C905.597 417.884 906.246 415.446 906.25 412.969C906.563 372.5 904.531 330.625 906.094 289.687C907.344 255.937 886.25 227.344 851.563 227.344C597.708 227.24 363.177 227.24 147.969 227.344C133.63 227.344 119.879 233.04 109.741 243.178C99.6021 253.317 93.9063 267.068 93.9063 281.406L93.5937 411.094C93.5984 414.777 94.6059 418.386 96.5067 421.526C98.4076 424.667 101.129 427.219 104.375 428.906C352.292 557.135 600.99 564.583 850.469 451.25Z" />
      <path d="M94.2187 886.719C94.2187 920.313 118.437 945.781 151.094 945.938C390.365 946.146 622.5 946.198 847.5 946.094C863.096 946.052 878.038 939.844 889.052 928.831C900.065 917.818 906.25 902.898 906.25 887.344V551.875C906.25 540.312 911.875 533.021 923.125 530C925.312 529.375 927.552 529.167 929.844 529.375C945.573 530.938 953.385 539.583 953.281 555.313C952.656 651.146 952.812 757.708 953.75 875C954.219 943.594 915.781 992.5 843.437 992.656C614.896 993.177 388.073 993.229 162.969 992.813C85.052 992.604 46.2499 951.51 46.5624 869.531C46.8749 759.219 47.0312 652.969 47.0312 550.781C47.0317 546.442 48.5823 542.233 51.4062 538.906C57.552 531.823 64.1145 528.698 71.0937 529.531C86.0937 531.302 93.5937 539.792 93.5937 555C93.6978 668.333 93.9062 778.906 94.2187 886.719Z" />
    </svg>
  );
}