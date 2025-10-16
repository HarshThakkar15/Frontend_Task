import React from 'react';
import Button from '../Button';

const DayItineraryItem = ({ day, index, updateDay, removeDay }) => {
  const handleChange = (e) => {
    updateDay(index, e.target.name, e.target.value);
  };

  return (
    <div className="dynamic-item">
      <h3>
        {day.title}: {day.subtitle}
        <Button onClick={() => removeDay(index)} remove>
          Remove Day
        </Button>
      </h3>
      <div className="grid-2">
        <div className="form-group">
          <label>Day Title</label>
          <input type="text" name="title" value={day.title} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="text" name="date" value={day.date} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label>Subtitle/Theme</label>
        <input type="text" name="subtitle" value={day.subtitle} onChange={handleChange} />
      </div>

      <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Activities:</p>
      <div className="grid-3">
        <div className="form-group">
          <label>Morning Activity</label>
          <textarea name="morning" rows="2" value={day.morning} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label>Afternoon Activity</label>
          <textarea name="afternoon" rows="2" value={day.afternoon} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label>Evening Activity</label>
          <textarea name="evening" rows="2" value={day.evening} onChange={handleChange}></textarea>
        </div>
      </div>
    </div>
  );
};

const DayItineraryForm = ({ days, updateDay, addDay, removeDay }) => {
  return (
    <div className="form-section">
      <h2>Daily Itinerary Input</h2>
      {days.map((day, index) => (
        <DayItineraryItem
          key={index}
          day={day}
          index={index}
          updateDay={updateDay}
          removeDay={removeDay}
        />
      ))}
      <Button onClick={addDay}>+ Add Day</Button>
    </div>
  );
};

export default DayItineraryForm;