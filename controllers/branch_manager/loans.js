
const _ = require('lodash');
const BranchManager = require('../../models/BranchManager');
const Lookup = require('../../models/Lookup');

const getPendingLoans = async(request,response)=>{

    try {
        let loans;
        if(request.user.branch_id ==1 ){
             loans = await  BranchManager.getAllPendingLoans();

        }
        else{
            loans = await  BranchManager.getPendingLoans(request.user.branch_id);
        }
        response.render('branch_manager/loan_approval',{loans:loans, branch:request.user.branch_id});

    } catch (error) {
        console.log(error);
    }

}

const proceedLoan = async(request,response)=>{
    try {
        if(request.body.type == "Approve"){
            await BranchManager.approveLoan(request.body.loan_id);
        }
        else if (request.body.type == "Reject") {
            await BranchManager.declineLoan(request.body.loan_id);
            
        } 
        response.redirect('back');
    } catch (error) {
        return response.status(500).render("500", {err_msg:error});
    }

}


exports.getPendingLoans = getPendingLoans;
exports.proceedLoan = proceedLoan;
