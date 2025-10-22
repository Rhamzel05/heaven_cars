import React, { useState, useEffect } from 'react';
import PrimaryButton from '../components/PrimaryButton';

const OrderPage = ({ car, onHome, onExplore }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    carModel: '',
    testDrive: 'no',
    preferredDate: '',
    financing: 'not-sure',
    tradeIn: 'no',
    message: '',
    contactMethod: 'email'
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (car) {
      setFormData(prev => ({ ...prev, carModel: car.model }));
    }
  }, [car]);

  // local animation state to trigger CSS transitions
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => setAnimKey(k => k + 1), [currentStep]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // simulate API call
    await new Promise(resolve => setTimeout(resolve, 1600));

    console.log('Order submitted:', formData);
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  const carModels = [
    'Honda Civic 2024',
    'Toyota Camry XSE',
    'Ford Mustang GT',
    'Tesla Model 3',
    'BMW X5',
    'Audi A4',
    'Mercedes-Benz C-Class',
    'Jeep Wrangler Rubicon',
    'Porsche 911 Carrera',
    'Hyundai Tucson Hybrid',
    'Chevrolet Corvette Stingray'
  ];

  const states = [
    'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
    'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
    'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
  ];

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center py-10">
        <div className="max-w-2xl w-full px-6">
          <div className="bg-white rounded-2xl shadow-xl p-10 transform transition-all duration-500">
            <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-tr from-green-400 to-teal-500 flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 text-center mb-2">Order Confirmed</h2>
            <p className="text-gray-600 text-center mb-6">
              Thank you, <strong>{formData.fullName || 'Customer'}</strong>. We received your request for <strong>{formData.carModel || (car && car.model) || 'selected vehicle'}</strong>.
            </p>

            <div className="grid grid-cols-1 gap-3">
              <PrimaryButton
                label="Back to Home"
                onClick={onHome}
                type="primary"
                className="w-full px-6 py-3 rounded-xl"
              />
              <PrimaryButton
                label="Browse More Cars"
                onClick={onExplore}
                type="outline"
                className="w-full px-6 py-3 rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // small helper to render step content with slide/fade animation classes
  const StepWrapper = ({ children }) => (
    <div
      key={animKey}
      className="transition-all duration-500 ease-out transform"
      style={{
        opacity: 1,
      }}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            {car ? `Order ${car.model}` : 'Place Your Order'}
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Complete the form in a few steps — our sales team will reach out to finalize details.
          </p>
        </div>

        {/* Progress (glass) */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 mb-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 mb-3">
            {[1,2,3,4].map(step => {
              const isActive = step === currentStep;
              const isDone = step < currentStep;
              return (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all
                    ${isDone ? 'bg-gradient-to-tr from-green-400 to-teal-400 text-white shadow' : isActive ? 'bg-gradient-to-tr from-sky-600 to-indigo-600 text-white shadow-lg' : 'bg-white border border-gray-200 text-gray-500'}`}>
                    {isDone ? '✓' : step}
                  </div>
                  {step < 4 && (
                    <div className={`h-1 w-16 rounded-full ml-3 transition-all ${step < currentStep ? 'bg-gradient-to-r from-green-400 to-teal-400' : 'bg-gray-200'}`}></div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-gray-600 px-1">
            <span className={currentStep >= 1 ? 'font-medium text-sky-600' : ''}>Personal</span>
            <span className={currentStep >= 2 ? 'font-medium text-sky-600' : ''}>Vehicle</span>
            <span className={currentStep >= 3 ? 'font-medium text-sky-600' : ''}>Services</span>
            <span className={currentStep >= 4 ? 'font-medium text-sky-600' : ''}>Review</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit}>
            {/* Step 1 */}
            {currentStep === 1 && (
              <StepWrapper>
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact</label>
                      <select
                        name="contactMethod"
                        value={formData.contactMethod}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="text">Text Message</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                      <input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main St"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
                      >
                        <option value="">Select state</option>
                        {states.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                      <input
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="10001"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <PrimaryButton
                      type="button"
                      label="Next: Vehicle Details"
                      onClick={nextStep}
                      className="px-6 py-3 rounded-lg"
                    />
                  </div>
                </div>
              </StepWrapper>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <StepWrapper>
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Vehicle Details</h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Vehicle *</label>
                    <select
                      name="carModel"
                      value={formData.carModel}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
                    >
                      <option value="">{car ? car.model : 'Choose a vehicle'}</option>
                      {carModels.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>

                  {car && (
                    <div className="bg-sky-50 border border-sky-100 rounded-lg p-4">
                      <h4 className="font-semibold text-sky-700">Selected Vehicle</h4>
                      <p className="text-sky-900 font-medium">{car.model} — {car.price}</p>
                      <p className="text-sky-700 text-sm mt-1">{car.description}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Financing Interest</label>
                      <select
                        name="financing"
                        value={formData.financing}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
                      >
                        <option value="not-sure">Not sure yet</option>
                        <option value="cash">Paying cash</option>
                        <option value="finance">Need financing</option>
                        <option value="lease">Interested in lease</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Trade-In</label>
                      <select
                        name="tradeIn"
                        value={formData.tradeIn}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
                      >
                        <option value="no">No trade-in</option>
                        <option value="yes">Yes, I have a trade-in</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <PrimaryButton type="primary" label="Back" onClick={prevStep} className="px-5 py-2" />
                    <PrimaryButton type="button" label="Next: Additional Services" onClick={nextStep} className="px-5 py-2" />
                  </div>
                </div>
              </StepWrapper>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <StepWrapper>
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Additional Services</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Test Drive</label>
                      <select
                        name="testDrive"
                        value={formData.testDrive}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
                      >
                        <option value="no">No, thanks</option>
                        <option value="yes">Yes, please</option>
                      </select>
                    </div>

                    {formData.testDrive === 'yes' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                        <input
                          name="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Any special requests or notes..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 transition"
                    />
                  </div>

                  <div className="flex justify-between">
                    <PrimaryButton type="button" label="Back" onClick={prevStep} className="px-5 py-2" />
                    <PrimaryButton type="button" label="Next: Review & Submit" onClick={nextStep} className="px-5 py-2" />
                  </div>
                </div>
              </StepWrapper>
            )}

            {/* Step 4 */}
            {currentStep === 4 && (
              <StepWrapper>
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Review & Submit</h3>

                  <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-700">Personal Info</h4>
                        <p className="text-gray-600">{formData.fullName}</p>
                        <p className="text-gray-600">{formData.email}</p>
                        <p className="text-gray-600">{formData.phone}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700">Vehicle</h4>
                        <p className="text-gray-600">{formData.carModel}</p>
                        <p className="text-gray-600">Financing: {formData.financing}</p>
                        <p className="text-gray-600">Trade-in: {formData.tradeIn}</p>
                      </div>
                    </div>

                    {formData.testDrive === 'yes' && (
                      <div>
                        <h4 className="font-medium text-gray-700">Test Drive</h4>
                        <p className="text-gray-600">Preferred: {formData.preferredDate || 'TBD'}</p>
                      </div>
                    )}

                    {formData.message && (
                      <div>
                        <h4 className="font-medium text-gray-700">Notes</h4>
                        <p className="text-gray-600">{formData.message}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <PrimaryButton type="button" label="Back" onClick={prevStep} className="px-5 py-2" />
                    <PrimaryButton
                      type="submit"
                      label={isSubmitting ? 'Processing...' : 'Submit Order'}
                      disabled={isSubmitting}
                      className="px-8 py-3"
                    />
                  </div>
                </div>
              </StepWrapper>
            )}
          </form>
        </div>

        {/* Support */}
        <div className="text-center mt-6 text-gray-600">
          <p>Need help now? Call <strong>(555) 123-4567</strong></p>
          <p className="text-sm mt-1">Mon–Sat: 9AM–8PM</p>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
