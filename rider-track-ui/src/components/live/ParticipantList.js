import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

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

export default function PaticipantList() {
  const classes = useStyles();

  return (
    <List className={classes.root}>

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="https://qodebrisbane.com/wp-content/uploads/2019/07/This-is-not-a-person-2-1.jpeg" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={(
            <div>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                to Scott, Alex, Jennifer
              </Typography>
               — Wish I could come, but I'm out of town this…
            </div>
          )}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="https://qodebrisbane.com/wp-content/uploads/2019/07/This-is-not-a-person-2-1.jpeg" />
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={(
            <div>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Sandra Adams
              </Typography>
               — Do you have Paris recommendations? Have you ever…
            </div>
          )}
        />
      </ListItem>
    </List>
  );
}
