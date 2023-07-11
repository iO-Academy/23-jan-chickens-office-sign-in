const readline = require('readline')
const crypto = require('crypto')
const { getCollection } = require('./service/DatabaseService')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Enter new passcode: ", async function (newPasscode) {
    try {
        if (newPasscode.length != 4 || isNaN(parseFloat(newPasscode))) {
            console.log("Passcode must be 4 digits")
            rl.close()
        }
        const collection = await getCollection("Admin")
        const salt = crypto.randomBytes(16).toString('hex');
        const newPasscodeHash = crypto.pbkdf2Sync(newPasscode, salt,
            1000, 64, `sha512`).toString(`hex`)
        const data = await collection.findOne({ hash: { $exists: true } })
        if (data) {
            rl.question("Enter existing passcode: ", async function (oldPasscodeEntry) {
                const oldPasscodeEntryHash = crypto.pbkdf2Sync(oldPasscodeEntry, data.salt,
                    1000, 64, `sha512`).toString(`hex`);
                const passcodesMatch = oldPasscodeEntryHash == data.hash
                if (passcodesMatch) {
                    await collection.updateOne({ hash: { $exists: true } }, { $set: { hash: newPasscodeHash, salt: salt } })
                    console.log("Passcode replaced")
                    rl.close()
                } else {
                    console.log("Incorrect passcode")
                    rl.close()
                }
            })
        } else {
            await collection.insertOne({ hash: newPasscodeHash, salt: salt })
            console.log("Passcode stored")
            rl.close()
        }
    } catch (e) {
        console.log(e)
        rl.close()
    }
})

rl.on("close", function () {
    console.log("EXIT");
    process.exit(0);
});