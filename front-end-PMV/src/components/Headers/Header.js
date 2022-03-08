import React from "react"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
// components
import SearchingModeCardModeOne from '../../views/dashboard/components/modeOne/SearchingModeCardModeOne'
import SearchingModeCardModeTwo from '../../views/dashboard/components/modeTwo/SearchingModeCardModeTwo'
import SearchingModeCardModeThree from '../../views/dashboard/components/modeThree/SearchingModeCardModeThree'
import SearchingModeCardModeFour from '../../views/dashboard/components/modeFour/SearchingModeCardModeFour'
// slick corrousel
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// icons
import GroupAdd from "@material-ui/icons/GroupAdd"
// styles
import componentStyles from "assets/theme/components/header.js"
const useStyles = makeStyles(componentStyles)

const Header = (props) => {
  // styles
  const classes = useStyles()
  // slick carrousel setts
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,  
  }
  
  return ( 
    
      <div className={classes.header}>
        <Container
          maxWidth={false}
          component={Box}
          classes={{ root: classes.containerRoot }}
        >
          <Slider {...settings}>
            <div sx={{
              margin:"10px",
            }}>
                {/* modeOne */}
                <SearchingModeCardModeOne 
                  title="modeOne"
                  icon={GroupAdd}
                  mode="modeOne" 
                  thingid={props.thingid} 
                /> 
            </div>
            <div>
                {/* modeTwo */}
                <SearchingModeCardModeTwo
                  title="modeTwo"
                  icon={GroupAdd}
                  mode="modeTwo"
                  thingid={props.thingid}
                />
            </div>
            <div>
                {/* modeThree */}
                <SearchingModeCardModeThree
                  title="modeThree"
                  icon={GroupAdd}
                  mode="modeThree"
                />
            </div>
            <div>
                {/* modeFour */}
                <SearchingModeCardModeFour
                  title="modeFour"
                  icon={GroupAdd}
                  mode="modeFour"
                  thingid={props.thingid}
                />
            </div>
          </Slider>
        </Container>
      </div>
    
  )
}

export default Header
