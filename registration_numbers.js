module.exports = function registrationNumbers(storage) {
    var regList = storage || [];
    var valid = ['CA', 'CY', 'CK'];
    const regularPattern = /^([A-Z]){2}\s([0-9]){3}\s([0-9]){3}/;
    const regularPattern2 = /^^([A-Z]){2}\s([0-9]){3}-([0-9]){3}/;

    let errorMessage = {
        'isError': false,
         'msg': ''

    }
    function handleError(isError, message){
        errorMessage.isError = isError;
        errorMessage.msg = message;
         return errorMessage
    }

   function addnew(reg){
    if(reg === undefined || reg === ""){
        return handleError(true, 'Please insert Registration number!')
    }
      if(!regularPattern.test(reg) && !regularPattern2.test(reg)){
     return handleError(true,'Invalid Format!');
      }
    if(!valid.includes(reg.split(' ')[0])){
       return handleError(true,'Invalid Registration!');
    }
    if(regList.includes(reg)){
      return handleError(true, 'Already exists!');
      
    }
    regList.push(reg)
     return handleError(false, 'Registration number added!');
   }

    function filterRegsOnTown(town) {
        var filterdList = [];
           
        if(town === undefined || town === ""){
            return regList;
        }

        for (var i = 0; i < regList.length; i++) {
            var reg = regList[i];

            if (reg.startsWith(town)) {
                filterdList.push(reg);
            }
        }
        return filterdList;
    }


    function getList() {
        return regList;
    }

    return {
        filterRegsOnTown,
        getList,
        addnew
    }
}
