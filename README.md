## [Demo](https://ntu-course-calendar.vercel.app/)

# NTU Course Schedule to iCal Converter

A web application that converts a student's NTU course schedule into an iCal (.ics) file. The generated file can be imported into calendar applications like Google Calendar, Apple Calendar, Outlook, and others.

# 台大課表轉 iCal 工具

一個可以將台灣大學學生課表轉換為 iCal (.ics) 檔案的網頁應用程式。產生的檔案可匯入 Google 行事曆、Apple 行事曆、Outlook 等行事曆工具。

---

## Features

- Login with NTU CINC account
- Fetch course schedule from [NTU Course](https://course.ntu.edu.tw/)
- Convert schedule to downloadable `.ics` file
- Compatible with Google Calendar, Apple Calendar, Outlook, etc.

## 功能介紹

- 使用台大計中帳號登入
- 從 [台大課程網](https://course.ntu.edu.tw/) 擷取課表資料
- 將課表轉為可下載的 `.ics` 檔案
- 相容 Google、Apple、Outlook 等行事曆工具

---

## How to Use

1. Open the web app
2. Enter your NTU CINC account credentials
3. Your course schedule will be fetched automatically
4. Download the `.ics` file
5. Import it into your preferred calendar application

## 使用方式

1. 開啟網站
2. 輸入你的台大計中帳號與密碼
3. 系統會自動擷取你的課表
4. 下載 `.ics` 檔案
5. 匯入至你常用的行事曆工具

---

## Disclaimer

This project is not affiliated with or endorsed by National Taiwan University.  
CINC credentials are not stored and are only used temporarily to fetch course data.

## 注意事項

本專案與台灣大學無任何關聯。  
使用者的登入資訊不會被儲存，僅用於一次性的資料擷取。

---

## Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
