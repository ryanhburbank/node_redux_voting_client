import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import {List} from 'immutable';
import {Voting} from '../../src/components/Voting';
import {expect} from 'chai';

describe('Voting', () => {

  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <Voting pair={["Chinatown", "Children of Men"]} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Chinatown');
    expect(buttons[1].textContent).to.equal('Children of Men');
  });

  it('invokes a callback when a button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;

    const component = renderIntoDocument(
      <Voting pair={["Chinatown", "Children of Men"]}
        vote={vote}/>
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(votedWith).to.equal('Chinatown');
  });

  it('disables buttons when user has voted', () => {
    const component = renderIntoDocument(
      <Voting pair={["Chinatown", "Children of Men"]} hasVoted="Chinatown" />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);

    it('adds label to the voted entry', () => {
      const component = renderIntoDocument(
        <Voting pair={["Chinatown", "Children of Men"]}hasVoted="Chinatown" />
      );

      const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
      expect(buttons[0].textContent).to.contain('Voted');

    });
  });

  it('renders just the winner when there is one', () =>{
    const component = renderIntoDocument(
      <Voting winner="Chinatown" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(0);

    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Chinatown');
  });

  it('renders as a pure component', () => {
    const pair = ['Chinatown', 'Nightcrawler'];
    const container = document.createElement('div');
    let component = ReactDOM.render(
        <Voting pair={pair} />,
        container
          );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Chinatown');

    pair[0] = 'Inception';
    component = ReactDOM.render(
        <Voting pair={pair} />,
        container
          );
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Chinatown');
  });

  it('does update DOM when prop changes', () => {
    const pair = List.of('Chinatown', 'Zoolander');
    const container = document.createElement('div');
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Chinatown');

    const newPair = pair.set(0, 'Nightcrawler');
    component = ReactDOM.render(
      <Voting pair={newPair} />,
      container
    );
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Nightcrawler');
  });
});
