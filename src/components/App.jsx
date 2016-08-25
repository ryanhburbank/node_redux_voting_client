import React from 'react';
import {List, Map} from 'immutable';

const pair = List.of('Chinatown', 'Snatch');
const tally = Map({'Chinatown': 3, 'Snatch': 1});

export default React.createClass({
  render: function() {
    return React.cloneElement(this.props.children, {
      pair: pair,
      tally: tally
    });
  }
});
