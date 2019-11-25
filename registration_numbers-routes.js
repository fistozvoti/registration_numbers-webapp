module.exports = function (registrationsFactory) {

    async function index(req, res) {
        let displayRegistrations = await registrationsFactory.getRegistrationNumbers();

        res.render('index', {
            display: displayRegistrations,
        });
        
    }

    async function addingRegistrations(req, res){
        let typedRegistration = req.params.reg;  
        var itsAdded = await registrationsFactory.addNewRegistration(typedRegistration);

        if(itsAdded){
            req.flash('success', 'Registration Number has been successfully added!');
        }
        else if(typedRegistration === ''){
            req.flash('error', 'Please enter a Registration Number below!');
        }
        else{
            req.flash('error', registrationsFactory.returnErrors());
        }

        res.redirect('/reg_numbers')
        
    }

    async function reset(req, res){
        await registrationsFactory.reset();
        res.redirect('/reg_numbers')
    }

    async function filter(req, res){
        let radioButtons = req.body.radioButton;
        let displayFilteredRegistrations = await registrationsFactory.filterRegsOnTown(radioButtons);

       if(displayFilteredRegistrations.length == 0){
        req.flash('error', 'There is nothing to filter for this town!')
        }

        res.render('index', {
            displayFiltered: displayFilteredRegistrations
        });
    }

    return {
        filter, 
        reset,  
        index,
        addingRegistrations

    }
}