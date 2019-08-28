import React, { Component } from "react";
import "./Profile.css";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Create from "@material-ui/icons/Create";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const styles = theme => ({
  bigAvatar: {
    margin: 10,
    width: 50,
    height: 50
  },
  fab: {
    margin: 8
  },
  paper: {
    position: "absolute",
    width: 250,
    backgroundColor: "white",
    padding: 16,
    outline: "none",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  },
  paper_big: {
    position: "absolute",
    width: 600,
    backgroundColor: "white",
    padding: 16,
    outline: "none",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  }
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_picture: "",
      username: "",
      media: 0,
      follows: 0,
      followed_by: 0,
      full_name: "",
      userPosts: null,
      access_token: "8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784", //sessionStorage.getItem('access-token'),
      editNameOpen: false,
      fullnameRequired: "dispNone",
      editFullName: "",
      postItemOpen: false,
      selectedPost: null,
      selectedIndex: -1,
      addNewComment: "",
      baseUrl: "https://api.instagram.com/v1/"
    };
  }

  /**
   * @description On component load - Get user profile and user posts
   */
  componentWillMount() {
    // Get user profile
    let dataUserProfile = null;
    let xhrUserProfile = new XMLHttpRequest();
    let that = this;
    xhrUserProfile.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        const data = JSON.parse(this.responseText).data;
        that.setState({
          profile_picture: data.profile_picture,
          username: data.username,
          media: data.counts.media,
          follows: data.counts.follows,
          followed_by: data.counts.followed_by,
          full_name: data.full_name
        });
      }
    });
    xhrUserProfile.open(
      "GET",
      this.state.baseUrl + "users/self/?access_token=" + this.state.access_token
    );
    // xhrUserProfile.setRequestHeader("Cache-Control", "no-cache");
    xhrUserProfile.send(dataUserProfile);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* <Header profileIcon={true} profilePicture={this.state.profile_picture} profileUserName={this.state.username} /> */}
        <Container fixed>
          <Grid container spacing={3} justify="center" alignItems="center">
            <Grid item>
              <Avatar
                alt={this.state.username}
                src={this.state.profile_picture}
                className={classes.bigAvatar}
              />
            </Grid>
            <Grid item>
              <Typography variant="h6" component="h6">
                {this.state.username}
              </Typography>
              <Grid
                container
                spacing={10}
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="subtitle2">
                    Posts: {this.state.media}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    Follows: {this.state.follows}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    Followed By: {this.state.followed_by}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                justify="flex-start"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="h6">{this.state.full_name}</Typography>
                </Grid>
                <Grid item>
                  <Fab
                    color="secondary"
                    aria-label="Edit"
                    className={classes.fab}
                    onClick={this.handleEditNameOpen}
                  >
                    <Create />
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
