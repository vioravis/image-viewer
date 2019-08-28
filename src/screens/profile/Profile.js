import React, { Component } from "react";
import "./Profile.css";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Create from "@material-ui/icons/Create";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
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
    xhrUserProfile.send(dataUserProfile);

    // Get user posts
    let dataUserPosts = null;
    let xhrUserPosts = new XMLHttpRequest();
    xhrUserPosts.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        const data = JSON.parse(this.responseText).data;
        that.setState({ userPosts: [...data] });
      }
    });
    xhrUserPosts.open(
      "GET",
      this.state.baseUrl +
        "users/self/media/recent?access_token=" +
        this.state.access_token
    );
    xhrUserPosts.send(dataUserPosts);
  }

  /**
   * @memberof Profile
   * @description To close edit full name modal and set values
   */
  handleEditNameClose = () => {
    this.setState({
      editNameOpen: false,
      fullnameRequired: "dispNone"
    });
  };

  /**
   * @memberof Profile
   * @description To open edit full name modal and set values
   */
  handleEditNameOpen = () => {
    this.setState({
      editFullName: this.state.full_name,
      editNameOpen: true
    });
  };

  /**
   * @memberof Profile
   * @description Update user full name state  value and required field validation
   */
  updateNameClickHandler = () => {
    this.state.editFullName === ""
      ? this.setState({ fullnameRequired: "dispBlock" })
      : this.setState({ fullnameRequired: "dispNone" });
    if (this.state.editFullName === "") {
      return;
    } else {
      this.setState({ full_name: this.state.editFullName });
    }
  };

  /**
   * @memberof Profile
   * @description Set state full name on every changes in values
   */
  inputFullNameChangeHandler = e => {
    this.setState({ editFullName: e.target.value });
  };

  /**
   * @memberof Profile
   * @description On click of each post image  open modal with details
   * @param _id - selected item id(key)
   * @param _index - selected item array index
   */
  handlePostClickHandler = (_id, _index) => {
    let _userPostItems = this.state.userPosts;
    this.setState({
      selectedPost: _userPostItems[_index],
      selectedIndex: _index,
      postItemOpen: true,
      addNewComment: ""
    });
  };

  /**
   * @memberof Profile
   * @description Handle post details modal close event
   */
  handlePostItemClose = () => {
    this.setState({
      selectedPost: null,
      postItemOpen: false,
      selectedIndex: -1
    });
  };

  /**
   * @memberof Profile
   * @description like and unlike functionality
   */
  likesClickHandler = () => {
    let _selectedPostItem = this.state.selectedPost;
    let _userPosts = this.state.userPosts;
    const _selectedIndex = this.state.selectedIndex;
    if (_selectedPostItem.user_has_liked) {
      _selectedPostItem.user_has_liked = false;
      _selectedPostItem.likes.count = _selectedPostItem.likes.count - 1;
    } else {
      _selectedPostItem.user_has_liked = true;
      _selectedPostItem.likes.count = _selectedPostItem.likes.count + 1;
    }

    _userPosts[_selectedIndex] = _selectedPostItem;

    this.setState({
      selectedPost: _selectedPostItem,
      userPosts: _userPosts
    });
  };

  /**
   * @memberof Profile
   * @description Set state addNewComment on value change
   */
  inputAddCommentChangeHandler = e => {
    this.setState({ addNewComment: e.target.value });
  };

  /**
   * @memberof Profile
   * @description Adding new comments to post
   */
  addCommentClickHandler = () => {
    if (this.state.addNewComment === "") {
      return;
    } else {
      let _selectedPostItem = this.state.selectedPost;
      _selectedPostItem.comments["data"] =
        _selectedPostItem.comments["data"] || [];
      _selectedPostItem.comments["data"].push({
        id: _selectedPostItem.comments["data"].length + 1,
        comment_by: this.state.username,
        comment_value: this.state.addNewComment
      });

      let _userPosts = this.state.userPosts;
      const _selectedIndex = this.state.selectedIndex;
      _userPosts[_selectedIndex] = _selectedPostItem;

      this.setState({
        selectedPost: _selectedPostItem,
        userPosts: _userPosts,
        addNewComment: ""
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
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
                  <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.editNameOpen}
                    onClose={this.handleEditNameClose}
                  >
                    <div className={classes.paper}>
                      <Typography
                        variant="h6"
                        id="modal-title"
                        className="edit-fullname-modal-title"
                      >
                        Edit
                      </Typography>
                      <FormControl required className="formControl">
                        <InputLabel htmlFor="username">Full Name </InputLabel>
                        <Input
                          id="userfullname"
                          type="text"
                          onChange={this.inputFullNameChangeHandler}
                          value={this.state.editFullName}
                        />
                        <FormHelperText className={this.state.fullnameRequired}>
                          <span className="red">Required</span>
                        </FormHelperText>
                      </FormControl>
                      <br />
                      <br />
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ width: 10 }}
                        onClick={this.updateNameClickHandler}
                      >
                        UPDATE
                      </Button>
                    </div>
                  </Modal>
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