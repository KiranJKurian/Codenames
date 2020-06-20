/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { FormControlLabel } from '@material-ui/core';

const TeamSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    color: theme.palette.secondary.dark,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.primary.dark,
      '& + $track': {
        backgroundColor: theme.palette.primary.light,
      },
    },
    '&$focusVisible $thumb': {
      border: '1px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.secondary.light,
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, label, ...props }) => {
  return (
    <FormControlLabel
      control={
        <Switch
          focusVisibleClassName={classes.focusVisible}
          disableRipple
          classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked,
          }}
          {...props}
        />
      }
      label={label}
    />
  );
});

export default TeamSwitch;