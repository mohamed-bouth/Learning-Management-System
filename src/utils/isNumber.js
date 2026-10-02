function isNumbers(numbers) {
    let flag = true
    numbers.forEach(number => {
        if (typeof (number) !== "number") {
            flag = false
        }
    });
    if(flag === true){
        return true
    }
    return false

}

export default isNumbers