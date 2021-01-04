import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// styles
import styles from "assets/jss/material-kit-pro-react/components/typographyStyle.js";
const useStyles = makeStyles(styles);

export default function TitleSection(props) {
  const { children } = props;
  const classes = useStyles();
  return (
    <div className={classNames(classes.typo, classes.mutedText)}>
      <div className={classes.textCenter}>
        <h1>
          {children}
        </h1>
      </div>
    </div>
  );
}

TitleSection.propTypes = {
  children: PropTypes.node
};



