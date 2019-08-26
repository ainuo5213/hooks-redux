'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.withContext = exports.hooksContext = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hooksContext = exports.hooksContext = (0, _react.createContext)('context');
var Provider = hooksContext.Provider;
function combineReducers(reducers) {
    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var action = arguments[1];

        return Object.keys(reducers).reduce(function (newState, key) {
            newState[key] = reducers[key](state[key], action);
            return newState;
        }, {});
    };
}
var withContext = exports.withContext = function withContext(reducer, initialState) {
    var stateKeysLength = Object.keys(initialState).length;
    var reducerKeysLength = typeof reducer === 'function' ? 1 : Object.keys(reducer).length;
    if (stateKeysLength !== reducerKeysLength) {
        throw Error('The length of reducer is not equal the length of initialState');
    }
    var combinedReducer = combineReducers(reducer);
    return function (InnerComp) {
        return function () {
            var _useReducer = (0, _react.useReducer)(combinedReducer, initialState),
                _useReducer2 = _slicedToArray(_useReducer, 2),
                state = _useReducer2[0],
                dispatch = _useReducer2[1];

            return _react2.default.createElement(
                Provider,
                { value: { state: state, dispatch: dispatch } },
                _react2.default.createElement(InnerComp, null)
            );
        };
    };
};