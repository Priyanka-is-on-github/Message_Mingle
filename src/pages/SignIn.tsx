import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../index.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SiArlo } from 'react-icons/si';
import '../index.css'
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../firebase'




// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();


  const handleSubmit =async  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    const email = data.get("email");
    const password = data.get("password");


    try {
      
    await  signInWithEmailAndPassword(auth, email, password)
    navigate('/');


    } catch (error) {
      setErr(error)
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" id='mainCard' sx={{ height: '75vh' ,width:'80vw',m:10,ml:20,mt:13, position:'relative',overflow:'hidden', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',}}>
        <CssBaseline />

        <Box  id='hoverEfft' sx={{
              bgcolor: "rgb(6,0,0)",
              height: { xs: "100vh", lg: "100%" },
              width: "58.5%",
              color:'#fff',
              position: "absolute",
              top:0,
              left:'-100%',
              opacity: "0.7",
              transition:'1s',
              display:'flex',
              justifyContent:'center',
              
             
             fontSize:35,
             
              
             
            }}> 
            <Box sx={{border:'2px solid red', width:'70%', height:'70%', display:'flex',justifyContent:'center',mt:10
              }}>
            <Box sx={{mr:3}}>{<SiArlo />}</Box> 
            <Box sx={{color:'var(--main-color)',mr:1}}>Message</Box> Mingle

             
            </Box>
           
            
          </Box>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
           
            
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor:'var(--main-color)'  }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                sx={{borderColor:'var(--main-color)'}}
               
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 ,p:4, fontSize:20, backgroundColor:'var(--main-color)',"&:hover": {
                    backgroundColor: "var(--second-color)"
                  }}}
              >
                Sign In
              </Button>
              {err && <span>something went wrong</span>}
              <Grid container>
                <Grid item xs>
                  <Link to=''>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to='/'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
             
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}