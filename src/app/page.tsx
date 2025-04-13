"use client"
import { Stack, Button, Typography, FormControl, FormLabel, Box, CircularProgress, Select, Option, Input, FormHelperText, List, ListItem, Link } from "@mui/joy";
import { useState } from "react";
import GitHubIcon from '@mui/icons-material/GitHub';


export default function Home() {

  const [lang, setLang] = useState("en_US")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [helperText, setHelperText] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password)
      formData.append('lang', lang)
      const res = await fetch('api/ntu/coursetocalendar', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        setHelperText("登入失敗，請確認帳號及密碼");
        setLoading(false);
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'ntu_calendar.ics';
      a.click();

      window.URL.revokeObjectURL(url);
      setSuccess(true);
    } catch (err) {
      setHelperText("轉換失敗，請稍候再試 Error: " + err);
    } finally {
      setLoading(false);
    }
  }



  return (
    <Box ml="auto" mr="auto" mt="12pt" maxWidth={450}>
      <Stack spacing={2} width="100%">
        <Typography level="title-lg" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          臺大課程行事曆
          <Link
            href="https://github.com/CoinVeil4065852/NTU-Course-Calendar"
            rel="noopener"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <GitHubIcon color="primary" fontSize="small" />
          </Link>
        </Typography>
        <Typography level="body-md" >
          這是一個可以將臺大課表轉換成行事曆的工具，請在下方輸入你的計中帳號密碼。
        </Typography>
        <Stack spacing={2} >
          <Stack direction="row" alignItems="flex-end" justifyContent="space-between">
            <Stack>
              <FormLabel>語言</FormLabel>
              <Select defaultValue="en_US" onChange={(event, newValue) => setLang(newValue || "en_US")}>
                <Option value="en_US">English(US)</Option>
                <Option value="zh_TW">中文(繁體)</Option>
              </Select>
            </Stack>
          </Stack>

          <FormControl disabled={loading} error={helperText !== ""}>
            <FormLabel>帳號</FormLabel>
            <Input type="text" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Username..." variant="soft" />
          </FormControl>
          <FormControl disabled={loading} error={helperText !== ""}>
            <FormLabel>密碼</FormLabel>
            <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password..." variant="soft" />
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
          <Button disabled={loading || username == "" || password == ""} onClick={handleSubmit} variant="solid">{loading ? <CircularProgress /> : "送出"}</Button>
        </Stack>
        {success && (<>
          <Typography level="title-md" gutterBottom>
            NTU 行事曆匯入說明
          </Typography>

          <Typography level="body-md" >
            恭喜您，您已成功轉換並取得 ntu_calendar.ics 檔案！接下來，您可以將該檔案匯入至您的 Google Calendar 或任何支援 .ics 的行事曆，方便您管理學期活動與重要日程。
          </Typography>

          <Typography level="title-md" gutterBottom>
            Google Calendar 匯入步驟
          </Typography>

          <List sx={{ listStyleType: 'decimal', pl: 4 }}>
            <ListItem sx={{ display: 'list-item' }}>
              開啟您的 <Link href="https://calendar.google.com/" target="_blank" rel="noopener">Google Calendar</Link>。
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              在左側功能選單中，找到「其他行事曆」，點選右側的「+」。
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              選擇「匯入」。
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              點選「從電腦上匯入」，選擇您剛剛下載的 <code>ntu_calendar.ics</code> 檔案。
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              選擇要將此行事曆匯入到哪一個現有行事曆（如「個人行事曆」、「NTU 行事曆」等）。
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              點擊「匯入」，系統會自動將所有行程加入至您指定的行事曆中。
            </ListItem>
          </List>
          <Typography level="body-md">
            若您需要更詳細的教學，請參考 Google 官方支援頁面：{' '}
            <Link
              href="https://support.google.com/calendar/answer/37118"
              target="_blank"
              rel="noopener"
            >
              如何匯入 .ics 檔案到 Google Calendar
            </Link>
          </Typography>
        </>
        )}

      </Stack>
    </Box>

  );
}
