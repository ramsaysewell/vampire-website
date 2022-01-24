import React, { Component } from 'react';
import Navbar from './NavbarComponent';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Publications from '../pages/PublicationsPage';
import Home from '../pages/HomePage';
import Team from '../pages/TeamPage';
import AboutUs from '../pages/AboutUsPage';
import ContactUs from '../pages/ContactUsPage';
const customTheme = createTheme({
    palette: {
        primary: {
            main: '#141414',
        },

    }
})
class Main extends Component {
    render() {

        return(
            <>
            <ThemeProvider theme={customTheme}>
                <Router>
                 <Navbar />
                 
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/publications' element={<Publications/>}/>
                        <Route path='/team' element={<Team/>}/>
                        <Route path='/about' element={<AboutUs/>}/>
                        <Route path='/contact' element={<ContactUs/>}/>

                    </Routes>
                </Router>
          

           
            </ThemeProvider>
            </>
        );
    }
}

export default Main;