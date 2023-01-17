class Tester {
    constructor(){
        this.x = 1;
        this.y = 2
    }

    updateX(x){
        this.x = x
    }
}

function clone(obj) {
    const clone = Object.assign({}, obj);
    Object.setPrototypeOf(clone, obj.prototype );
    return clone
}



let test = new Tester()
let test2 = clone(test)

test.updateX()
test2.updateX()