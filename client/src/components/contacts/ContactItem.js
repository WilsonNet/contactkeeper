import React from 'react';
import PropTypes from 'prop-types';

const ContactItem = ({ contacts }) => {
  const { id, name, email, phone, type } = contact;

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{' '}
        <span
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type}
        </span>
      </h3>
    </div>
  );
};

ContactItem.propTypes = {
  contacts: PropTypes.object.isRequired,
};

export default ContactItem;
