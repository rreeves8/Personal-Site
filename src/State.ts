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
function letterOrNumber(value: string, r1: number, r2: number | undefined){
    if(value.match(/[a-z]/i)){
       return r1
   }
   if(isNumeric(value)) {
       return r2
   }
}
const states = [
    function(letter: any){
        return letterOrNumber(letter, 0, undefined)
    },
    function(letter: any){
        return letterOrNumber(letter, 2, 3)
    },
    function(letter: any){
        return letterOrNumber(letter, 1, 4) 
    },
    function(letter: any){
        return 4
    },
    function(letter: any){
        return 5  
    },
    function(letter: any){
        return 4  
    },
]