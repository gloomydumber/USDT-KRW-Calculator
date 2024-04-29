import { useRef, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { Grid } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Container, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import CustomizedDialogs from './components/CustomizedDialogs';
import CustomizedTextField from './components/CustomizedTextField';
import { darkTheme, lightTheme } from './styles/themes';
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./store/atoms";
import { map, mergeMap, debounceTime } from "rxjs";
import { fromMultipleEvents, ajaxCalls } from './utils/function';
import logo from "./assets/logo.png"
import success from "./assets/success.mp3"
import fail from "./assets/fail.mp3"


function App() {
  const sucessAudio = new Audio(success);
  const failAudio = new Audio(fail);
  const isDark = useRecoilValue(isDarkAtom);
  const usdtInputRef = useRef<HTMLInputElement>(null);
  const krwInputRef = useRef<HTMLInputElement>(null);
  const btcInputRef = useRef<HTMLInputElement>(null);

  const copy = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      navigator.clipboard.writeText(ref.current.value)
        .then(() => sucessAudio.play())
        .catch(() => failAudio.play());
    }
  };

  useEffect(() => {
    if(!usdtInputRef.current || !krwInputRef.current || !btcInputRef.current) return;

    const usdtMultiple$ = fromMultipleEvents(usdtInputRef.current, ['keyup', 'paste', 'click', 'propertychange']);
    const krwMultiple$ = fromMultipleEvents(krwInputRef.current, ['keyup', 'paste', 'click', 'propertychange']);
    const btcMultiple$ = fromMultipleEvents(btcInputRef.current, ['keyup', 'paste', 'click', 'propertychange']);
    
    const usdtNewInsert$ = usdtMultiple$.pipe(
      debounceTime(500),
    );
    const krwNewInsert$ = krwMultiple$.pipe(
      debounceTime(500),
    )
    const btcNewInsert$ = btcMultiple$.pipe(
      debounceTime(500),
    )

    const ajx$ = ajaxCalls().pipe(
      // error handling logic needed here
      map((_) => { return { btckrw: _[0].btckrw, btcusdt: _[1].btcusdt } }),
    );

    const usdtSubscription$ = usdtNewInsert$.pipe(
      mergeMap((_) => ajx$)
    ).subscribe({
      next: res => {
        if(krwInputRef.current && usdtInputRef.current && btcInputRef.current)
        {
          console.log();
          if(usdtInputRef.current.value != '')
          {
            krwInputRef.current.value = (((res.btckrw as number) / (res.btcusdt as number)) * Number(usdtInputRef.current.value)).toString();
            btcInputRef.current.value = (Number(usdtInputRef.current.value) / (res.btcusdt as number)).toString();
          }
          else
          {
            krwInputRef.current.value = '';
            btcInputRef.current.value = '';
          }
        }
      },
      error: err => console.log(err),
    });

    const krwSubscripiton$ = krwNewInsert$.pipe(
      mergeMap((_) => ajx$)
    ).subscribe({
      next: res => {
        if(krwInputRef.current && usdtInputRef.current && btcInputRef.current)
        {
          console.log();
          if(krwInputRef.current.value != '')
          {
            usdtInputRef.current.value = (Number(krwInputRef.current.value) / ((res.btckrw as number) / (res.btcusdt as number))).toString();
            btcInputRef.current.value = ((Number(krwInputRef.current.value) / (res.btckrw as number))).toString(); // e notation fix needed
          }
          else
          {
            usdtInputRef.current.value = '';
            btcInputRef.current.value = '';
          }
        }
      },
      error: err => console.log(err),
    });

    const btcSubscription$ = btcNewInsert$.pipe(
      mergeMap((_) => ajx$)
    ).subscribe({
      next: res => {
        if(krwInputRef.current && usdtInputRef.current && btcInputRef.current) {
          console.log();
          if(btcInputRef.current.value != '')
          {
            krwInputRef.current.value = ((res.btckrw as number) * Number(btcInputRef.current.value)).toString();
            usdtInputRef.current.value = ((res.btcusdt as number) * Number(btcInputRef.current.value)).toString();
          }
          else
          {
            krwInputRef.current.value = '';
            usdtInputRef.current.value = '';
          }
        }
      },
      error: err => console.log(err),
    });

    return () => {
      usdtSubscription$.unsubscribe();
      krwSubscripiton$.unsubscribe();
      btcSubscription$.unsubscribe();
    };
  }, []);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <CssBaseline />
        <Container fixed sx={{ height: '', bgcolor: '', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mt: '10%'}}>
          <Box component="img" src={logo} sx={{ height: "40px", mb: '20px'}} />

          <Typography sx={{ mb: '20px' }}>
            USDTKRWCalculator
          </Typography>

          <Grid container gap={3} maxWidth='410px'>

            <Grid container spacing={1} >
              <Grid item xs={11}>
                <CustomizedTextField id="usdt" label="USDT" adornmentContent="₮" inputRef={usdtInputRef} />
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => {copy(usdtInputRef)}}>
                  <ContentCopyIcon color="primary" />
                </IconButton>
              </Grid>
            </Grid>

            <Grid container spacing={1}> 
              <Grid item xs={11}>
                <CustomizedTextField id="krw" label="KRW" adornmentContent="₩" inputRef={krwInputRef} />
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => {copy(krwInputRef)}}>
                  <ContentCopyIcon color="primary" />
                </IconButton>
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={11}>
                <CustomizedTextField id="btc" label="BTC" adornmentContent="₿" inputRef={btcInputRef} />
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => {copy(btcInputRef)}}>
                  <ContentCopyIcon color="primary" />
                </IconButton>
              </Grid>
            </Grid>

          </Grid>

          <Box sx={ { mt: '30px' }}>
            <CustomizedDialogs />
          </Box>

          {/* error notification needed here */}

        </Container>
        
      </ThemeProvider>
    </>
  )
}

export default App