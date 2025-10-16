import React from 'react';

const GeneralInfoForm = ({ data, updateData }) => {
  const handleChange = (e) => {
    updateData(e.target.name, e.target.value);
  };

  return (
    <div className="form-section">
      <h2>Trip Overview</h2>
      <div className="grid-2">
        <div className="form-group">
          <label htmlFor="userName">User Name</label>
          <input type="text" id="userName" name="userName" value={data.userName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="tripTitle">Trip Title</label>
          <input type="text" id="tripTitle" name="tripTitle" value={data.tripTitle} onChange={handleChange} required />
        </div>
      </div>
      <div className="grid-3">
        <div className="form-group">
          <label htmlFor="duration">Total Days</label>
          <input type="number" id="duration" name="duration" min="1" value={data.duration} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="nights">Total Nights</label>
          <input type="number" id="nights" name="nights" min="1" value={data.nights} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="travelers">No. of Travelers</label>
          <input type="number" id="travelers" name="travelers" min="1" value={data.travelers} onChange={handleChange} required />
        </div>
      </div>
      <div className="grid-3">
        <div className="form-group">
          <label htmlFor="departureCity">Departure City</label>
          <input type="text" id="departureCity" name="departureCity" value={data.departureCity} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="departureDate">Departure Date</label>
          <input type="text" id="departureDate" name="departureDate" value={data.departureDate} onChange={handleChange} placeholder="e.g., 31/10/2025" />
        </div>
        <div className="form-group">
          <label htmlFor="arrivalDate">Arrival Date</label>
          <input type="text" id="arrivalDate" name="arrivalDate" value={data.arrivalDate} onChange={handleChange} placeholder="e.g., 01/11/2025" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="destinationCity">Destination City</label>
        <input type="text" id="destinationCity" name="destinationCity" value={data.destinationCity} onChange={handleChange} />
      </div>
    </div>
  );
};

export default GeneralInfoForm;