import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class Tabs extends Component {
  render() {
    const { children, activeIndex } = this.props;
    return (
      <ul className="nav-tabs">
        {React.Children.map(children, (child, index) => {
          const activeClassName = (activeIndex === index) ? 'tab-link active' : 'tab-link';
          return (
            <li className="tabs-item">
              <a href="#" className={activeClassName}>{child}</a>
            </li>
          )
        })}
      </ul>
    )
  }
}

Tabs.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired,
}

export const Tab = ({ children }) => 
<React.Fragment>{children}</React.Fragment>