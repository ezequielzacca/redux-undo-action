type Action = { type: string }
const UNDO_ACTION_TYPE = 'UNDO'

export const undoable = (rootReducer: any, bufferSize: number = 100) => {
    let initialState: any;
    let executedActions: Action[] = [];
    return (state: any, action: any) => {
        if (action.type === UNDO_ACTION_TYPE) {
            let newState: any = initialState;
            executedActions = executedActions.filter(eAct => eAct !== action.payload);
            executedActions.forEach(executedAction =>
                newState = rootReducer(newState, executedAction));
            return newState;
        }
        executedActions.push(action);
        const updatedState = rootReducer(state, action);
        //Handle buffer overflow
        if (executedActions.length === bufferSize + 1) {
            const firstAction = executedActions[0];
            initialState = rootReducer(initialState, firstAction);
            executedActions = executedActions.slice(1, bufferSize + 1);
        }
        return updatedState;
    }
}

export const undo = (action: Action) => ({ type: UNDO_ACTION_TYPE, payload: action })
