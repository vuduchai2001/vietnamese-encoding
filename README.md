# Chuyển đổi TCVN3 ↔ Unicode

Website chuyển đổi qua lại giữa bảng mã TCVN3 và Unicode.

## Tính năng

- Chuyển đổi TCVN3 sang Unicode (hàng trên)
- Chuyển đổi Unicode sang TCVN3 (hàng dưới)

## Cài đặt

```bash
yarn install
```

## Chạy dự án

```bash
yarn run dev
```

Dự án sẽ chạy tại `http://localhost:5173`

## Build

```bash
npm run build
```

## Cấu trúc dự án

```
encoding/
├── src/
│   ├── App.jsx          # Component chính
│   ├── App.css          # Styling
│   ├── main.jsx         # Entry point
│   ├── index.css        # Global styles
│   └── utils/
│       └── converter.js  # Logic chuyển đổi TCVN3 ↔ Unicode
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Sử dụng

1. **Chuyển đổi TCVN3 sang Unicode:**
   - Nhập văn bản TCVN3 vào ô bên trái hàng trên
   - Kết quả Unicode sẽ tự động hiển thị ở ô bên phải

2. **Chuyển đổi Unicode sang TCVN3:**
   - Nhập văn bản Unicode vào ô bên trái hàng dưới
   - Kết quả TCVN3 sẽ tự động hiển thị ở ô bên phải
