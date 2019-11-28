const assert = require('assert');
const testRegistrationFunction = require('../registration_numbers');
const pg = require("pg");
const Pool = pg.Pool;


const connectionString = process.env.DATABASE_URL || "postgresql://codex:codex123@localhost/registrations_and_towns";


const pool = new Pool({
    connectionString
});

describe("The Registration Numbers Webapp", function () {
    beforeEach(async () => {
        await pool.query('DELETE FROM registration_numbers;');
    })

    describe("Testing the addNewRegistration Function",async function () {
        it ("Should be able to take in Registration Numbers and print them in a valid required form", async function () {
            var createRegistration1 = testRegistrationFunction(pool);

            await createRegistration1.addNewRegistration("CA 123 744");
            await createRegistration1.addNewRegistration("CK 458 965");
            await createRegistration1.addNewRegistration("CY 456-878");

            let result = await createRegistration1.getRegistrationNumbers();
            assert.deepEqual(result, [ 'CA 123 744', 'CK 458 965', 'CY 456-878' ])

        });

        it("Should be able to give an error message if the entered Registration Number is not for the suported towns", async function () {

            var createRegistration2 = testRegistrationFunction(pool);
            
            await createRegistration2.addNewRegistration("VK 885 888");
            let result = createRegistration2.returnErrors()
                        
            assert.equal(result,'This Registration Number is not for the supported Towns!');
        });

        it ("Should be able to take in Registration Numbers and print them in a valid required form", async function () {
            var createRegistration3 = testRegistrationFunction(pool);

            await createRegistration3.addNewRegistration("CA 123 744");
            await createRegistration3.addNewRegistration("CA 123 744");

            let result = createRegistration3.returnErrors();
            assert.equal(result, 'Sorry but this Registration Number already exists!');
        });
})
    
describe("Testing the filterRegsOnTown Function", function () {
 
    beforeEach(async () => {
        await pool.query('DELETE FROM registration_numbers;');
    })

    it("Should be able to filter Registration Numbers from Bellville", async function () {

        var createRegistration4 = testRegistrationFunction(pool);

        await createRegistration4.addNewRegistration("CA 896-759");
        await createRegistration4.addNewRegistration("CY 324-567");
        await createRegistration4.addNewRegistration("CY 123 243");
        await createRegistration4.addNewRegistration("CA 123 456");

        let filterThisReg1 = 'CY';

        let filtered1 = await createRegistration4.filterRegsOnTown(filterThisReg1)
        assert.deepEqual(filtered1, [ 'CY 123 243', 'CY 324-567' ])

    });
    it("Should be able to filter Registration Numbers from Malmesbury", async function () {

        var createRegistration5 = testRegistrationFunction(pool);

        await createRegistration5.addNewRegistration("CA 896-697");
        await createRegistration5.addNewRegistration("CY 324-567");
        await createRegistration5.addNewRegistration("CY 123 243");
        await createRegistration5.addNewRegistration("CK 123 456");

        let filterThisReg2 = 'CK';

        let filtered2 = await createRegistration5.filterRegsOnTown(filterThisReg2)
        assert.deepEqual(filtered2, ["CK 123 456"])

    });
    it("Should be able to filter Registration Numbers from Cape Town", async function () {

        var createRegistration6 = testRegistrationFunction(pool);

        await createRegistration6.addNewRegistration("CA 324-567");
        await createRegistration6.addNewRegistration("CA 123 456");
        await createRegistration6.addNewRegistration("CY 896-699");
        await createRegistration6.addNewRegistration("CY 123 243");

        let filterThisReg3 = 'CA';

        let filtered3 = await createRegistration6.filterRegsOnTown(filterThisReg3)
        assert.deepEqual(filtered3, [ 'CA 123 456', 'CA 324-567' ]);

    });
})
})