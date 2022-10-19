const generateRandomNumbers = (quantity) => {
    let nums = {};
    for (let i = 0; i < quantity; i++) {
        const num = Math.floor(Math.random() * 1000);
        if (nums[num])
            nums[num]++
        else
            nums[num] = 1
    }
    return nums
}

process.on('exit', () => {
    console.log(`worker #${process.pid} generador de numeros random cerrado`)
})

process.on('message', msg => {
    console.log(`worker #${process.pid} iniciando su tarea`)
    const nums = generateRandomNumbers(msg.quantity)
    process.send(nums)
    console.log(`worker #${process.pid} finalizó su trabajo`)
    process.exit()
})

export default generateRandomNumbers;