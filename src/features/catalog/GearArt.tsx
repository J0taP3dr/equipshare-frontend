import type { Gear } from './model';
/** Original vector product illustration, intentionally not a product photograph. */
export function GearArt({ gear }: { gear: Gear }) {
  return (
    <svg
      className="gear-art"
      viewBox="0 0 320 220"
      role="img"
      aria-label={`Ilustração de ${gear.name}`}
      style={{ background: gear.color }}
    >
      <ellipse cx="163" cy="183" rx="92" ry="12" fill="#000" opacity=".1" />
      {gear.category === 'Câmeras' ? (
        <g transform="rotate(-8 160 110)">
          <rect x="72" y="72" width="180" height="98" rx="15" fill="#293237" />
          <path d="M104 72l15-22h57l15 22" fill="#374349" />
          <rect x="82" y="82" width="23" height="77" rx="7" fill="#192126" />
          <rect x="218" y="84" width="19" height="10" rx="3" fill="#e6e9e6" />
          <circle
            cx="168"
            cy="120"
            r="55"
            fill="#131c21"
            stroke="#536165"
            strokeWidth="4"
          />
          <circle
            cx="168"
            cy="120"
            r="42"
            fill="#344b51"
            stroke="#101a20"
            strokeWidth="6"
          />
          <circle cx="168" cy="120" r="28" fill="#132b34" />
          <circle cx="157" cy="109" r="13" fill="#6c9a9c" opacity=".55" />
          <text x="113" y="70" fill="#fff" fontSize="8" fontFamily="sans-serif">
            EQUIPSHARE
          </text>
        </g>
      ) : gear.category === 'Lentes' ? (
        <g transform="rotate(-20 160 110)">
          <rect
            x="110"
            y="50"
            width="101"
            height="126"
            rx="12"
            fill="#283238"
          />
          <ellipse cx="160" cy="52" rx="50" ry="18" fill="#4f5d63" />
          <ellipse cx="160" cy="52" rx="38" ry="13" fill="#14333e" />
          {[80, 88, 96, 104, 112, 140, 148].map((y) => (
            <path
              key={y}
              d={`M113 ${y}q47 13 96 0`}
              fill="none"
              stroke="#53616a"
              strokeWidth="3"
            />
          ))}
          <rect x="130" y="121" width="57" height="10" rx="2" fill="#10191f" />
        </g>
      ) : gear.category === 'Iluminação' ? (
        <g>
          <path
            d="M161 121v62m0-17l-39 26m39-26l37 26"
            stroke="#344348"
            strokeWidth="6"
          />
          <path
            d="M98 59l33-26h61l34 26v64l-35 26h-61l-32-26z"
            fill="#38444a"
          />
          <path
            d="M112 65l25-19h48l26 20v50l-26 20h-48l-25-20z"
            fill="#faf6da"
          />
          <circle cx="161" cy="91" r="28" fill="#fffdf0" />
        </g>
      ) : (
        <g transform="rotate(-10 160 110)">
          <rect x="84" y="68" width="70" height="100" rx="13" fill="#27353a" />
          <rect x="173" y="68" width="70" height="100" rx="13" fill="#27353a" />
          <rect x="96" y="83" width="45" height="29" rx="4" fill="#90b8b5" />
          <rect x="186" y="83" width="45" height="29" rx="4" fill="#90b8b5" />
          <circle cx="119" cy="139" r="9" fill="#45575c" />
          <circle cx="208" cy="139" r="9" fill="#45575c" />
        </g>
      )}
    </svg>
  );
}
