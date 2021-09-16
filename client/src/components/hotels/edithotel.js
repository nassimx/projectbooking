import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Edithotel({ handleCloseEdit, openedit, h }) {
  const classes = useStyles();
  useEffect(() => {
    // console.log(h._id);
  }, []);

  return (
    <Dialog
      fullScreen
      open={openedit}
      onClose={handleCloseEdit}
      // @ts-ignore
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCloseEdit}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Edit Hotel
          </Typography>
          <Button autoFocus color="inherit" onClick={handleCloseEdit}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      {/* <h1>{h._id}</h1> */}
    </Dialog>
  );
}
