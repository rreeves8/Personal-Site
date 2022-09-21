export function debounce(run: (args: any) => void, wait = 5, immediate = false) {
    let timeout: NodeJS.Timeout | null;
    
    return function (...args: any) {
        const callNow = immediate && !timeout;
        
        if(timeout) clearTimeout(timeout);
        
        timeout = setTimeout(() => {
            timeout = null;
            if (!immediate) run(args)
        }, wait);

        if (callNow) run(args)
    };
}

let oldValue = 0
let newValue = 0

export function checkScrollDirectionIsUp(event: any) {
    newValue = window.pageYOffset;
    if (oldValue < newValue) {
        return true
    } else if (oldValue > newValue) {
        return false
    }
    oldValue = newValue;
}