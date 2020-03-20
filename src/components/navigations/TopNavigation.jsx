import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'


class TopNavigation extends Component {
  state = { activeItem:  this.props.isAuthenticated ? 'dashboard' : 'home' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state
    return (
      <div>
        <Menu  stackable  pointing secondary>
            {!this.props.isAuthenticated ? ( 
                <Menu.Item
                  name='home'
                  as={Link}
                  to="/"
                  active={activeItem === 'home'}
                  onClick={this.handleItemClick}
                />
              ) : (
                <Menu.Item
                name="dashboard"
                as={Link}
                to="/dashboard"
                active={activeItem === 'dashboard'}
                onClick={this.handleItemClick}
                />
              )
            }
            { this.props.isAuthenticated && 
              (
                <Menu.Item
                  name='upload'
                  as={Link}
                  to="/image-upload"
                  active={activeItem === 'upload'}
                  onClick={this.handleItemClick}
                />
              )
            }
            {this.props.isAuthenticated ? ( 
              <Menu.Menu position='right'>
                  <Menu.Item
                  name='logout'
                  to="/"
                  active={activeItem === 'logout'}
                  onClick={this.props.logout}
                />
              </Menu.Menu>

            ) :(

          <Menu.Menu position='right'>
            <Menu.Item
              name='login'
              as={Link}
              to="/login"
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
            /> 
            <Menu.Item
              name='register'
              as={Link}
              to="/register"
              active={activeItem === 'register'}
              onClick={this.handleItemClick}
            /> 
            </Menu.Menu>
            )
            }           
        </Menu>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps, { logout: logout })(TopNavigation);