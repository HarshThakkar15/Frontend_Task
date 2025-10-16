import React, { forwardRef } from 'react';
import './PdfStyles.css';
import placeholderHotel from '../../assets/placeholder-hotel.svg';

const DayImage = "https://images.unsplash.com/photo-1542472914-1e031a017996?q=80&w=150&h=150&fit=crop&auto=format&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; 

const VigoviaFooter = () => (
    <div className="pdf-footer">
        <div className="contact-info">
            <strong>Vigovia Tech Pvt. Ltd</strong>
            <div>Registered Office: Hd-109 Cinnabar Hills, Links Business Park, Karnataka, India.</div>
        </div>
        <div className="contact-info" style={{ textAlign: 'right' }}>
            <div>Phone: +91-9504061112</div>
            <div>Email ID: Utkarsh@Vigovia.com</div>
            <div>CIN: U79110KA2024PTC191890</div>
        </div>
        <div className="vigovia-logo-placeholder">vigovia</div>
    </div>
);
const PdfTemplate = forwardRef(({ data }, ref) => {
    const { general, days, flightSummary, hotelBookings, payment, inclusionsExclusions } = data;
    const dayPlaceholderImage = DayImage;
    
    return (
        <div ref={ref} className="pdf-document-container">
            <div className="pdf-page page-1">
                <div style={{ padding: '20px 40px', textAlign: 'center', fontSize: '10pt', fontWeight: 'bold', color: '#666' }}>
                    <span className="text-vigovia-dark">PLAN.PACK.GO!</span>
                </div>
                <div className="pdf-header-banner">
                    <h2 style={{ fontSize: '10pt', margin: 0 }}>Hi, {general.userName}!</h2>
                    <h1>{general.tripTitle}</h1>
                    <h2 style={{ marginBottom: 5 }}>{general.duration} Days {general.nights} Nights</h2>
                    <div className="icon-bar"> ✈ ️  🏨   🚌   ⛱️ </div>
                </div>
                <div className="pdf-info-bar">
                    <div className="pdf-info-item">
                        <strong>Departure From</strong>
                        {general.departureCity}
                    </div>
                    <div className="pdf-info-item">
                        <strong>Departure</strong>
                        {general.departureDate}
                    </div>
                    <div className="pdf-info-item">
                        <strong>Arrival</strong>
                        {general.arrivalDate}
                    </div>
                    <div className="pdf-info-item">
                        <strong>Destination</strong>
                        {general.destinationCity}
                    </div>
                    <div className="pdf-info-item">
                        <strong>No. Of Travellers</strong>
                        {general.travelers}
                    </div>
                </div>
                <div className="pdf-daily-itinerary">
                    {days.map((day, index) => (
                        <div className="pdf-day-container" key={index}>
                            <div className="day-label-column">
                                <div className="day-label-bar">{day.title}</div>

                                <img src={dayPlaceholderImage} alt={day.title} className="day-img" />

                                <div style={{ fontSize: '9pt', marginTop: '5px', fontWeight: 'bold' }}>{day.date}</div>
                                <div style={{ fontSize: '9pt', textAlign: 'center' }}>{day.subtitle}</div>
                            </div>
                            <div className="day-timeline-content" style={index === days.length - 1 ? { borderLeft: 'none', paddingBottom: '0' } : {}}>
                                <div className="day-timeline-dot"></div>
                                <div className="timeline-details">
                                    <div className="timeline-item">
                                        <div className="timeline-time-label">Morning</div>
                                        <div className="timeline-activity-details">{day.morning}</div>
                                    </div>
                                    <div className="timeline-item">
                                        <div className="timeline-time-label">Afternoon</div>
                                        <div className="timeline-activity-details">{day.afternoon}</div>
                                    </div>
                                    <div className="timeline-item">
                                        <div className="timeline-time-label">Evening</div>
                                        <div className="timeline-activity-details">{day.evening}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <VigoviaFooter />
            </div>
            <div className="pdf-page page-2">
                <div className="pdf-table-section">
                    <h2 className="pdf-section-header">Flight Summary</h2>
                    {flightSummary.map((flight, index) => (
                        <div className="flight-row" key={index}>
                            <div className="flight-row-date">
                                {flight.date}
                            </div>
                            <div className="flight-row-details">
                                <p style={{ margin: 0, fontWeight: 'bold' }}>{flight.airline} From {flight.from} To {flight.to}</p>
                            </div>
                        </div>
                    ))}
                    <p className="flight-notes">Note: All Flights Include Meals, Seat Choice (Excluding XL), And 20kg/25kg Checked Baggage.</p>
                    <h2 className="pdf-section-header" style={{ marginTop: '40px' }}>Hotel Bookings</h2>
                    <table className="pdf-table hotel-bookings-table">
                        <thead>
                            <tr className="bg-vigovia-dark">
                                <th>City</th>
                                <th>Check In</th>
                                <th>Check Out</th>
                                <th>Nights</th>
                                <th>Hotel Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hotelBookings.map((booking, index) => (
                                <tr key={index}>
                                    <td>{booking.city}</td>
                                    <td>{booking.checkIn}</td>
                                    <td>{booking.checkOut}</td>
                                    <td>{booking.nights}</td>
                                    <td>{booking.hotelName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="flight-notes" style={{ marginTop: '10px' }}>1. All Hotels Are Tentative And Can Be Replaced With Similar.</p>
                    <p className="flight-notes">2. Breakfast Included For All Hotel Stays.</p>
                    <p className="flight-notes">3. All Hotels Will Be 4* And Above Category.</p>
                    <p className="flight-notes">4. A maximum occupancy of 2 people/room is allowed in most hotels.</p>
                </div>
                <VigoviaFooter />
            </div>
            <div className="pdf-page page-3">
                <div className="pdf-table-section">
                    <h2 className="pdf-section-header">Important Notes</h2>
                    <table className="pdf-table important-notes-table">
                        <thead>
                            <tr className="bg-vigovia-dark">
                                <th style={{ width: '30%' }}>Point</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inclusionsExclusions.importantNotes.map((note, index) => (
                                <tr key={index}>
                                    <td className="table-row-head">{note.point}</td>
                                    <td>{note.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h2 className="pdf-section-header" style={{ marginTop: '40px' }}>Scope Of Service</h2>
                    <table className="pdf-table scope-service-table">
                        <thead>
                            <tr className="bg-vigovia-dark">
                                <th style={{ width: '30%' }}>Service</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inclusionsExclusions.scopeOfService.map((item, index) => (
                                <tr key={index}>
                                    <td className="table-row-head">{item.service}</td>
                                    <td>{item.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2 className="pdf-section-header" style={{ marginTop: '40px' }}>Inclusion Summary</h2>
                    <table className="pdf-table inclusion-summary-table">
                        <thead>
                            <tr className="bg-vigovia-dark">
                                <th>Category</th>
                                <th>Count</th>
                                <th>Details</th>
                                <th>Status / Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inclusionsExclusions.inclusionSummary.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.category}</td>
                                    <td>{item.count}</td>
                                    <td>{item.details}</td>
                                    <td>{item.status}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="4" style={{ border: 'none', paddingTop: '10px' }}>
                                    <p style={{ margin: 0, fontSize: '9pt' }}>Transfer Policy(Refundable Upon Claim): If Any Transfer Is Delayed Beyond 15 Minutes, Customers May Book An App-Based Or Radio Taxi And Claim A Refund For That Specific Leg.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <VigoviaFooter />
            </div>
            <div className="pdf-page page-4">
                <div className="pdf-table-section">
                    <h2 className="pdf-section-header">Activity Table</h2>
                    <table className="pdf-table activity-table-content">
                        <thead>
                            <tr className="bg-vigovia-dark">
                                <th style={{ width: '20%' }}>City</th>
                                <th>Activity</th>
                                <th style={{ width: '20%' }}>Type</th>
                                <th style={{ width: '15%' }}>Time Required</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inclusionsExclusions.activityTable.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.city}</td>
                                    <td>{item.activity}</td>
                                    <td>{item.type}</td>
                                    <td>{item.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2 className="pdf-section-header" style={{ marginTop: '40px' }}>Terms and Conditions</h2>
                    <p className="text-vigovia-dark" style={{ fontWeight: 'bold', fontSize: '10pt' }}>{inclusionsExclusions.termsAndConditions}</p>

                    <h2 className="pdf-section-header" style={{ marginTop: '40px' }}>Payment Plan</h2>
                    <div style={{ marginBottom: '20px' }}>
                        <div className="payment-summary-box">
                            <span>Total Amount</span>
                            <span className="text-vigovia-dark">{payment.totalAmount}</span>
                        </div>
                        <div className="payment-summary-box">
                            <span>TCS</span>
                            <span className="text-vigovia-dark">{payment.tcs}</span>
                        </div>
                    </div>
                    <table className="payment-installments-grid">
                        <thead>
                            <tr>
                                <th style={{ width: '33.33%' }}>Installment</th>
                                <th style={{ width: '33.33%' }}>Amount</th>
                                <th style={{ width: '33.33%' }}>Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payment.installments.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.installment}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.dueDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2 className="pdf-section-header" style={{ marginTop: '40px' }}>Visa Details</h2>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: 'var(--vigovia-background-light)' }}>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>Visa Type: <span style={{ fontWeight: 'normal' }}>{payment.visaType}</span></p>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>Validity: <span style={{ fontWeight: 'normal' }}>{payment.visaValidity}</span></p>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>Processing Date: <span style={{ fontWeight: 'normal' }}>{payment.processingDate}</span></p>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '40px', paddingBottom: '30px' }}>
                        <h1 className="text-vigovia-dark" style={{ margin: '20px 0', fontSize: '20pt', fontWeight: 'bold' }}>PLAN.PACK.GO!</h1>
                        <div style={{ background: 'var(--vigovia-gradient)', color: 'white', padding: '15px 30px', borderRadius: '30px', display: 'inline-block', fontWeight: 'bold' }}>
                            Book Now
                        </div>
                    </div>
                </div>
                <VigoviaFooter />
            </div>
        </div>
    );
});
PdfTemplate.displayName = 'PdfTemplate';
export default PdfTemplate;