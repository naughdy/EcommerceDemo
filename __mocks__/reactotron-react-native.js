const Reactotron = {
    configure: () => Reactotron,
    useReactNative: () => Reactotron,
    connect: () => Reactotron,
    createEnhancer: () => (next) => (reducer, initialState) => {
      const store = next(reducer, initialState);
      return {
        ...store,
        dispatch: (action) => store.dispatch(action),
      };
    },
    log: () => {},
    logImportant: () => {},
    warn: () => {},
    error: () => {},
    clear: () => {},
  };

  export default Reactotron;
