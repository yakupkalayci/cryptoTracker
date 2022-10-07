export const findDigit = (number) => {

    number = number.toString().split("");
    let copiedNumber = number.slice();

    const index = number.indexOf(".");
    number = number.slice(0,index);
    let length = number.length;
    

    let division = Math.floor((length / 3));

    if(length > 3) {
        if(length > 5) {
            let x = -2;
            for(let i = 0; i < division; i++) {
                number.splice(x, 0, ",");
                x += (-4);
            }
        } else {
            let x = -3;
            for(let i = 0; i < division; i++) {
                number.splice(x, 0, ",");
                x += (-3);
            }
        }
    }

    number = number.concat(copiedNumber.slice(index));

    return number;
}