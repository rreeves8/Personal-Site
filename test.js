const { Observable } = require('object-observer');

class Item {
    constructor(item, coords){
        this.item = item
        this.coords = coords
    }
}


let a = Observable.from([[1, 2], [3, 4]].map((row, i) => row.map((number, j) => new Item(number, [i, j]))))


Observable.observe(a, changes => {

    
    console.log(JSON.stringify(changes))
});

let oldSlot = a[1][0]

a[1][0] = a[0][0]
a[0][0] = oldSlot