export function calcTotalPrice (items :any) {
    let sum = 0
    items.forEach((item :any) => {
        sum += item.price * item.quantity
    });
    return sum
}