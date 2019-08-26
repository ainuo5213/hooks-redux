import React, { createContext, useReducer } from 'react';
export const hooksContext = createContext('context');
const Provider = hooksContext.Provider
function combineReducers(reducers) {
    return function (state = {}, action) {
        return Object.keys(reducers).reduce((newState, key) => {
            newState[key] = reducers[key](state[key], action);
            return newState;
        }, {});
    }
}
export const withContext = (reducer, initialState) => {
    let stateKeysLength = Object.keys(initialState).length;
    let reducerKeysLength = typeof reducer === 'function' ? 1 : Object.keys(reducer).length;
    if (stateKeysLength !== reducerKeysLength) {
        throw Error('The length of reducer is not equal the length of initialState')
    }
    let combinedReducer = combineReducers(reducer);
    return InnerComp => {
        return () => {
            const [state, dispatch] = useReducer(combinedReducer, initialState);
            return (
                <Provider value={{ state, dispatch }}>
                    <InnerComp />
                </Provider>
            )
        }
    }
} 