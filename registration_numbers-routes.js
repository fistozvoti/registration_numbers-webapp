module.exports = function (registrationsFactory) {

    async function index(req, res) {
        let reg = req.params.reg;        
        let displayFilteredRegistrations = await registrationsFactory.filterRegsOnTown(reg);
        let displayRegistrations = await registrationsFactory.getRegistrationNumbers();
        let letsSeeTheTowns = await registrationsFactory.getTheTowns();

        if(reg){
            var itsAdded = await registrationsFactory.addNewRegistration(reg);
            
            if(itsAdded){
                req.flash('success', 'Registration Number has been successfully added!');
            }
            else if(reg === ''){
                req.flash('error', 'Please enter a Registration Number below!');
            }
            else{
                req.flash('error', registrationsFactory.returnErrors());
            }
            return res.redirect('/reg_numbers')
        
        }

        res.render('index', {
            display: displayRegistrations,
            displayFiltered: displayFilteredRegistrations,
            towns: letsSeeTheTowns
        });
        
    }

    async function addingRegistrations(req, res){
        let typedRegistration = req.body.number;  
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
        let letsSeeTheTowns = await registrationsFactory.getTheTowns();

       if(displayFilteredRegistrations.length == 0){
        req.flash('error2', 'There is nothing to filter for this town!')
        }

        res.render('index', {
            displayFiltered: displayFilteredRegistrations,
            towns: letsSeeTheTowns
        });
    }

    return {
        filter, 
        reset,  
        index,
        addingRegistrations

    }
}