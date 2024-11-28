import bcrypt from 'bcryptjs'

const users = [
    {
        firstname: 'Admin',
        lastname: 'User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
    {
        firstname: 'Jane',
        lastname: 'Doe',
        email: 'jane@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false
    },
]


export default users;