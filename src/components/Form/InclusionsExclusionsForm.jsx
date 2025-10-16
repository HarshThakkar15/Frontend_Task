import React from 'react';

const InclusionsExclusionsForm = ({ data, updateData }) => {
  const handleChange = (e) => {
    updateData(e.target.name, e.target.value);
  };

  return (
    <div className="form-section">
      <div className="form-group">
        <label htmlFor="termsAndConditions"><a href=''>Terms and Conditions</a></label>
      </div>
    </div>
  );
};

export default InclusionsExclusionsForm;