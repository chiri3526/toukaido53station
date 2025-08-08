import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Paper
} from '@mui/material';
import { Home, Info, Contact } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* ヘッダー test*/}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Material-UI App
          </Typography>
          <Button color="inherit" startIcon={<Home />}>
            ホーム
          </Button>
          <Button color="inherit" startIcon={<Info />}>
            について
          </Button>
          <Button color="inherit" startIcon={<Contact />}>
            お問い合わせ
          </Button>
        </Toolbar>
      </AppBar>

      {/* メインコンテンツ */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* ヒーローセクション */}
        <Paper
          sx={{
            p: 4,
            mb: 4,
            backgroundColor: 'primary.main',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to My App
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            React + Material-UI + Netlifyで作成されたWebページです
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 2 }}
          >
            Get Started
          </Button>
        </Paper>

        {/* カードセクション */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  機能 1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Material-UIの豊富なコンポーネントを活用した
                  美しいユーザーインターフェース
                </Typography>
                <Button variant="outlined" sx={{ mt: 2 }}>
                  詳細を見る
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  機能 2
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  レスポンシブデザインで
                  あらゆるデバイスに対応
                </Typography>
                <Button variant="outlined" sx={{ mt: 2 }}>
                  詳細を見る
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  機能 3
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Netlifyによる高速で信頼性の高い
                  ホスティング
                </Typography>
                <Button variant="outlined" sx={{ mt: 2 }}>
                  詳細を見る
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* フッター */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: 'grey.200'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2025 My Material-UI App. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;