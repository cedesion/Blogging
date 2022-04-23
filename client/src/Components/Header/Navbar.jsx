import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core';
import React from 'react'
import { NavbarStyle } from './navbarStyle';
import image from '../../images/logo.png';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { Link } from 'react-router-dom';
export default function Navbar() {
  const classes=NavbarStyle();
  return (
    <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Link to="/" className={classes.link}>
            <Box className={classes.logoContainer}>
            <img src={image} alt="raect blog" className={classes.logo}/>
            <Typography variant="h6" className={classes.title}>
            BLOG
            </Typography>
            </Box>
          </Link>
          <Button
          component={Link}
          to="/posts/add"
          color="secondary" variant="contained" startIcon={<PostAddIcon />} className={classes.button}>Create Blog</Button>
        </Toolbar>
      </AppBar>
  )
}
