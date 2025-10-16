import React, { useRef } from 'react';
import useItineraryState from './hooks/useItineraryState';
import GeneralInfoForm from './components/Form/GeneralInfoForm';
import DayItineraryForm from './components/Form/DayItineraryForm';
import AccommodationForm from './components/Form/AccommodationForm';
import PaymentForm from './components/Form/PaymentForm';
import InclusionsExclusionsForm from './components/Form/InclusionsExclusionsForm';
import FlightSummaryForm from './components/Form/FlightSummaryForm'; 
import Button from './components/Button';
import PdfTemplate from './components/PDF/PdfTemplate';
import { generatePdf } from './utils/pdfGenerator';
import placeholderHotel from './assets/placeholder-hotel.svg'; 
function App() {
  const { state, updateGeneral, updateDay, addDay, removeDay, updateFlight, addFlight, removeFlight, updateHotelBooking, addHotelBooking, removeHotelBooking, updatePayment, updateInstallment, updateInclusionsExclusions } = useItineraryState();
  const pdfTemplateRef = useRef(null); 

  const handleGeneratePdf = async () => {
    await generatePdf(pdfTemplateRef.current, state);
  };

  const pdfContainerStyle = {
    position: 'absolute',
    top: '-9999px',
    left: '-9999px',
    width: '800px', // Target A4 width for PDF generation
    zIndex: -1,
    padding: 0,
    margin: 0,
  };

  return (
    <div className="app-container">
      <h1 className="purple-box">Itinerary Builder</h1>

      <GeneralInfoForm data={state.general} updateData={updateGeneral} />
     <DayItineraryForm days={state.days} updateDay={updateDay} addDay={addDay} removeDay={removeDay} />
      <FlightSummaryForm flights={state.flightSummary} updateFlight={updateFlight} addFlight={addFlight} removeFlight={removeFlight} />
      <AccommodationForm bookings={state.hotelBookings} updateBooking={updateHotelBooking} addBooking={addHotelBooking} removeBooking={removeHotelBooking} />
      <PaymentForm data={state.payment} updateData={updatePayment} updateInstallment={updateInstallment} />
      <InclusionsExclusionsForm data={state.inclusionsExclusions} updateData={updateInclusionsExclusions} />


      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Button onClick={handleGeneratePdf} primary>
          Generate PDF
        </Button>
      </div>

      <div style={pdfContainerStyle}>
        <PdfTemplate ref={pdfTemplateRef} data={state} />
      </div>

    </div>
  );
}

export default App;