'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear': {
        const newState = { ...currentState };

        Object.keys(newState).forEach((key) => delete newState[key]);

        result.push(newState);
        currentState = newState;
        break;
      }

      case 'addProperties': {
        const newState = { ...currentState };

        for (const key in action.extraData) {
          newState[key] = action.extraData[key];
        }
        result.push(newState);
        currentState = newState;
        break;
      }

      case 'removeProperties': {
        const newState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        result.push(newState);
        currentState = newState;
        break;
      }
    }
  }

  return result;
}

module.exports = transformStateWithClones;
