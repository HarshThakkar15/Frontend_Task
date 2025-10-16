import { useState, useCallback } from 'react';

const initialDayState = {
  date: '27th November', 
  subtitle: 'City Exploration',
  morning: 'Arrive in Singapore. Transfer from Airport to Hotel.',
  afternoon: 'Check into Your Hotel.',
  evening: 'Explore Gardens By The Bay.',
};

const initialFlightState = {
  date: 'Thu 10 Jan\'24',
  airline: 'Fly Air India (AX-123)',
  from: 'DEL',
  to: 'SIN',
};

const initialHotelBooking = {
    city: 'Singapore',
    checkIn: '24/02/2024',
    checkOut: '24/02/2024',
    nights: 2,
    hotelName: 'Super Townhouse Oak Vashi Formerly Blue Diamond',
};

const initialStructuredNotes = {
    importantNotes: [
        { point: 'Airlines Standard Policy', details: 'In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.' },
        { point: 'Flight/Hotel Cancellation', details: 'In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.' },
        { point: 'Trip Insurance', details: 'In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.' },
        { point: 'Hotel Check-in & Check Out', details: 'In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.' },
        { point: 'Visa Rejection', details: 'In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.' },
    ],
    scopeOfService: [
        { service: 'Flight Tickets And Hotel Vouchers', details: 'Delivered 3 Days Post Full Payment' },
        { service: 'Web Check-in', details: 'Boarding Pass Delivery Via Email/WhatsApp' },
        { service: 'Support', details: 'Chat Support - Response Time: 4 Hours' },
        { service: 'Cancellation Support', details: 'Provided' },
        { service: 'Trip Support', details: 'Response Time: 5 Minutes' },
    ],
    inclusionSummary: [
        { category: 'Flight', count: 2, details: 'All Flights Mentioned', status: 'Awaiting Confirmation' },
        { category: 'Tourist Tax', count: 2, details: 'Yotel (Singapore), Oakwood (Sydney), Mercure (Cairns), Novotel (Gold Coast), Holiday Inn (Melbourne)', status: 'Awaiting Confirmation' },
        { category: 'Hotel', count: 2, details: 'Airport To Hotel - Hotel To Attractions - Day Trips If Any', status: 'Included' },
    ],
    activityTable: [
        { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Nature/Sightseeing', time: '2-3 Hours' },
        { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', time: '2-3 Hours' },
        { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', time: '2-3 Hours' },
    ],
};


const getInitialState = () => ({
  general: {
    userName: 'Harsh', 
    tripTitle: 'Singapore Itinerary',
    duration: 4, 
    nights: 3, 
    travelers: 4,
    departureCity: 'Mumbai',
    departureDate: '31/10/2025',
    arrivalDate: '01/11/2025',
    destinationCity: 'Singapore',
  },
  days: [
    { ...initialDayState, title: 'Day 1', subtitle: 'Arrival & city Exploration' },
    { ...initialDayState, title: 'Day 2', subtitle: 'Singapore City Excursion' },
    { ...initialDayState, title: 'Day 3', subtitle: 'Gardens By The Bay' },
    { ...initialDayState, title: 'Day 4', subtitle: 'Relax' },
  ],
  flightSummary: [
    { ...initialFlightState },
    { ...initialFlightState, date: 'Fri 11 Jan\'24', from: 'SIN', to: 'DEL' }, 
  ],
  hotelBookings: [
    { ...initialHotelBooking },
    { ...initialHotelBooking, hotelName: 'Hotel', checkIn: '26/02/2024', nights: 1 },
  ],
  payment: {
    totalAmount: '₹ 9,00,000 For 3 Pax (Inclusive of GST)', 
    tcs: 'Not Collected',
    installments: [
      { installment: 'Installment 1', amount: '₹3,50,000', dueDate: 'Initial Payment' },
      { installment: 'Installment 2', amount: '₹4,00,000', dueDate: 'Post Visa Approval' },
      { installment: 'Installment 3', amount: 'Remaining', dueDate: '20 Days Before Departure' },
    ],
    visaType: '123456',
    visaValidity: '123456',
    processingDate: '123456',
  },
  inclusionsExclusions: initialStructuredNotes,
});

const useItineraryState = () => {
  const [state, setState] = useState(getInitialState);


  const updateGeneral = useCallback((name, value) => {
    setState(prevState => ({ ...prevState, general: { ...prevState.general, [name]: value } }));
  }, []);
  

  const updateDay = useCallback((index, name, value) => {
    setState(prevState => {
      const newDays = [...prevState.days];
      newDays[index] = { ...newDays[index], [name]: value };
      return { ...prevState, days: newDays };
    });
  }, []);

  const addDay = useCallback(() => {
    setState(prevState => {
      const dayNumber = prevState.days.length + 1;
      const newDay = { ...initialDayState, title: `Day ${dayNumber}` };
      return { ...prevState, days: [...prevState.days, newDay] };
    });
  }, []);

  const removeDay = useCallback((index) => {
    setState(prevState => {
      const newDays = prevState.days.filter((_, i) => i !== index);
      const retitledDays = newDays.map((day, i) => ({
        ...day,
        title: `Day ${i + 1}`,
      }));
      return { ...prevState, days: retitledDays };
    });
  }, []);

  const updateFlight = useCallback((index, name, value) => {
    setState(prevState => {
        const newFlights = [...prevState.flightSummary];
        newFlights[index] = { ...newFlights[index], [name]: value };
        return { ...prevState, flightSummary: newFlights };
    });
  }, []);
  const addFlight = useCallback(() => {
    setState(prevState => ({ ...prevState, flightSummary: [...prevState.flightSummary, initialFlightState] }));
  }, []);
  const removeFlight = useCallback((index) => {
      setState(prevState => ({ ...prevState, flightSummary: prevState.flightSummary.filter((_, i) => i !== index) }));
  }, []);

  const updateHotelBooking = useCallback((index, name, value) => {
    setState(prevState => {
        const newBookings = [...prevState.hotelBookings];
        newBookings[index] = { ...newBookings[index], [name]: value };
        return { ...prevState, hotelBookings: newBookings };
    });
  }, []);
  const addHotelBooking = useCallback(() => {
      setState(prevState => ({ ...prevState, hotelBookings: [...prevState.hotelBookings, initialHotelBooking] }));
  }, []);
  const removeHotelBooking = useCallback((index) => {
      setState(prevState => ({ ...prevState, hotelBookings: prevState.hotelBookings.filter((_, i) => i !== index) }));
  }, []);
  const updatePayment = useCallback((name, value) => {
    setState(prevState => ({
      ...prevState,
      payment: { ...prevState.payment, [name]: value },
    }));
  }, []);

  const updateInstallment = useCallback((index, name, value) => {
    setState(prevState => {
      const newInstallments = [...prevState.payment.installments];
      newInstallments[index] = { ...newInstallments[index], [name]: value };
      return { ...prevState, payment: { ...prevState.payment, installments: newInstallments } };
    });
  }, []);
  const updateInclusionsExclusions = useCallback((name, value) => {
    setState(prevState => ({ ...prevState, inclusionsExclusions: { ...prevState.inclusionsExclusions, [name]: value } }));
  }, []);


  return {
    state,
    updateGeneral,
    updateDay,
    addDay,
    removeDay,
    updateFlight,
    addFlight,
    removeFlight,
    updateHotelBooking,
    addHotelBooking,
    removeHotelBooking,
    updatePayment,
    updateInstallment,
    updateInclusionsExclusions,
  };
};

export default useItineraryState;