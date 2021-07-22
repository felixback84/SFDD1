// argon
import boxShadows from "assets/theme/box-shadow.js"

// material kit pro
import {
        container,
        mlAuto,
        section,
        main,
        mainRaised,
        title,
        cardTitle,
        grayColor,
        roseColor
    } from "assets/theme/material-kit-pro-react.js"
import tooltipsStyle from "assets/theme/material-kit-pro-react/tooltipsStyle.js"
import imagesStyles from "assets/theme/material-kit-pro-react/imagesStyles.js"
import customSelectStyle from "assets/theme/material-kit-pro-react/customSelectStyle.js"

const componentStyles = (theme) => ({
    
    // argon
    cardRoot: {
        boxShadow: boxShadows.boxShadow + "!important",
        border: "0!important",
    },
    cardRootSecondary: {
        backgroundColor: theme.palette.secondary.main,
    },
    cardHeaderRoot: {
        backgroundColor: theme.palette.white.main + "!important",
    },
    containerRoot: {
        [theme.breakpoints.up("md")]: {
        paddingLeft: "39px",
        paddingRight: "39px",
        },
    },
    gridItemRoot: {
        [theme.breakpoints.up("xl")]: {
        marginBottom: "0!important",
        },
    },
    typographyRootH6: {
        textTransform: "uppercase",
    },
    plLg4: {
        [theme.breakpoints.up("md")]: {
        paddingLeft: "1.5rem",
        },
    },
    ptMd4: {
        [theme.breakpoints.up("sm")]: {
        paddingTop: "1.5rem!important",
        },
    },
    mtMd5: {
        [theme.breakpoints.up("sm")]: {
        paddingTop: "3rem!important",
        },
    },
    cardHeaderRootProfile: {
        [theme.breakpoints.up("sm")]: {
        paddingBottom: "1.5rem!important",
        paddingTop: "1.5rem!important",
        },
    },
    buttonRootInfo: {
        color: theme.palette.white.main,
        backgroundColor: theme.palette.info.main,
        "&:hover": {
        backgroundColor: theme.palette.info.dark,
        },
    },
    buttonRootDark: {
        color: theme.palette.white.main,
        backgroundColor: theme.palette.dark.main,
        "&:hover": {
        backgroundColor: theme.palette.dark.dark,
        },
    },
    profileImage: {
        verticalAlign: "middle",
        borderStyle: "none",
        transform: "translate(-50%,-30%)",
        transition: "all .15s ease",
    },
    cardProfileLink: {
        color: theme.palette.primary.main,
        backgroundColor: "initial",
        textDecoration: "none",
        fontSize: "1rem",
        "&:hover": {
        color: theme.palette.primary.dark,
        },
    },
    order1: {
        [theme.breakpoints.down("lg")]: {
        order: "1!important",
        },
    },
    order2: {
        [theme.breakpoints.down("lg")]: {
        order: "2!important",
        },
    },
    marginBottomXl0: {
        [theme.breakpoints.up("lg")]: {
        marginBottom: "0!important",
        },
    },


    // material kit pro
    mlAuto,
    main,
    ...imagesStyles,
    ...customSelectStyle,
    ...tooltipsStyle,
    container: {
        ...container,
        zIndex: 2
    },
    mainRaised: {
        ...mainRaised
    },
    section: {
        ...section,
        padding: "70px 0px"
    },
    title: {
        ...title,
        marginBottom: 0
    },
    sectionGray: {
        background: grayColor[14]
    },
    mainPrice: {
        margin: "10px 0px 25px"
    },
    textCenter: {
        textAlign: "center!important"
    },
    features: {
        paddingTop: "30px"
    },
    productPage: {
        backgroundColor: grayColor[2],
        "& $mainRaised": {
            margin: "-40vh 0 0",
            padding: "40px"
        },
        "& .image-gallery-slide img": {
                borderRadius: "3px",
                maxWidth: "300px",
                height: "auto"
        },
        "& .image-gallery-swipe": {
            margin: "30px 0px",
            overflow: "hidden",
            width: "100%",
            height: "auto",
            textAlign: "center"
        },
        "& .image-gallery-thumbnails > .image-gallery-thumbnails-container .image-gallery-thumbnail": {
            "&.active > .image-gallery-thumbnail-inner": {
                opacity: "1",
                borderColor: grayColor[6]
            },
            "& > .image-gallery-thumbnail-inner": {
                width: "80%",
                maxWidth: "85px",
                margin: "0 auto",
                padding: "8px",
                display: "block",
                border: "1px solid transparent",
                background: "transparent",
                borderRadius: "3px",
                opacity: ".8"
            },
            "& > .image-gallery-thumbnail-inner img": {
                borderRadius: "3px",
                width: "100%",
                height: "auto",
                textAlign: "center"
            }
        }
    },
    titleRow: {
        marginTop: "-8vh"
    },
    floatRight: {
        float: "right!important"
    },
    pageHeader: {
        minHeight: "60vh",
        maxHeight: "600px",
        height: "auto",
        backgroundPosition: "top center"
    },
    relatedProducts: {
        marginTop: "50px",
        "& $title": {
            marginBottom: "80px"
        }
    },
    pickSize: {
        marginTop: "50px"
    },
    pullRight: {
        float: "right"
    },
    cardCategory: {
        textAlign: "center",
        marginTop: "10px"
    },
    cardTitle: {
        ...cardTitle,
        textAlign: "center"
    },
    cardDescription: {
        textAlign: "center",
        color: grayColor[0]
    },
    textRose: {
        color: roseColor[0]
    },
    justifyContentBetween: {
        justifyContent: "space-between!important"
    },
    socialFeed: {
        "& p": {
            display: "table-cell",
            verticalAlign: "top",
            overflow: "hidden",
            paddingBottom: "10px",
            maxWidth: 300
        },
        "& i": {
            fontSize: "20px",
            display: "table-cell",
            paddingRight: "10px"
        }
    },
    img: {
        width: "20%",
        marginRight: "5%",
        marginBottom: "5%",
        float: "left"
    },
    block: {
        color: "inherit",
        padding: "0.9375rem",
        fontWeight: "500",
        fontSize: "12px",
        textTransform: "uppercase",
        borderRadius: "3px",
        textDecoration: "none",
        position: "relative",
        display: "block"
    },
    inlineBlock: {
        display: "inline-block",
        padding: "0px",
        width: "auto"
    },
    list: {
        marginBottom: "0",
        padding: "0",
        marginTop: "0"
    },
    left: {
        float: "left!important",
        display: "block"
    },
    right: {
        padding: "15px 0",
        margin: "0",
        float: "right"
    },
    icon: {
        top: "3px",
        width: "18px",
        height: "18px",
        position: "relative"
    }


});

export default componentStyles;






  
