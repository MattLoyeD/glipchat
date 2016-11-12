import AppBar from 'material-ui/AppBar';
import Browser from 'bowser';
import Colors from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Radium from 'radium';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TextField from 'material-ui/TextField';
import ContactListComponent from './contact-list.component';
import GlobalStyles from '../styles/global.styles';

const styles = {
  css: {

  },

  mobile: {
    css: {
      background: Colors.fullWhite,
      height: '100%',
      left: 0,
      overflow: 'scroll',
      position: 'fixed',
      width: '100%',
      zIndex: 5,
    },
  },

  content: {
    css: {
      minWidth: '360px',
    },

    inner: {
      css: {
        maxHeight: '360px',
        overflowX: 'hidden',
        overflowY: 'scroll',
      },
    },

    linkRow: {
      css: {
        margin: 0,
      },

      header: {
        css: {
          fontSize: '12px',
          fontWeight: 'bold',
          paddingBottom: '12px',
        },
      },

      url: {
        css: {
          overflow: 'hidden',
          padding: '10px',
          textOverflow: 'ellipsis',
        },
      },
    },

    inviteRow: {
      css: {
        margin: 0,
      },

      header: {
        css: {
          fontSize: '12px',
          fontWeight: 'bold',
          paddingTop: '20px',
        },

        label: {
          css: {
            paddingRight: '10px',
          },
        },

        inputName: {
          css: {
            display: 'inline-block',
            marginRight: '20px',
          },
        },

        button: {
          css: {
            bottom: '5px',
            margin: '10px 0 5px',
            position: 'relative',
          },
        },
      },

      textarea: {
        css: {
          'border': 'none',
          'marginBottom': '10px',
          'padding': '10px',
          'resize': 'none',
          'width': '100%',

          ':focus': {
            outline: 'none',
          },
        },
      },
    },
  },
};

export class InviteComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  invite() {
    // setTimeout(()=> {
    //   if (this.state.invitees && this.props.user.profile.name) {
    //     RoomActions.invite(this.state.invitees);
    //     RoomActions.hideInviteModal();
    //   } else if (!this.props.user || !this.props.user.profile.name) {
    //     this.setState({
    //       open: true
    //     });
    //   }
    // }, 0);
  }

  updateProfileName(e) {
    // UserActions.updateProfileName(e.target.value);
  }

  onTypeaheadChange(state) {
    this.setState({
      invitees: state.invitees,
    });
  }

  onContactListChange(invitees) {
    this.setState({invitees});
  }

  handleClose() {
    this.setState({
      ready: false,
    });
  }

  render() {
    const {user, dispatch} = this.props;

    // get the contacts
    const contacts = !!user.services && !!user.services.google && user.services.google.contacts || [];

    // Custom Actions
    const customActions = [
      <FlatButton
        key='cancel'
        label='Cancel'
        onTouchTap={this.props.hideInviteModal}
      />,
      <FlatButton
        key='invite'
        label='Invite'
        disabled={(!this.state.invitees || !this.state.invitees.length || !user.profile)}
        secondary={true}
        onTouchTap={this.invite.bind(this)}
      />,
    ];

    let mobile = Browser.mobile || Browser.tablet;

    if (mobile) {
      return (<ReactCSSTransitionGroup
        transitionName='invite-modal'
        transitionEnterTimeout={300} transitionLeaveTimeout={300}>
        {this.props.showInviteModal ?
        <div
          className='invite-modal'
          key='invite-modal'
          style={[styles.mobile.css]}>
          <Dialog
            title={'Please enter your name'}
            actions={customActions}
            modal={false}
            open={this.state.ready || false}
            onRequestClose={this.handleClose}
          >
            <TextField
              value={!!user.profile ? user.profile.name : ''}
              onChange={this.updateProfileName.bind(this)}
              errorText={user.profile.name ? ' ' : null}
              floatingLabelText='Your name'/>
          </Dialog>
          <AppBar
            showMenuIconButton={false}
            title={'Invite Contacts'}
            iconElementRight={<IconButton
              iconClassName='material-icons'
              onTouchTap={this.props.hideInviteModal}>
              clear
            </IconButton>}
          />
          <ContactListComponent
            contacts={contacts}
            dispatch={dispatch}
            onChange={this.onContactListChange.bind(this)}
          />
          {this.state.invitees ? (
            <div style={[GlobalStyles.table, {
              position: 'fixed',
              width: '100%',
              bottom: 0,
            }]}>
              <div style={[GlobalStyles.cell, {width: '50%'}]}>
                <FlatButton
                  backgroundColor={Colors.red500}
                  key='cancel'
                  label='Cancel'
                  onTouchTap={this.props.hideInviteModal}
                  style={{color: Colors.fullWhite, width: '100%'}}/>
              </div>
              <div style={[GlobalStyles.cell, {width: '50%'}]}>
                <FlatButton
                  backgroundColor={Colors.cyan500}
                  key='invite'
                  label='Invite'
                  onTouchTap={this.invite.bind(this)}
                  style={{color: Colors.fullWhite, width: '100%'}}/>
              </div>
            </div>
          ) : undefined}
        </div> : undefined}
      </ReactCSSTransitionGroup>);
    } else {
      return (<Dialog
        actions={customActions}
        contentStyle={styles.content.css}
        open={this.props.showInviteModal}
        onRequestClose={this.props.hideInviteModal}
        style={styles.css}>
        <div style={[styles.content.inner.css]}>
          <div className='row' style={[styles.content.linkRow.css]}>
            <div style={[styles.content.linkRow.header.css]}>
              Share the permanent link. Bookmark and come back anytime.
            </div>
            <div style={[GlobalStyles.inset, styles.content.linkRow.url.css]}>
              {this.props.linkUrl}
            </div>
          </div>
          <div className='row' style={[styles.content.inviteRow.css]}>
            <div style={[styles.content.inviteRow.header.css]}>
              <div style={[
                GlobalStyles.inline,
                styles.content.inviteRow.header.label.css,
              ]}>
                Send invite as
              </div>
              <TextField
                style={styles.content.inviteRow.header.inputName.css}
                value={!!user.profile ? user.profile.name : ''}
                onChange={this.updateProfileName.bind(this)}
                errorText={!user.profile ? ' ' : null}
                floatingLabelText='Your name'/>
            </div>
            <ContactListComponent
              contacts={contacts}
              dispatch={dispatch}
              onChange={this.onContactListChange.bind(this)}
            />
          </div>
        </div>
      </Dialog>);
    }
  }
};
InviteComponent.propTypes = {
  invitees: React.PropTypes.array,
  showInviteModal: React.PropTypes.bool,
  linkUrl: React.PropTypes.string,
  user: React.PropTypes.object,
};

export default Radium(InviteComponent);