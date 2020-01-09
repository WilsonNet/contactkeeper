import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import { 
  ADD_CONTACT, 
  DELETE_CONTACT, 
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER 
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jill Jahnson',
        email: 'jill@jill.jill',
        phone: '111-1111-111',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Jall Jahnson',
        email: 'jall@jall.jall',
        phone: '222-2222-222',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Jeuu Jahnson',
        email: 'jeuu@jeuu.jeuu',
        phone: '333-3333-333',
        type: 'personal'
      }
    ]
  }
  const [state, dispatch] = usReducer(contactReducer, initialState);

  // Add Contact
  // Delete Contact
  // Set Current Contact
  // Clear Current Contact
  // Update Contact
  // Filter Contacts
  // Clear Filter

  return (

    <ContactContext.Provider
      value={{
        contacts: state.contacts
      }}
    >
      { props.children }
    </ContactContext.Provider>
  )
}

export default ContactState;