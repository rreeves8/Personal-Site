import { StateManager } from "./utilites";

type State = {
    theme: {
        title: {
            titleText: {};
            titleContainer: {};
        };
    };
};

const createState = (isMobile: boolean) => {
    let initialState: State = {
        theme: {
            title: {
                titleText: {},
                titleContainer: {},
            },
        },
    };

    return new StateManager<State>(initialState);
};

//export const state: StateManager<State> = createState(isMobile);
