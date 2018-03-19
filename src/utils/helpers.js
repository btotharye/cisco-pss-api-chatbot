
export default function dcEscalate(incident, esc_reason, prob_desc, cust_sent, priority, req_email, device_name){
  console.log(incident)
  const url = process.env.REACT_APP_XMATTERS_URL;


  let data = { 'properties': {'incident': incident,
                       'devicename': device_name,
                       'escreason': esc_reason,
                       'problemdesc': prob_desc,
                       'customersent': cust_sent,
                       'priority': priority,
                       'reqemail': req_email
                       },
        'recipients': [
            "brian.hopkins.dev|Work Email"
        ]
}
  let fetchData = {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(data),
    headers: new Headers()
  }
  fetch(url, fetchData)

  .then(function (response) {
    console.log(response)
    console.log(fetchData.body)
  })
  .catch(function (error) {
    console.log(error);
  });

}
