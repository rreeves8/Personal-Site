import WalkThrough from "./WalkThrough";
import MergeSort from '../../stolen_code/MergeSort'
import { useState } from "react";

const getArray = () => {
    function hasDuplicates(array: any) {
        return (new Set(array)).size !== array.length;
    }

    let numArray = [[0, [2, 2]]]
    while (hasDuplicates(numArray[0][1])) {
        numArray = MergeSort(10, 20) as number[][][];
    }
    return numArray
}

export default function ArrayWalkThrough() {
    const [array, setArray] = useState<number[][][]>(getArray() as number[][][])

    return (
        <div>
            <WalkThrough
                numArray={array as number[][][]}
                changeLevel={() => {
                    setArray(getArray() as number[][][])
                }}
            />
        </div>

    )

}