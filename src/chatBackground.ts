// Лёгкий повторяющийся SVG-узор без внешних изображений.
export const chatBackground = `url("data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
  <g fill="none" stroke="#d8d2c6" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity="0.55">
    <path d="M18 25h32a8 8 0 0 1 8 8v17a8 8 0 0 1-8 8H33l-12 9 2-9h-5a8 8 0 0 1-8-8V33a8 8 0 0 1 8-8Z"/>
    <path d="m92 16 4 11 12 1-9 8 3 12-10-6-11 6 3-12-9-8 12-1Z"/>
    <path d="M151 22c-12-17-31 2-18 15l18 18 18-18c13-13-6-32-18-15Z"/>
    <g transform="translate(196 66) rotate(-20)"><rect width="27" height="43" rx="5"/><path d="M8 6h11M11 36h5"/></g>
    <circle cx="72" cy="105" r="21"/><path d="M64 99h1m13 0h1m-16 12q9 10 18 0"/>
    <path d="m115 78 29 9-9 29-29-9Z m-1 3 20 6m-21 2 20 6m-22 2 15 4"/>
    <path d="M22 114c16-15 33 11 17 20-14 8-32-9-17-20Z m-6 27 28 13m-31-5 28 13"/>
    <g transform="translate(151 145) rotate(15)"><rect width="48" height="32" rx="7"/><circle cx="24" cy="16" r="9"/><path d="M9 0l4-7h18l4 7M38 7h3"/></g>
    <path d="m70 169 12 13-12 13-12-13Z m13 14 16 17m-9-7 8-8"/>
    <path d="M18 204h28v13c0 16-28 16-28 0Z m28 3h5c12 0 12 14-5 14m-23-31 2 8m9-11 2 11"/>
    <path d="m116 196 37 6-30 26 2-18-9-12m9 12 28-8"/>
    <path d="m196 215 5-9 5 9 10 2-8 7 2 10-9-5-9 5 2-10-8-7Z"/>
    <path d="M204 22h6m-3-3v6M11 82h6m-3-3v6M109 143h6m-3-3v6M54 220h6m-3-3v6"/>
  </g>
</svg>`)}")`;
