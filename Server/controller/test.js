const bcrypt = require("bcryptjs");

    const password='aman1234'
    // Hash the password

    async function hashPassword()
    {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
    }

    hashPassword();
