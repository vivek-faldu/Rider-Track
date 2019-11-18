import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

const classes = {
  root: {
    width: '100%',
    maxWidth: 360,
  },
};

export default class PaticipantList extends React.Component {
handleChangechecked = (index) => {
  const { checkboxValue } = this.props;
  checkboxValue[index][1] = !checkboxValue[index][1];
   this.props.handleChangecheckedvalues(checkboxValue);
 };

render() {
  const { checkboxValue, userList } = this.props;
  return (
    <div>
      <div><Typography color="textSecondary">Participants list</Typography></div>

      <Paper style={{ maxHeight: 400, overflow: 'auto' }}>
        <List dense className={classes.root}>

          {userList.map((element, i) => (
            <div>
              <ListItem alignItems="center">
                <Checkbox
                  checked={checkboxValue[i][1]}
                  onChange={() => { this.handleChangechecked(i); }}
                  inputProps={{
          'aria-label': 'primary checkbox',
        }}
                />
                <ListItemAvatar>
                  <Avatar alt="Travis Howard" src={element.url} />
                </ListItemAvatar>
                <ListItemText
                  primary={element.name}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
      ))}
        </List>
      </Paper>
    </div>
  );
}
}
