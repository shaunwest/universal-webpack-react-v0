import React from 'react';

export default class Foo extends React.Component {
  render() {
    console.log(__SERVER__);
    return(
      <ul>
      <li>FOOO!!!</li>
      </ul>
    );
  }
}
