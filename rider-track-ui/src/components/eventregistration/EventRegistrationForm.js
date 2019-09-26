import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
//import { Paper } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import CreateEventMap from './CreateEventMap';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import {
  Typography,
  TextField,
  Grid,
  Button,
} from '@material-ui/core';


// eslint-disable-next-line react/prefer-stateless-function

function handleChange(event){

}


export default function EventRegistrationForm() {
   
   const classes = useStyles();
   const [selectedDate, setSelectedDate] = React.useState(new Date());

   const handleDateChange = date => {
     setSelectedDate(date);
   };
    return (
      // <Paper className={classes.container}>
      
      <Grid style = {{ border:'solid', borderWidth:'3px', margin:'20px', height:'1000px'}}>

      <Grid item xs={12} >
      <Typography variant="h5" align="center" style={{padding:'20px'}} gutterBottom>
         Rider Track | Event | Create
      </Typography>
      </Grid>
     
     <Grid item xs={12}>
        <Grid container  alignItems="flex-start" justify="center"  >
            <Grid item xs={12}>
              <TextField
                    id="eventname"
                    label="Event Name"
                    className={classes.textField}
                    value={""}
                    onChange={handleChange('name')}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    id="place"
                    label="Place"
                    className={classes.textField}
                    value={""}
                    onChange={handleChange('name')}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Event Time"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  />
                  </MuiPickersUtilsProvider>
                </Grid>
                
                <Grid item xs={12}>
                <TextField
                    id="max-participant"
                    label="Max Participants"
                    className={classes.textField}
                    value={""}
                    onChange={handleChange('name')}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12}>
                <TextField
                    id="duration"
                    label="Duration"
                    className={classes.textField}
                    value={""}
                    onChange={handleChange('name')}
                    margin="normal"
                  />
                </Grid>
                
                
                {/* <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                 */}

                

                <Grid item xs={12} >
                Add Check Points
                <CreateEventMap/>
               

                </Grid>

                <Grid item xs={12} style={{marginTop:50}} >
                  <Button
                    type="button"
                    variant="contained"
                  >
                    Reset
                  </Button>
                 
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    
                  >
                    Submit
                  </Button>
                </Grid>
               
                  {/* </Grid> */}
               
              </Grid>
        </Grid>
            {/* </Paper> */}
           </Grid> 
      // </Paper>
      
    );
  }




const useStyles = makeStyles(theme => ({
  container: {
    margin: '100px',
    backgroundColor: "",
    height: "600px",

  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 450,
  },
  // formheader:{
  //   text: 
  // },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
