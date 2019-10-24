import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function PaticipantList(props) {
  const classes = useStyles();
  // const [userList] = useState([{ name: 'Vivek', url: 'https://qodebrisbane.com/wp-content/uploads/2019/07/This-is-not-a-person-2-1.jpeg' }, { name: 'Matt', url: 'https://qodebrisbane.com/wp-content/uploads/2019/07/This-is-not-a-person-2-1.jpeg' }]);
  const { userList } = props;
  return (
    <div>
      <div><Typography color="textSecondary">Participants list</Typography></div>

      <Paper style={{ maxHeight: 400, overflow: 'auto' }}>
        <List dense className={classes.root}>


          {userList.map((element) => (
            <div>
              <ListItem alignItems="center">
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
