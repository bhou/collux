import React from 'react';
import page from 'page';

class Link extends React.Component {

  handleClick(event) {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (event.button !== 0 /* left click */) {
      return;
    }

    if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();

    if (this.props.to) {
      page.redirect(this.props.to);
      this.props.sensor.send({
        actionType: 'RENDER',
        url: this.props.to
      })
    } else {
      console.log(event.currentTarget.pathname, event.currentTarget.search)
    }
  };

  render() {
    const { props } = this.props; 
    return (
      <a href={this.props.to} {...props} onClick={this.handleClick.bind(this)}>
        {this.props.children}
      </a>
    );
  }

}

export default Link;
