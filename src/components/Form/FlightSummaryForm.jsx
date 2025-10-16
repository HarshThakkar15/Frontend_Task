import React from 'react';
import Button from '../Button';

const FlightSummaryForm = ({ flights, updateFlight, addFlight, removeFlight }) => {
  const handleFlightChange = (index, e) => {
    updateFlight(index, e.target.name, e.target.value);
  };

  return (
    <div className="form-section">
      <h2>Flight Summary Input</h2>
      {flights.map((flight, index) => (
        <div key={index} className="dynamic-item">
          <h3 style={{ marginBottom: '10px' }}>Flight Segment {index + 1}</h3>
          <div className="grid-3" style={{ gridTemplateColumns: '1.5fr 1fr 1fr' }}>
            <div className="form-group">
              <label>Airline/Flight No.</label>
              <input type="text" name="airline" value={flight.airline} onChange={(e) => handleFlightChange(index, e)} />
            </div>
            <div className="form-group">
              <label>From (Code)</label>
              <input type="text" name="from" value={flight.from} onChange={(e) => handleFlightChange(index, e)} />
            </div>
            <div className="form-group">
              <label>To (Code)</label>
              <input type="text" name="to" value={flight.to} onChange={(e) => handleFlightChange(index, e)} />
            </div>
          </div>
          <div className="form-group">
            <label>Date/Time</label>
            <input type="text" name="date" value={flight.date} onChange={(e) => handleFlightChange(index, e)} />
          </div>
          <Button onClick={() => removeFlight(index)} remove style={{ marginTop: '10px' }}>Remove Segment</Button>
        </div>
      ))}
      <Button onClick={addFlight}>+ Add Flight Segment</Button>
    </div>
  );
};

export default FlightSummaryForm;