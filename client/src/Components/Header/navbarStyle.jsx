import { makeStyles } from "@material-ui/styles";

export const NavbarStyle = makeStyles((theme)=>({
  toolbar:{
    display:"flex",
    flexFlow:"row wrap",
    justifyContent:"space-between",
  },
  logoContainer:{
    display:"flex",
    flexFlow:"row wrap",
  },
  logo:{
    width:"45px",
    height:"auto",
  },
  link:{
    textDecoration:"none",
  },
  title:{
    marginLeft:"10px",
    lineHeight: "48px",
    color: "white",
    textDecoration: "none",
  },
}))