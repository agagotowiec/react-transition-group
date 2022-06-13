import { css } from 'astroturf';
import React, { useRef } from 'react';
import CSSTransition from '../../src/CSSTransition';
export const FADE_TIMEOUT = 1000;
const styles = css`
  .enter,
  .appear {
    opacity: 0.01;
  }
  .enter.enter-active,
  .appear.appear-active {
    opacity: 1;
    transition: opacity ${FADE_TIMEOUT}ms ease-in;
  }
  .exit {
    opacity: 1;
  }
  .exit.exit-active {
    opacity: 0.01;
    transition: opacity ${0.8 * FADE_TIMEOUT}ms ease-in;
  }
   {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -o-box-sizing: border-box;
    box-sizing: border-box;
    /* adds animation for all transitions */
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
    -webkit-text-size-adjust: none;
  }
  .body {
    height: 100%;
    margin: 0px;
    padding: 0px;
    overflow: hidden;
  }
`;
class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDrawer: false,
    };
  }
  closeDrawer() {
    console.log('CloseDrawer');
    this.setState({
      showDrawer: false,
    });
  }
  openDrawer() {
    console.log('openDrawer');
    this.setState({
      showDrawer: !this.state.showDrawer,
    });
  }

  changeTheme() {
      console.log("WORKING")
      this.setState = {
          background: 'yellow'
      }
  }

  render() {
    return (
      <CSSTransition classNames={styles}>
        <div className="body">
          <div className="container"> Our Body </div>
          <span onClick={() => this.openDrawer()}>Open Drawer</span>
          <Drawer
            show={this.state.showDrawer}
            onClose={this.closeDrawer.bind(this)}
            changeColor={this.changeTheme.bind(this)}
          />
        </div>
      </CSSTransition>
    );
  }
}
class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.drawerStyle = {
      position: 'fixed',
      top: '0px',
      right: '-300px',
      height: '100%',
      width: '300px',
      background: 'pink',
      overflowX: 'hidden',
      overflowY: 'scroll',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.drawerStyle = Object.assign({}, this.drawerStyle, { right: '0px' , background: 'green' });
    }
    console.log(this.drawerStyle, nextProps);
    this.setState({
      nextProps,
    });
  }
  render() {
    // let show = false
    return (
      <div>
        {this.props.show && (
          <div id="drawer" style={this.drawerStyle}>
            <div className="container">
              Nice, Drawer
              <button onClick={this.props.onClose}>close</button>
              <button onClick={this.props.changeColor}>Change Color</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Body;