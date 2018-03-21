import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { warrantyChk, contractChk } from '../utils/helpers';

class SerialLookup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      serial: '',
      data: '',
      trigger: false,
      result: false,
      product_description: '',
      product_id: '',
      software_suggest: '',
      warranty_color: '',
      contract_color: '',
      error: false,
      error_msg: '',
    };

    this.triggetNext = this.triggetNext.bind(this);
  }

  componentWillMount() {
    const self = this;
    const { steps } = this.props;
    const serial  = steps.serial.value;
    self.setState({ loading: true });
    self.setState({ serial });
    const hostname = process.env.REACT_APP_HOSTNAME;
    const url = `http://${hostname}:5000/cisco_sn_lookup?sn=${serial}`

    fetch(url)
    .then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      // Read the response as json.
      return response.json();
    })
    .then(function(responseAsJson) {
      // Do stuff with the JSON
      var output = responseAsJson[0]['serial_numbers'][0]
      var software_suggest = responseAsJson[1]['suggested_version']
      console.log("The software suggest is: " + software_suggest)
      self.setState({ software_suggest: software_suggest });
      self.setState({ loading: false });
      self.setState({ data: output})
      self.setState({ product_description: output['orderable_pid_list'][0]['item_description'] })
      self.setState({ product_id: output['orderable_pid_list'][0]['orderable_pid'] })
      self.triggetNext()

      // Setting up the warranty expired color coding for the output
      var warranty_str = output['warranty_end_date']
      var warranty_color = warrantyChk(warranty_str)
      if (warranty_color === "red") {
        self.setState({ warranty_color: 'red'})
      } else {
        self.setState({ warranty_color: 'green'})
      }

      // Setting up the contract coverage date color coding for output
      console.log(output['covered_product_line_end_date'])
      var contract_str = output['covered_product_line_end_date']
      var contract_color = contractChk(contract_str)
      if (contract_color === "red") {
        self.setState({ contract_color: 'red'})
      } else {
        self.setState({ contract_color: 'green'})
      }

    })
    .catch(function(error) {
      console.log('Looks like there was a problem: \n', error);
      self.setState({ error_msg: error.message})
      self.setState({ loading: false })
      self.setState({ error: true })
      self.props.triggerNextStep();

    });
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    const { loading, data, product_description, product_id, warranty_color, contract_color, serial, error, error_msg, software_suggest } = this.state;

    if (loading) {
      return <p>Just a minute looking that up...</p>;
    }

    if (error === true) {
      return <div>Sorry there was a issue with your request, please try again. Error Message: {error_msg}</div>
    } else {
      return (
        <div>
        <h3>Summary For Serial: {serial}</h3>
        <table>
          <tbody>
            <tr>
              <td>Product Descr:</td>
              <td>{product_description}</td>
            </tr>
            <tr>
              <td>Product ID:</td>
              <td>{product_id}</td>
            </tr>
            <tr>
              <td>Suggested Software Ver:</td>
              <td>{software_suggest}</td>
            </tr>
            <tr>
              <td>Customer Name:</td>
              <td>{data['contract_site_customer_name']}</td>
            </tr>
            <tr>
              <td>Contract Number:</td>
              <td>{data['service_contract_number']}</td>
            </tr>
            <tr>
              <td><font color={contract_color}>Contract Expires:</font></td>
              <td>{data['covered_product_line_end_date']}</td>
            </tr>
            <tr>
              <td>Warranty Type:</td>
              <td>{data['warranty_type']}</td>
            </tr>
            <tr>
              <td><font color={warranty_color}>Warranty Expires:</font></td>
              <td>{data['warranty_end_date']}</td>
            </tr>
            <tr>
              <td>Service Line Description:</td>
              <td>{data['service_line_descr']}</td>
            </tr>
          </tbody>
        </table>
      </div>
      );
    }
  }
}

SerialLookup.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func
};

SerialLookup.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

export default SerialLookup;
