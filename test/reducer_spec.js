import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_CLIENT_ID', () => {
    const initialState = Map();
    const action = {
      type: 'SET_CLIENT_ID',
      clientId: '1234'
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      clientId: '1234'
    }));
  });

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

  it('removes myVote on SET_STATE if round has changed', () => {
    const initialState = fromJS({
      vote: {
        round: 101,
        pair: ['Chinatown', 'Snatch'],
        tally: {Chinatown: 1}
      },
      myVote: {
        round: 101,
        entry: 'Chinatown'
      }
    });

    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          round: 102,
          pair: ['Memento', 'Inception']
        }
      }
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        round: 102,
        pair: ['Memento', 'Inception']
      }
    }));
  });

  it('handles VOTE by setting myVote', () => {
    const state = fromJS({
      vote: {
        round: 101,
        pair: ['Chinatown', 'Snatch'],
        tally: {Chinatown: 1}
      }
    });

    const action = {type: 'VOTE', entry: 'Chinatown'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        round: 101,
        pair: ['Chinatown', 'Snatch'],
        tally: {Chinatown: 1}
      },
      myVote: {
        round: 101,
        entry: 'Chinatown'
      }
    }));
  });

  it('does not set myVote for VOTE on invalid entry', () => {
    const state = fromJS({
      vote : {
        round: 101,
        pair: ['Chinatown', 'Snatch'],
        tally: {Chinatown: 1}
      }
    });

    const action = {type: 'VOTE', entry: 'Goodfellas'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        round: 101,
        pair: ['Chinatown', 'Snatch'],
        tally: {Chinatown: 1}
      }
    }));
  });

});
