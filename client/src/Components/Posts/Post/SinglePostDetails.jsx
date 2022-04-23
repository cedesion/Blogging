import { Card, Container, List, ListItem, ListItemSecondaryAction, ListItemText, 
  Grid, IconButton, CardContent, Typography,Box, CircularProgress,
Menu, MenuItem, Button, ListItemIcon, CardActions } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { postStyles } from './style';
import { GetPostDetailsById } from '../../../HttpServices/Posts';
import { Link } from 'react-router-dom';
import DialogComponent from '../../Common/DialogComponent';
import { DeletePostById } from '../../../HttpServices/Posts';
import { toast } from 'react-toastify';
export default function SinglePostDetails(props) {


  const classes=postStyles();
  const [data,setData]=useState({});
  const {id}=useParams();
 //for menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick=(event)=>{
    setAnchorEl(event.currentTarget);
  };
  const handleClose=()=>{
    setAnchorEl(null);
  };

//for dialog
  const [dialogOpen, setDialogOpen]=useState(false);


  useEffect(() => {
    GetPostDetailsById({ id })
      .then(({ data: { data } }) => {
        setData(data);
        console.log("data", data);
      })
      .catch((e) => {
        console.log("error", e);
        if (e.response.status === 404) {
          props.history.push("/posts");
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DialogContent=()=> <Grid container>
    <Grid item xs={12}>
      <Card>
        <CardContent>
        <Typography variant="h6" color="primary" gutterBottom align='center'>Are You Sure Want to Delete?</Typography>
        <Typography variant="h5" color="error"  gutterBottom align='center'>{data.title}</Typography>
      </CardContent>
      <CardActions style={{justifyContent:"center"}}>
        <Box mt={1} mb={1}>
          <Button variant="outlined" color="primary" style={{marginRight:"8px"}} onClick={()=>setDialogOpen(false)}>Cancel</Button>
          <Button variant="outlined" color="secondary"  onClick={()=>DeletePostById({id}).then(()=>{
            console.log("deleted successfully");
            setDialogOpen(false);
            toast.success("Post Deleted Successfully")
            props.history.push('/posts');
          })}>Delete</Button>
        </Box>
      </CardActions>
      </Card>
    </Grid>
  </Grid>

  const formatDate=(str)=>{
    let date=new Date();
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  };
  return (
    <Container>
       <DialogComponent
       openState={dialogOpen} 
       handleDialogClose={()=>setDialogOpen(false)}
       content={<DialogContent/>}/>
       <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem 
        onClick={handleClose} 
        color="primary" 
        component={Link} 
        to={`/posts/edit/${id}`}>
        <Button startIcon={<EditIcon/>} color="primary">
          Edit
        </Button>
        </MenuItem>
        <MenuItem color="secondary">
        <Button 
            startIcon={<DeleteForeverIcon/>} 
            color="secondary"
            onClick={()=>{
              handleClose();
              setDialogOpen(true);
          }}>
          Delete
        </Button>
        </MenuItem>
      </Menu>
      <Grid container>
        {!Object.keys(data).length? <Grid item xs='12'>
        <Box
          p={5}
          mt={5}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <CircularProgress/>
        </Box>
        </Grid> : <Grid item xs={12} sm={8}>
          <Card>
            <List>
              <ListItem>
                <ListItemText>
                  <Typography variant="h6" color="textPrimary">
                    {data.title}
                  </Typography>
                  {data.publishedAt ? <Typography variant="body1" color="textSecondary">
                    {formatDate(data.publishedAt)}
                  </Typography> : null} 
                </ListItemText>
                <ListItemSecondaryAction>
                  <IconButton 
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  >
                    <MoreVertIcon/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            <img src={data.imageFileSet} 
            alt={data.title} 
            className={classes.responsiveImg}
            />
          </Card>
          <CardContent>
          <Typography variant="body1" component="h6" color="textSecondary">
         {data.body}
                  </Typography>
            
          </CardContent>
        </Grid>}
        
        
      </Grid>
    </Container>
  )
}
