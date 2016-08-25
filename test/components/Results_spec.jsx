import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import Results from '../../src/components/Results';
import {expect} from 'chai';

describe('Results', () => {

  it('renders entries with vote counts or zero', () => {
    const pair = List.of('Chinatown', 'Snatch');
    const tally = Map({'Chinatown': 5, 'Snatch': 1});
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [chinatown, snatch] = entries.map(entry => entry.textContent);

    expect(entries.length).to.equal(2);
    expect(chinatown).to.contain('Chinatown');
    expect(chinatown).to.contain('5');
    expect(snatch).to.contain('Snatch');
    expect(snatch).to.contain('1');
  });

  it('invokes the next callback when next button is clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;

    const pair = List.of('Chinatown', 'Snatch');
    const component = renderIntoDocument(
      <Results pair={pair}
        tally={Map()}
        next={next}/>
    );
    Simulate.click(ReactDOM.findDOMNode(component.refs.next));

    expect(nextInvoked).to.equal(true);
  });

  it('renders the winner when there is one', () => {
    const component = renderIntoDocument(
      <Results winner="Chinatown"
        pair={["Chinatown", "Snatch"]}
        tally={Map()} />
    );
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Chinatown');
  });

});
