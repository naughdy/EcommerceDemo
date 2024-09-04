export const reactotronRedux = () => (next) => (reducer, initialState) => {
    const store = next(reducer, initialState);
    return {
      ...store,
      dispatch: (action) => store.dispatch(action),
    };
  };
