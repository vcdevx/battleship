let randomNumber = (num) => Math.floor(Math.random() * num);
let randomDirection = () => {
    if (randomNumber(2) == 0) {
        return 'horizontal'
    } else {
        return 'vertical'
    }
}

const refreshPage = () => {
    location.reload();
}

export { randomNumber, randomDirection, refreshPage }