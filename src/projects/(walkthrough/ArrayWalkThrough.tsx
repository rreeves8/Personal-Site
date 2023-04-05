import WalkThrough from "./WalkThrough";
import MergeSort from "./MergeSort";
import { useState } from "react";

const getArray = () => {
    function hasDuplicates(array: any) {
        return new Set(array).size !== array.length;
    }

    let numArray = [[0, [2, 2]]];
    while (hasDuplicates(numArray[0][1])) {
        numArray = MergeSort(10, 20) as number[][][];
    }
    return numArray;
};

export default function ArrayWalkThrough({ style }: { style?: any }) {
    const [array, setArray] = useState<number[][][]>(getArray() as number[][][]);

    return (
        <div style={style ? style : {}}>
            <WalkThrough
                numArray={array as number[][][]}
                changeLevel={() => {
                    console.log("resetting array");
                    setArray(() => [...(getArray() as number[][][])]);
                }}
            />
        </div>
    );
}
