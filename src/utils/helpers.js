
export function warrantyChk(warranty_end_date){
    console.log("This is from the function: " + warranty_end_date)

    var warranty_exp_vars = warranty_end_date.split("-");
    var warranty_exp_year = warranty_exp_vars[0]
    var warranty_exp_month = parseInt(warranty_exp_vars[1], 10) - 1
    var warranty_exp_day = warranty_exp_vars[2]
    var warranty_today = new Date();
    var warranty_exp = new Date();
    warranty_exp.setFullYear(warranty_exp_year, warranty_exp_month, warranty_exp_day)

    if (warranty_exp < warranty_today || warranty_end_date === null || warranty_end_date === "") {
      console.log("This warranty should be expired and red from function.")
      console.log("Today's date is from function: " + warranty_today)
      return "red"
    } else {
      console.log("This warranty should still be active and green from function.")
      console.log("The warranty date is from function: " + warranty_exp)
      console.log("Today's date is from function: " + warranty_today)
      return "green"
    }
}

export function contractChk(contract_end_date){
  var contract_exp_vars = contract_end_date.split("-");
  var contract_exp_year = contract_exp_vars[0]
  var contract_exp_month = parseInt(contract_exp_vars[1], 10) -1
  var contract_exp_day = contract_exp_vars[2]
  var contract_today = new Date();
  var contract_exp = new Date();
  contract_exp.setFullYear(contract_exp_year, contract_exp_month, contract_exp_day)

  if (contract_exp < contract_today || contract_end_date === null || contract_end_date === "") {
    console.log("The contract should be red and expired.")
    console.log("The contract date is: " + contract_exp)
    return "red"
  } else {
    console.log("The contract should be green and active")
    console.log("The contract date is: " + contract_exp)
    return "green"
  }
}
