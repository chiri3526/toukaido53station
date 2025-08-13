import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ja from 'date-fns/locale/ja';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Checkbox,
  Box,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  CssBaseline
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { stations } from './data/stations';

const theme = createTheme({
  palette: {
    primary: {
      main: '#a1887f',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const [stationList, setStationList] = useState(stations);
  const [selectedStation, setSelectedStation] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // LocalStorageから訪問状態を読み込む
  useEffect(() => {
    const savedStations = localStorage.getItem('visitedStations');
    if (savedStations) {
      setStationList(JSON.parse(savedStations));
    }
  }, []);

  // 訪問状態の切り替え
  const handleToggleVisit = (id) => {
    const newStationList = stationList.map(station =>
      station.id === id
        ? {
            ...station,
            visited: !station.visited,
            visitDate: !station.visited ? new Date().toISOString() : null
          }
        : station
    );
    setStationList(newStationList);
    localStorage.setItem('visitedStations', JSON.stringify(newStationList));
  };

  // 訪問済みの数を計算
  const visitedCount = stationList.filter(station => station.visited).length;
  const totalCount = stationList.length;
  const progressPercentage = Math.round((visitedCount / totalCount) * 100);

  const handleEditClick = (station) => {
    setSelectedStation(station);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStation(null);
  };

  const handleSaveStation = () => {
    const newStationList = stationList.map(station =>
      station.id === selectedStation.id ? selectedStation : station
    );
    setStationList(newStationList);
    localStorage.setItem('visitedStations', JSON.stringify(newStationList));
    handleCloseDialog();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedStation({
          ...selectedStation,
          imageUrl: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              東海道53次チェックリスト
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              進捗状況
            </Typography>
            <Typography variant="body1" gutterBottom>
              訪問済み: {visitedCount} / 未訪問: {totalCount - visitedCount} (合計: {totalCount})
            </Typography>
            <Typography variant="body1" gutterBottom>
              達成率: {progressPercentage}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progressPercentage}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: 'rgba(161, 136, 127, 0.2)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#a1887f'
                }
              }}
            />
          </Box>

          <Grid container spacing={2}>
            {stationList.map((station) => (
              <Grid item xs={12} sm={6} md={4} key={station.id}>
                <Card
                  sx={{
                    bgcolor: station.visited ? 'rgba(161, 136, 127, 0.1)' : 'white',
                    transition: 'background-color 0.3s ease',
                    height: '100%'
                  }}
                >
                  <CardContent
                    sx={{
                      py: '12px !important',
                      px: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          height: '40px',
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          {station.id}. {station.name}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => handleEditClick(station)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <Checkbox
                            checked={station.visited}
                            onChange={() => handleToggleVisit(station.id)}
                            size="small"
                            sx={{
                              color: '#a1887f',
                              '&.Mui-checked': {
                                color: '#a1887f',
                              },
                              p: '4px'
                            }}
                          />
                        </Box>
                      </Box>
                      {station.visited && station.visitDate && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 1,
                            fontSize: '0.875rem'
                          }}
                        >
                          訪問日: {new Date(station.visitDate).toLocaleDateString('ja-JP')}
                        </Typography>
                      )}
                    </Box>
                    {station.visited && (
                      <Box sx={{ flex: 1, mt: 1 }}>
                        {station.imageUrl && (
                          <img
                            src={station.imageUrl}
                            alt={station.name}
                            style={{
                              width: '100%',
                              height: 150,
                              objectFit: 'cover',
                              borderRadius: 4,
                              marginBottom: 8
                            }}
                          />
                        )}
                        {station.memo && (
                          <Typography variant="body2" color="text.secondary">
                            メモ: {station.memo}
                          </Typography>
                        )}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {selectedStation?.name} の詳細編集
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <DatePicker
                label="訪問日"
                value={selectedStation?.visitDate ? new Date(selectedStation.visitDate) : null}
                onChange={(newDate) => setSelectedStation({
                  ...selectedStation,
                  visitDate: newDate ? newDate.toISOString() : null
                })}
                slotProps={{ textField: { fullWidth: true, sx: { mb: 2 } } }}
              />
              <TextField
                label="メモ"
                multiline
                rows={4}
                fullWidth
                value={selectedStation?.memo || ''}
                onChange={(e) => setSelectedStation({
                  ...selectedStation,
                  memo: e.target.value
                })}
                sx={{ mb: 2 }}
              />
              <Button
                variant="outlined"
                component="label"
                fullWidth
              >
                写真をアップロード
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
              {selectedStation?.imageUrl && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={selectedStation.imageUrl}
                    alt={selectedStation.name}
                    style={{
                      width: '100%',
                      maxHeight: 200,
                      objectFit: 'cover',
                      borderRadius: 4
                    }}
                  />
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>キャンセル</Button>
            <Button onClick={handleSaveStation} variant="contained" color="primary">
              保存
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
