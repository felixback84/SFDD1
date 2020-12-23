export default {
    // color squeme
    palette: {
        primary: {
            
            main: '#00bcd4',
            dark: '#008394',
            contrastText: '#fff'
        },
        secondary: {
            
            main: '#ff3d00',
            dark: '#b22a00',
            contrastText: '#fff'
        }
    },
    notColor: {
        // navabar
        appBar: {
            top: 0,
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        },
        grow: {
            flexGrow: 1,
        },
        form: {
            margin: "0"
        },
        cardHeader: {
            width: "auto",
            textAlign: "center",
            marginLeft: "20px",
            marginRight: "20px",
            marginTop: "-40px",
            padding: "20px 0",
            marginBottom: "15px"
        },
        socialIcons: {
            maxWidth: "24px",
            marginTop: "0",
            width: "100%",
            transform: "none",
            left: "0",
            top: "0",
            height: "100%",
            lineHeight: "41px",
            fontSize: "20px"
        },
        divider: {
            marginTop: "30px",
            marginBottom: "0px",
            textAlign: "center"
        },
        cardFooter: {
            paddingTop: "0rem",
            border: "0",
            borderRadius: "6px",
            justifyContent: "center !important"
        },
        socialLine: {
            marginTop: "1rem",
            textAlign: "center",
            padding: "0"
        },
        inputIconsColor: {
            color: "#495057"
        },
        typography: {
            useNextVariants: true
        },
        form: {
            textAlign: 'center'
        },
        image: {
            margin: '20px auto 20px auto'
        },
        pageTitle: {
            margin: '10px auto 10px auto'
        },
        textField: {
            margin: '10px auto 10px auto'
        },
        button: {
            marginTop: 20,
            position: 'relative'
        },
        customError: {
            color: 'red',
            fontSize: '0.8rem',
            marginTop: 10
        },
        progress: {
            position: 'absolute'
        },
        invisibleSeparator: {
            border: 'none',
            margin: 4
        },
        visibleSeparator: {
            width: '100%',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            marginBottom: 20
        },
        paper: {
            padding: 20
        },
        image: {
            minWidth: 100
        },
        content: {
            padding: 25,
            objectFit: 'cover'
        },
        profile: {
            '& .image-wrapper': {
                textAlign: 'center',
                position: 'relative',
                '& button': {
                    position: 'absolute',
                    top: '80%',
                    left: '70%'
                }
            },
            '& .profile-image': {
                width: 200,
                height: 200,
                objectFit: 'cover',
                maxWidth: '100%',
                borderRadius: '50%'
            },
            '& .profile-details': {
                textAlign: 'center',
                '& span, svg': {
                    verticalAlign: 'middle'
                },
                '& a': {
                    color: '#00bcd4'
                }
            },
            '& hr': {
                border: 'none',
                margin: '0 0 10px 0'
            },
            '& svg.button': {
                '&:hover': {
                    cursor: 'pointer'
                }
            }
        },
        buttons: {
            textAlign: 'center',
            '& a': {
                margin: '20px 10px'
            }
        },
        invisibleSeparator: {
            border: 'none',
            margin: 4
        },
        visibleSeparator: {
            width: '100%',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            marginBottom: '10px'
        },
    }
};