// @flow

import React from 'react';

import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import { EventForm } from './MediaForms';
import { Title } from 'components/common';

import * as postData from 'data/post';
import * as eventData from 'data/event';

export default class ModifyPostModal extends React.Component {

  state = {
    post: null,
  }

  componentWillReceiveProps(props) {
    if (props.post) {
      this.setState({ post: props.post });
    }
  }

  requestSave = async () => {
    const { post } = this.state;
    if (post) {
      await postData.updatePost(post.id, {
        title: post.title,
        content: post.content,
      });

      if (post.media) {
        if (post.media.mediaType === 'event') {
          await eventData.updateEvent(post.media.id, post.media, post.author.id);
        }
      }
      this.props.refresh();
      this.props.requestClose();
    }
  };

  change = name => event => {
    const post = this.state.post;
    if (post) {
      post[name] = event.target.value;
      this.setState({ post });
    }
  };

  changeMedia = data => {
    const {
      title,
      location,
      date,
      description,
      image,
    } = data;
    this.setState((state) => ({
      post: {
        ...state.post,
        media: {
          ...state.post.media,
          title,
          location,
          date,
          description,
          image,
        },
      },
    }));
  };

  render() {
    const { post } = this.state;
    return (
      <Dialog fullWidth open={this.props.open} onClose={this.props.requestClose}>
        <DialogTitle>Modifier un post</DialogTitle>
        {
          post &&
          <DialogContent>
            {
              post.author.authorType === 'club' &&
              <TextField
                margin="dense"
                label="Titre"
                value={post.title}
                onChange={this.change('title')}
                fullWidth />
            }
            <TextField
              multiline
              fullWidth
              rows="6"
              margin="normal"
              label="Message"
              value={post.content}
              onChange={this.change('content')} />
            {
              post.media && post.media.mediaType === 'event' &&
              <div style={{ marginTop: 20 }}>
                <Title fontSize={1.4} invert>Evenement</Title>
                <EventForm fullw post={post} update={this.changeMedia} />
              </div>
            }
          </DialogContent>
        }
        <DialogActions>
          <Button onClick={this.props.requestClose} color="default" autoFocus >
            Annuler
          </Button>
          <Button onClick={this.requestSave} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
