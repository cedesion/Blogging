import { Box, Button, Container, Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import joi, { errors } from 'joi-browser';
import FileBase64 from "react-file-base64"
import { TextInputField } from '../../Common/FormComponents';
import { AddPosts } from '../../../HttpServices/Posts';
import { toast } from 'react-toastify';
export default function AddPost(props) {
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
    AddPosts({data}).then(()=>{
      console.log("Post Added Successfully");
      toast.success("Post Added Successfully");
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

  return (
    <Container maxWidth="md" component={Box} mt={4}>
      <Grid container
        direction='row'
        justifyContent='center'
        alignItems='center'>
        <Grid item xs={12} sm={6}>
          <Box mt={2} mb={1}>
            <Typography variant="h6" color="primary" align="center">
              Add Blog Post
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
    </Container>
  )
}
