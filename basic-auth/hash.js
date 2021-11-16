const bcrypt = require('bcrypt')

const password = '12345'
const salt = '$2b$10$FEqKdfTK9AZPzbqeAnH/Lu'
console.log(salt)
const hash = bcrypt.hashSync(password, salt)
console.log(hash)



/*
'123456' -> '839021jfkdlsjdskla389201'
'passwort' -> '43902jdflsjfkdsl89e20'
*/