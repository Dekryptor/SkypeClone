import React from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Dialog, {
  DialogActions,
  DialogContent,
} from 'material-ui/Dialog';

const styles = {
  closeDialog:{
    color:'red',
    position:'absolute',
    right:0,
    top:0,
  },
  comp:{
    position:'relative',
    display:'flex',
    
  },
  background:{
    backgroundColor:'rgba(0, 0, 0,0.5)',
    
  }
}

 class FormDialog extends React.Component {
   

  render() {
    const { classes } = this.props
    
    return (
      <div className={classes.comp}>
        <Dialog
          fullScreen={this.props.fullScreen}
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
          className={classes.background}
        >
          
          <DialogContent>
            {this.props.compo}
          </DialogContent>
          <DialogActions>
            <Button className = {classes.closeDialog}
                  onClick={this.props.handleClose}>
              <i className='material-icons' >close</i>
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles) (FormDialog)