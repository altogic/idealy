export default function MiniUserCard({ image, name, checked }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-4 px-6 py-4 border-2 border-transparent transition hover:bg-slate-50 hover:border-indigo-700">
      <span className="inline-block relative">
        <img className="w-10 h-10 rounded-full ring-2 ring-white" src={image} alt={name} />
        {checked && (
          <svg
            className="absolute bottom-0 right-0 w-3 h-3"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1564_28227)">
              <path
                d="M9.46908 2.85644C9.57461 3.11166 9.77717 3.31453 10.0322 3.42044L10.9266 3.7909C11.1818 3.89662 11.3846 4.09941 11.4903 4.35464C11.5961 4.60988 11.5961 4.89666 11.4903 5.1519L11.1201 6.04563C11.0144 6.30098 11.0142 6.58805 11.1205 6.84328L11.49 7.73674C11.5424 7.86315 11.5694 7.99866 11.5695 8.13551C11.5695 8.27236 11.5425 8.40787 11.4902 8.5343C11.4378 8.66073 11.361 8.77561 11.2642 8.87236C11.1675 8.96911 11.0526 9.04585 10.9261 9.09817L10.0324 9.46837C9.77716 9.5739 9.5743 9.77646 9.46838 10.0315L9.09793 10.9259C8.9922 11.1811 8.78942 11.3839 8.53418 11.4896C8.27894 11.5954 7.99216 11.5954 7.73692 11.4896L6.8432 11.1194C6.58795 11.014 6.30127 11.0142 6.04619 11.12L5.15182 11.49C4.89673 11.5954 4.61019 11.5954 4.35516 11.4897C4.10013 11.3841 3.89746 11.1815 3.79167 10.9266L3.4211 10.0319C3.31557 9.77672 3.11301 9.57385 2.85795 9.46794L1.96358 9.09748C1.70846 8.9918 1.50573 8.78915 1.39997 8.53405C1.29421 8.27896 1.29407 7.99232 1.39957 7.73712L1.76976 6.84339C1.87523 6.58815 1.87501 6.30147 1.76917 6.04638L1.3995 5.15138C1.34709 5.02496 1.32011 4.88946 1.32008 4.75261C1.32006 4.61576 1.34701 4.48024 1.39938 4.35381C1.45175 4.22738 1.52852 4.1125 1.6253 4.01575C1.72208 3.919 1.83698 3.84227 1.96343 3.78994L2.85716 3.41974C3.11215 3.31431 3.31489 3.112 3.42088 2.85724L3.79134 1.96287C3.89707 1.70763 4.09985 1.50485 4.35509 1.39913C4.61033 1.2934 4.89711 1.2934 5.15235 1.39913L6.04607 1.76932C6.30132 1.87478 6.58799 1.87457 6.84308 1.76872L7.73782 1.3997C7.99303 1.29404 8.27975 1.29406 8.53494 1.39976C8.79012 1.50546 8.99288 1.70819 9.09862 1.96336L9.46919 2.85799L9.46908 2.85644Z"
                fill="#0788F5"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.62037 4.9875C8.6946 4.87091 8.71947 4.72962 8.68951 4.59469C8.65956 4.45977 8.57724 4.34228 8.46065 4.26805C8.34407 4.19383 8.20277 4.16896 8.06785 4.19891C7.93293 4.22887 7.81543 4.31119 7.74121 4.42777L5.70162 7.63264L4.76829 6.46597C4.682 6.35804 4.55638 6.28881 4.41904 6.27351C4.28171 6.25821 4.14393 6.29808 4.036 6.38437C3.92807 6.47066 3.85884 6.59629 3.84354 6.73362C3.82824 6.87095 3.86811 7.00873 3.9544 7.11666L5.34329 8.85277C5.39505 8.91756 5.46153 8.96904 5.5372 9.00295C5.61288 9.03686 5.69555 9.05222 5.77835 9.04773C5.86115 9.04325 5.94169 9.01906 6.01325 8.97718C6.08482 8.9353 6.14535 8.87693 6.18982 8.80694L8.62037 4.9875V4.9875Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_1564_28227">
                <rect
                  width="11.1111"
                  height="11.1111"
                  fill="white"
                  transform="translate(0.888672 0.888672)"
                />
              </clipPath>
            </defs>
          </svg>
        )}
      </span>
      <span className="text-slate-700 text-base tracking-sm">{name}</span>
    </button>
  );
}
