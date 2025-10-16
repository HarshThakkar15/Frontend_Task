import React from 'react';

const InstallmentItem = ({ installment, index, updateInstallment }) => {
  const handleChange = (e) => {
    updateInstallment(index, e.target.name, e.target.value);
  };

  return (
    <div className="dynamic-item" style={{ padding: '10px', marginBottom: '10px' }}>
      <h4 style={{ marginBottom: '5px' }}>Installment {index + 1}</h4>
      <div className="grid-3">
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>Installment Name</label>
          <input type="text" name="installment" value={installment.installment} onChange={handleChange} />
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>Amount</label>
          <input type="text" name="amount" value={installment.amount} onChange={handleChange} />
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label>Due Date/Condition</label>
          <input type="text" name="dueDate" value={installment.dueDate} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
};


const PaymentForm = ({ data, updateData, updateInstallment }) => {
  const handleChange = (e) => {
    updateData(e.target.name, e.target.value);
  };

  return (
    <div className="form-section">
      <h2>Payment Plan and Visa Details</h2>
      
      <div className="grid-2">
        <div className="form-group">
          <label htmlFor="totalAmount">Total Trip Amount (Inclusive of GST)</label>
          <input type="text" id="totalAmount" name="totalAmount" value={data.totalAmount} onChange={handleChange} placeholder="e.g., ₹ 9,00,000 For 3 Pax" required />
        </div>
        <div className="form-group">
          <label htmlFor="tcs">TCS Status</label>
          <input type="text" id="tcs" name="tcs" value={data.tcs} onChange={handleChange} placeholder="e.g., Not Collected" required />
        </div>
      </div>

      <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>Installments</h3>
      {data.installments.map((installment, index) => (
        <InstallmentItem
          key={index}
          installment={installment}
          index={index}
          updateInstallment={updateInstallment}
        />
      ))}
      
      <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>Visa Details</h3>
      <div className="grid-3">
        <div className="form-group">
          <label>Visa Type</label>
          <input type="text" name="visaType" value={data.visaType} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Validity</label>
          <input type="text" name="visaValidity" value={data.visaValidity} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Processing Date</label>
          <input type="text" name="processingDate" value={data.processingDate} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;