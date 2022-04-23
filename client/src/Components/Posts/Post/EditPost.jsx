import { Box, Button, Container, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import joi, { errors } from 'joi-browser';
import FileBase64 from "react-file-base64"
import { TextInputField } from '../../Common/FormComponents';
import { EditPostData, GetPostDetailsById } from '../../../HttpServices/Posts';
import { toast } from 'react-toastify';
import { postStyles } from './style';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';


export default function EditPost(props) {
  const classes=postStyles();

  const {id} =useParams();  
  const [formValidationError, setFormValidationError] =useState('');
  const [state,setState]=useState({
    data:{
      title:"",
      imageFileSet:"",
      body:"",
    },
    errors:{},
  });

  const schema={
      title:joi.string().required().label("Title").min(5),
      imageFileSet:joi.string().required().label("Image"),
      body:joi.string().required().label("body"),
  }

const handleOnChange=({target})=>{
  const {data, errors}=state;
  const {error}=joi.validate(data[target.name], schema[target.name],{abortEarly:true,});
  // console.log("response",error);
  !error ? (errors[target.name]="") : (errors[target.name]=error.details[0].message);
  data[target.name]=target.value;
  setState({data, errors});
};

const validate=()=>{
  let errorObj = {}
  let {error}=joi.validate(state.data,schema,{abortEarly: false});
  !error? (errorObj={}) : error.details.map((item)=>(errorObj[item.path]=item.message));
  return errorObj;
}

const handleOnSubmit=(e)=>{
  e.preventDefault();
  let errors= validate();
  let {data}=state;
  setState({data,errors});

  if(Object.keys(errors).length===0 && errors.constructor===Object){
    EditPostData({id,data}).then(()=>{
      toast.success("Post Upadated Successfully");
      //reset form
      setState({
        data:{
          title:"",
          imageFileSet:"",
          body:"",
        },
        errors:{},
      });
      //navigate to post
      props.history.push("/posts")
    }).catch((e)=>{
      console.log("error",e);
      setFormValidationError(e.message);
    })
  }
  //add post 
  
  
};



useEffect(()=>{
  GetPostDetailsById({id}).then(({ data:{data:item}})=>{
    const {data,errors}=state;
    data.title=item.title;
    data.imageFileSet=item.imageFileSet;
    data.body=item.body;
    setState({data,errors});
  }).catch((e)=>{
    console.log("error",e);
    props.history.push('/posts');
  });

},[id])
  return (
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <img src={state.data.imageFileSet} alt={state.data.title} className={classes.responsiveImg}/>
          </Grid>
          <Grid item xs={12} sm={6}>
          <Grid container>
        <Grid item xs={12}>
          <Box mt={2} mb={1}>
            <Typography variant="h6" color="primary" align="center">
             Edit Blog Post
            </Typography>
            <Typography variant="subtitle2" color="error" align="center">
              {formValidationError}
            </Typography>
          </Box>
          <form onSubmit={handleOnSubmit}>
            <Box mt={2} mb={1}><TextInputField state={state} 
            name="title" 
            onChange={handleOnChange}/></Box>
            <Box mt={2} mb={1}>
              <FileBase64 onDone={(e)=>{
                let {data,errors}=state;

                data.imageFileSet=e.base64;
                errors.imageFileSet=""
                setState({data,errors});
              }}/>
              <Typography variant="subtitle2" color="error">
                {state.errors.imageFileSet ? state.errors.imageFileSet:null}
              </Typography>
            </Box>
            <Box mt={2} mb={1}><TextInputField state={state} 
            name="body" 
            onChange={handleOnChange}
            multiline
            rows={4}/></Box>
            <Box  mt={2} mb={1}>
              <Button color="primary" variant="outlined"  type="submit" fullWidth>
                {" "}
                Submit{" "}
              </Button>
            </Box>
          </form>
          </Grid>
        </Grid>
      </Grid>
        </Grid>
      </Container>
  )
}
