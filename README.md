# Redux Undo Action

This is a reducer enhancer that will allow you to undo any action dispatched to the store.

## Installation

`npm i redux-undo-action`

## Configuration

You just need to wrap your top level reducer with the `undoable` function provided by `redux-undo-action`

```typescript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { undoable } from 'redux-undo-action';

export const store = configureStore({
  reducer: {
    counter: undoable(counterReducer),
  }
});

```

## How to use

To undo an action, just dispatch the `undo` action with the action that you want to undo as payload.

### Thunk example

```typescript
export const incrementOptimistic = (): AppThunk => async dispatch => {
  const optimisticAction = increment();
  dispatch(optimisticAction);
  try {
    await simulateCallServer();
  } catch (error) {
    console.log("There was an error... undoing")
    dispatch(undo(optimisticAction));
  }
};

```

### Saga example

```typescript
function* incrementCounterAsync() {
    const action = increment();
    try {
        yield put(action);
        yield simulateCallServer();
    } catch (e) {
        console.log("Error... undoing");
        yield put(undo(action));
    }
}

```

