import { createStore } from 'redux'; // Importer directement depuis 'redux'
import reducer from './reducer';

const store = createStore(reducer);

export default store;
