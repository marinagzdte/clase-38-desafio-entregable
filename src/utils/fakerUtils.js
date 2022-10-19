import faker from "faker";

faker.setLocale('es_MX');

export const getFiveRandomProducts = () => {
    let randomProducts = [];
    for (let i = 0; i < 5; i++) {
        randomProducts[i] = {
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            thumbnail: faker.image.fashion(70, 70, true)
        }
    }
    return randomProducts;
}