import { initState } from '../initState';

const homeReducer = (state = initState.home, action) => {
  switch (action.type) {
    case '':
      return state;

    default:
      return state;
  }
};

export default homeReducer;
