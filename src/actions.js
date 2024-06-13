export const ADD_SIMULATION = 'ADD_SIMULATION';

export function addSimulation(simulation) {
  return {
    type: ADD_SIMULATION,
    simulation
  };
}
