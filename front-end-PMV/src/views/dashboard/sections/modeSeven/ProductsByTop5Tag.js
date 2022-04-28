import React from 'react'
// nodejs library that concatenates classes
import classNames from "classnames"
// mui stuff
import { makeStyles, useTheme } from '@material-ui/core/styles'
import MobileStepper from '@material-ui/core/MobileStepper'
import Button from '@material-ui/core/Button'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import { Tooltip } from '@material-ui/core'
// mui kit pro
import GridContainer from "components/Grid/GridContainer.js"
import GridItem from "components/Grid/GridItem.js"
import Card from 'components/Card/Card.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardBody from "components/Card/CardBody.js"
import CardFooter from "components/Card/CardFooter.js"
// plugin
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
// icons
import Favorite from '@material-ui/icons/Favorite'
// styles
import componentStyles from "assets/theme/views/admin/productsByTop5Tag.js"
const useStyles = makeStyles(componentStyles)
// autoplay
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const ProductsByTop5Tag = (props) => {
	
	// styles
  const classes = useStyles()
	const theme = useTheme()

	// arr data
	const top5ProductsUx = props.top5productsux

	// state hook
  const [activeStep, setActiveStep] = React.useState(0)
	const maxSteps = top5ProductsUx.length
	
	// steppers
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >	
				{/* loop */}
        {top5ProductsUx.map((top5ProductUx, index) => (
					<>
						<GridContainer>
							<GridItem sm={12} md={12} key={index}>
								<Card product>
									<CardHeader image>
											<a href="#pablo">
												<img src={top5ProductUx.imgUrl}/>
											</a>
									</CardHeader>
									<CardBody>
											<h6
												className={classNames(
													classes.cardCategory,
													classes.textRose
												)}
											>
												Trending
											</h6>
												<h4 className={classes.cardTitle}>{top5ProductUx.name}</h4>
											<div className={classes.cardDescription}>
												{top5ProductUx.description}
											</div>
									</CardBody>
									<CardFooter className={classes.justifyContentBetween}>
											<div className={classes.price}>
												<h4>{top5ProductUx.price}</h4>
											</div>
											<div className={classes.stats}>
												<Tooltip
													id="tooltip-top"
													title="Save to Wishlist"
													placement="top"
													classes={{ tooltip: classes.tooltip }}
												>
													<Button justIcon color="rose" simple>
														<Favorite/>
													</Button>
												</Tooltip>
											</div>
									</CardFooter>
								</Card>
							</GridItem>
						</GridContainer>
					</>
        ))}
      </AutoPlaySwipeableViews>
			
			{/* stepper */}
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>
  )
}

export default ProductsByTop5Tag


