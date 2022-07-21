import React from "react"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
// components
import SearchingModeCardModeOne from '../../views/dashboard/components/modeOne/SearchingModeCardModeOne'
import SearchingModeCardModeTwo from '../../views/dashboard/components/modeTwo/SearchingModeCardModeTwo'
import SearchingModeCardModeThree from '../../views/dashboard/components/modeThree/SearchingModeCardModeThree'
import SearchingModeCardModeFour from '../../views/dashboard/components/modeFour/SearchingModeCardModeFour'
import SearchingModeCardModeFive from '../../views/dashboard/components/modeFive/SearchingModeCardModeFive'
import SearchingModeCardModeSix from '../../views/dashboard/components/modeSix/SearchingModeCardModeSix'
import SearchingModeCardModeSeven from '../../views/dashboard/components/modeSeven/SearchingModeCardModeSeven'
import SearchingModeCardModeEight from '../../views/dashboard/components/modeEight/SearchingModeCardModeEight'
import SearchingModeCardModeNine from '../../views/dashboard/components/modeNine/SearchingModeCardModeNine'
import SearchingModeCardModeNine from '../../views/dashboard/components/modeTen/SearchingModeCardModeTen'
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
            <div>
                {/* modeFive */}
                <SearchingModeCardModeFive
                  title="modeFive"
                  icon={GroupAdd}
                  mode="modeFive"
                  thingid={props.thingid}
                />
            </div>
            <div>
              {/* modeSix */}
              <SearchingModeCardModeSix
                title="modeSix"
                icon={GroupAdd}
                mode="modeSix"
                thingid={props.thingid}
              />
            </div>
            <div>
              {/* modeSeven - by meters of staticDevices */}
              <SearchingModeCardModeSeven
                title="modeSeven"
                icon={GroupAdd}
                mode="modeSeven"
                thingid={props.thingid}
              /> 
            </div>
            <div>
              {/* modeEight - by meters of staticDevices products */}
              <SearchingModeCardModeEight
                title="modeEight"
                icon={GroupAdd}
                mode="modeEight"
                thingid={props.thingid}
              />
            </div>
            <div>
              {/* modeNine - by price range of staticDevices products in a category*/}
              <SearchingModeCardModeNine
                title="modeNine"
                icon={GroupAdd}
                mode="modeNine"
                thingid={props.thingid}
              />
            </div>
            <div>
              {/* modeTen - by price range of staticDevices products in a tag*/}
              <SearchingModeCardModeTen
                title="modeTen"
                icon={GroupAdd}
                mode="modeTen"
                thingid={props.thingid}
              />
            </div>
          </Slider>
        </Container>
      </div>
    
  )
}

export default Header
