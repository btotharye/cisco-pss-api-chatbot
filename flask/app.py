from flask import Flask, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

import os
import requests


class CiscoSerial(object):
    def __init__(self):
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        client_id = os.getenv('client_id')
        client_secret = os.getenv('client_secret')
        data = [
            ('client_id', client_id),
            ('client_secret', client_secret),
            ('grant_type', 'client_credentials'),
        ]

        r = requests.post('https://cloudsso.cisco.com/as/token.oauth2', headers=headers, data=data, verify=False)
        json_data = r.json()
        print(json_data)
        self.bearer_token = json_data['access_token']

    def api_get_token(self):
        client_id = os.getenv('client_id')
        client_secret = os.getenv('client_secret')
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        data = [
            ('client_id', client_id),
            ('client_secret', client_secret),
            ('grant_type', 'client_credentials'),
        ]

        r = requests.post('https://cloudsso.cisco.com/as/token.oauth2', headers=headers, data=data, verify=False)
        return r.json()

    def get_bug_information(self, bug):
        get_headers = {
            'Accept': 'application/json',
            'Authorization': 'Bearer {}'.format(self.bearer_token)}
        output = requests.get('https://api.cisco.com/bug/v2.0/bugs/bug_ids/' + bug,
                              headers=get_headers, verify=True)
        return output

    def get_case_information(self, case):
        get_headers = {
            'Accept': 'application/json',
            'Authorization': 'Bearer {}'.format(self.bearer_token)}
        output = requests.get('https://api.cisco.com/case/v3/cases/details/case_id/' + case,
                              headers=get_headers, verify=True)
        return output

    def get_soft_suggest(self, pid):
        get_headers = {
            'Accept': 'application/json',
            'Authorization': 'Bearer {}'.format(self.bearer_token)}
        output = requests.get('https://api.cisco.com/software/suggestion/v1.0/suggestions/software/' + pid,
                              headers=get_headers, verify=True)
        return output

    def get_sr_contract(self, contract_id):
        get_headers = {
            'Accept': 'application/json',
            'Authorization': 'Bearer {}'.format(self.bearer_token)}
        output = requests.get('https://api.cisco.com/case/v3/cases/contracts/contract_ids/' + contract_id,
                              headers=get_headers, verify=True)
        return output

    def get_pid_info(self, pid):
        get_headers = {
            'Accept': 'application/json',
            'Authorization': 'Bearer {}'.format(self.bearer_token)}
        output = requests.get('https://api.cisco.com/product/v1/information/product_ids/' + pid,
                              headers=get_headers, verify=True)
        return output

    def get_sn_info(self, sn):
        get_headers = {
            'Accept': 'application/json',
            'Authorization': 'Bearer {}'.format(self.bearer_token)}
        output = requests.get('https://api.cisco.com/sn2info/v2/coverage/summary/serial_numbers/' + sn,
                              headers=get_headers, verify=True)
        return output

@app.route('/')
def hello_world():
    return 'Flask Dockerized'

@app.route('/cisco_sn_lookup')
def cisco_lookup():
    if 'sn' in request.args:
        sn = request.args['sn']
        lookup = CiscoSerial()
        sn_info = lookup.get_sn_info(sn)
        json_data = sn_info.json()
        pid = json_data['serial_numbers'][0]['base_pid_list'][0]['base_pid']
        software_lookup = CiscoSerial()
        software_info = software_lookup.get_soft_suggest(pid)
        json_data_soft = software_info.json()
        suggestion = json_data_soft['productList'][0]['suggestions']
        if suggestion[0]['errorDetailsResponse'] == None:
            print(suggestion)
            soft_suggest = {'suggested_version': suggestion[0]['relDispName']}
        else:
            print(suggestion)
            soft_suggest = {'suggested_version': suggestion[0]['errorDetailsResponse']['errorDescription']}
        print(json_data)
        return jsonify(json_data, soft_suggest)




if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=5000)
