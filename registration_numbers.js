module.exports = function registrationNumbers(pool) {
    var giveErrorMessage = '';

   async function addNewRegistration(reg){
    let regularPattern1 = /^([A-Za-z]){2}\s([0-9]){3}\s([0-9]){3}/;
    let regularPattern2 = /^([A-Za-z]){2}\s([0-9]){3}-([0-9]){3}/;
    let regEx1 = regularPattern1.test(reg);
    let regEx2 = regularPattern2.test(reg);

    if(!regEx1 && !regEx2){
        giveErrorMessage = 'This format is not supported!';
        return false;
    }

    if (reg) {
        let regNum = reg.toUpperCase();

    if(reg){
        let subStr = regNum.substring(0, 2);

        var results = await pool.query('SELECT id FROM towns WHERE location_key = $1', [subStr]);
        if(results.rowCount ===0){
            giveErrorMessage = 'Enter a  Registration Number for the supported Towns!';
            return false;
        }else{
        let thisQuery = await pool.query('SELECT registration FROM registration_numbers WHERE registration = $1', [regNum]);

        if(thisQuery.rowCount === 1){
            giveErrorMessage = 'Sorry but this Registration Number already exists!';            
            return false;
        }
        let checkResults = results.rows;
        let getTownID = checkResults[0].id;
        await pool.query('INSERT INTO registration_numbers (registration, town_id) VALUES ($1, $2)', [regNum, getTownID]);
        return true;
        }
    }
        
      }

       }
   async function getTheTowns(){
        let returnTown = await pool.query('SELECT * FROM towns');
        return returnTown.rows;
   }    

   async function getRegistrationNumbers(){
    let thisEmptyList = []
    let results = await pool.query('SELECT registration FROM registration_numbers');
    
    for (let i = 0; i < results.rows.length; i++) {
        let element = results.rows[i];
        thisEmptyList.push(element.registration);
    }
    return thisEmptyList;
  }

  async function reset() {
    await pool.query('DELETE FROM registration_numbers');
    }

  async function filterRegsOnTown(filterByTown) {
        var listOfFiltered = [];

        if(filterByTown === 'All'){
            return getRegistrationNumbers();
        }
           
        if(filterByTown !== undefined || filterByTown !== ''){

        let filter = getRegistrationNumbers();
         filter = await pool.query('SELECT registration_numbers.registration,towns.location_key FROM registration_numbers INNER JOIN towns ON registration_numbers.town_id = towns.id');
         filter = filter.rows;
        

        for (var i = 0; i < filter.length; i++) {
            var filteredRegistrations = filter[i];

            if (filteredRegistrations.location_key === filterByTown) {
                listOfFiltered.push(filteredRegistrations.registration);
            }
        }
        return listOfFiltered;
        }else{
        return getRegistrationNumbers();;
        }
    }


    function returnErrors() {
        return giveErrorMessage;
    }

    return {
        reset,
        getTheTowns,
        returnErrors,
        filterRegsOnTown,
        addNewRegistration,
        getRegistrationNumbers
    }
}
