import React from 'react'
import { postStyles } from './style'
import { Grow, Card, Box, CardContent, Typography} from '@material-ui/core'
import { Link } from 'react-router-dom';
export default function SinglePost({item}) {
  const classes=postStyles();
  return (
    <Grow in>
      <Card>
        <Box className={classes.cardImageContainer}>
          <img src={item.imageFileSet} alt={item.title}  className={classes.responsiveImg}/>
        </Box>
        <CardContent>
          <Link to={`/posts/${item._id}`} className={classes.link}>
          <Typography variant="body1" component="h6" color="textPrimary">
            {item.title}
          </Typography>
          </Link>
        </CardContent>
      </Card>
    </Grow>
  )
}
