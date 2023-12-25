export const localStorageMiddleware =
  (store: {getState: () => any}) =>
  (next: (arg0: any) => any) =>
  (action: any) => {
    const result = next(action);

    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
    return result;
  };
