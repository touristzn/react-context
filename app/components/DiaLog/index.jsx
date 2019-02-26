import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './style.less';

class DiaLog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.visible || false,
    }
  }

  onOpen() {
    this.setState({ visible: true });
  }

  onClose() {
    this.setState({ visible: false });
  }

  async btnOnClick(func) {
    await func();
    this.onClose();
  }

  render() {
    const { children, title, buttons } = this.props;
    const { visible } = this.state;
    return (
      <div className={ visible ? "popup-box" : "popup-box hide"}>
        <div className="dialog-win">
          <header>
            { title && (<h1>{ title }</h1>) }
            <button onClick={this.onClose.bind(this)}>Close</button>
          </header>

          <div className="dialog-win_content">
            { children }
          </div>

          {
            buttons && buttons.length > 0 && (
              <footer>
                {
                  buttons.map((item, index) => {
                    return (
                      <button
                        key={index}
                        onClick={this.btnOnClick.bind(this, item.func)}
                      >
                        {item.text}
                      </button>
                    )
                  })
                }
              </footer>
            )
          }
        </div>
      </div>
    )
  }
}

DiaLog.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  buttons: PropTypes.array,
}

export default DiaLog;