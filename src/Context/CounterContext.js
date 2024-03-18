import { createContext, useState } from "react";

export const CounterContext = createContext();
export default function CounterContextProvider(props) {
    const [counter, setCounter] = useState(0);
    function increaseCounter() {
        setCounter(counter + 1);
    }
    function decreaseCounter() {
        setCounter(counter - 1);
    }
    return (<CounterContext.Provider value={{counter, increaseCounter,decreaseCounter}}>
        {props.children}
    </CounterContext.Provider>)
}