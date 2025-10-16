import React from 'react';
import Button from '../Button';

const AccommodationForm = ({ bookings, updateBooking, addBooking, removeBooking }) => {
  const handleBookingChange = (index, e) => {
    updateBooking(index, e.target.name, e.target.value);
  };

  return (
    <div className="form-section">
      <h2>Hotel Bookings</h2>
      {bookings.map((booking, index) => (
        <div key={index} className="dynamic-item">
          <h3 style={{ marginBottom: '10px' }}>Booking Row {index + 1}</h3>
          <div className="grid-3">
            <div className="form-group">
              <label>City</label>
              <input type="text" name="city" value={booking.city} onChange={(e) => handleBookingChange(index, e)} />
            </div>
            <div className="form-group">
              <label>Hotel Name</label>
              <input type="text" name="hotelName" value={booking.hotelName} onChange={(e) => handleBookingChange(index, e)} />
            </div>
            <div className="form-group">
              <label>Nights</label>
              <input type="number" name="nights" value={booking.nights} onChange={(e) => handleBookingChange(index, e)} />
            </div>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label>Check In Date</label>
              <input type="text" name="checkIn" value={booking.checkIn} onChange={(e) => handleBookingChange(index, e)} placeholder="e.g., 24/02/2024" />
            </div>
            <div className="form-group">
              <label>Check Out Date</label>
              <input type="text" name="checkOut" value={booking.checkOut} onChange={(e) => handleBookingChange(index, e)} placeholder="e.g., 24/02/2024" />
            </div>
          </div>
          <Button onClick={() => removeBooking(index)} remove style={{ marginTop: '10px' }}>Remove Row</Button>
        </div>
      ))}
      <Button onClick={addBooking}>+ Add Hotel Booking Row</Button>
    </div>
  );
};

export default AccommodationForm;