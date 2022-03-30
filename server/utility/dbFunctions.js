export const randomMin = (limit) => {
    let count = limit - 5
    console.log(count)
    
    return Math.floor(Math.random() * count)
}