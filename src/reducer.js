import { ADD_SIMULATION } from './actions';

const initialState = {
  ListeSimulation: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SIMULATION:
      return {
        ...state,
        ListeSimulation: [...state.ListeSimulation, action.simulation]
      };
    default:
      return state;
  }
}

export default reducer;
