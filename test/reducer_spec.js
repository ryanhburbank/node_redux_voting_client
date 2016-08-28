import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Chinatown', 'Snatch'),
          tally: Map({Chinatown: 1})
        })
      })
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Chinatown', 'Snatch'],
        tally: {Chinatown: 1}
      }
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: List.of('Chinatown', 'Snatch'),
          tally: Map({Chinatown: 1})
        }
      }
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Chinatown', 'Snatch'],
        tally: {Chinatown: 1}
      }
    }));
  });

  it('handles SET_STATE without initial state', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: List.of('Chinatown', 'Snatch'),
          tally: Map({Chinatown: 1})
        }
      }
    };

    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Chinatown', 'Snatch'],
        tally: {Chinatown: 1}
      }
    }));
  });

  it('removes hasVoted on SET_STATE if pair changes', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Chinatown', 'Snatch'],
        tally: {Chinatown: 1}
      },
      hasVoted: 'Chinatown'
    });

    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Memento', 'Inception']
        }
      }
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Memento', 'Inception']
      }
    }));
  });

  it('handles VOTE by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['Chinatown', 'Snatch'],
        tally: {Chinatown: 1}
      }
    });

    const action = {type: 'VOTE', entry: 'Chinatown'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Chinatown', 'Snatch'],
        tally: {Chinatown: 1}
      },
      hasVoted: 'Chinatown'
    }));
  });

  it('does not set hasVoted for VOTE on invalid entry', () => {
    const state = fromJS({
      vote : {
        pair: ['Chinatown', 'Snatch'],
        tally: {Chinatown: 1}
      }
    });

    const action = {type: 'VOTE', entry: 'Goodfellas'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Chinatown', 'Snatch'],
        tally: {Chinatown: 1}
      }
    }));
  });

});
