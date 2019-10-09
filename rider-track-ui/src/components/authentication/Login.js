import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class Login extends Component {
    
    render() {
        return (
            <div>
              <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please enter your email ID and password 
                  </DialogContentText>
                  <div className="row">
                      <div className="col-md-12">
                      <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                      />
                      </div> 
                  </div>
                  
                  <div className="row">
                      <div className="col-md-12">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                        />
                      </div>
                  </div>
                  </DialogContent>
                  <DialogActions>
                    <Button color="primary">
                        Login
                    </Button>
                    <Button color="primary">
                        Cancel
                    </Button>
              </DialogActions>
            </div>
        )
    }
}