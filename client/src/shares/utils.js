import faker from 'faker';

export const generateData = (numResults = 0) => {
    let total = numResults || 0
    if (typeof numResults === 'string') {
        total = parseInt(numResults, 10)
    }
    const data = []
    for (let i = 0; i < total; i += 1) {
        data.push({
            _id: i,
            avatar: faker.image.avatar(),
            fullName: faker.name.findName(),
            _username: faker.internet.userName(),
            password_: faker.internet.password(),
            'email.address': faker.internet.email(),
            phone_number: faker.phone.phoneNumber(),
            address: {
                city: faker.address.city(),
                state: faker.address.state(),
                country: faker.address.country(),
            },
            url: faker.internet.url(),
            isMarried: faker.random.boolean(),
            actions: null,
        })
    }
    return data
}