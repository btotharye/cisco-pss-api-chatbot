import SerialLookup from '../components/Serial';
import React from 'react';


const steps = [
  {
    id: '1',
    message: 'Hello how may I help you?',
    trigger: '2',
  },
  {
    id: '2',
    options: [
      { value: 'Lookup Cisco Serial', label: 'Lookup Cisco Serial', trigger: 'lookup_serial' }
    ],
  },
  {
    id: 'lookup_serial',
    message: 'Please enter your Cisco serial number',
    trigger: 'serial',
  },
  {
    id: 'serial',
    user: true,
    trigger: 'serial-response',
  },
  {
    id: 'serial-response',
    component: <SerialLookup />,
    waitAction: true,
    trigger: '1',
  }
];

export default steps;
