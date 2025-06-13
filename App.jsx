import React, { useState, useEffect } from 'react';

export default function App() {
  const [section, setSection] = useState('');
  const [banks, setBanks] = useState([]);

  const [formData, setFormData] = useState({
    orgName: '',
    holder: '',
    address: '',
    state: '',
    district: '',
    pin: '',
    phone: '',
    Apos: '', Aneg: '', Bpos: '', Bneg: '',
    ABpos: '', ABneg: '', Opos: '', Oneg: '',
    Bombay: '', HH: ''
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bloodBanks')) || [];
    setBanks(stored);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBanks = [...banks, formData];
    setBanks(newBanks);
    localStorage.setItem('bloodBanks', JSON.stringify(newBanks));
    alert('🩸 Bank Registered!');
    setFormData({
      orgName: '', holder: '', address: '', state: '', district: '',
      pin: '', phone: '', Apos: '', Aneg: '', Bpos: '', Bneg: '',
      ABpos: '', ABneg: '', Opos: '', Oneg: '', Bombay: '', HH: ''
    });
  };

  const bloodTypes = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−', 'Bombay', 'HH'];

  return (
    <div className="p-4 text-center font-sans bg-gradient-to-br from-pink-100 to-red-200 min-h-screen animate-fade">
      <h1 className="text-4xl font-bold text-red-700 mb-2">🩸 BloodLink</h1>
      <p className="text-lg mb-6 italic">Connecting Lives, One Drop at a Time</p>

      <img src="https://cdn-icons-png.flaticon.com/512/4716/4716005.png" alt="Blood" className="mx-auto w-32 mb-4 animate-bounce" />

      <div className="flex justify-center gap-4 mb-6">
        <button onClick={() => setSection('register')} className="bg-red-600 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-red-700 transition">📝 Register Your Bank</button>
        <button onClick={() => setSection('seeker')} className="bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-green-700 transition">🔍 Blood Seeker</button>
      </div>

      {/* 🧠 OBJECTIVE */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-4 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-2 text-red-700">🎯 Objective</h2>
        <p>To provide a centralized platform to search and update blood availability across India. This platform helps save lives by making blood access easier and quicker.</p>
      </div>

      {/* 🔧 SERVICES */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-4 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-2 text-red-700">🛠️ Services</h2>
        <ul className="list-disc list-inside text-left">
          <li>🔍 Search blood banks based on availability</li>
          <li>📝 Register and update your blood bank details</li>
          <li>📊 Track inventory for 10 blood types</li>
          <li>📱 Easy mobile-friendly interface</li>
        </ul>
      </div>

      {/* 🏥 REGISTRATION FORM */}
      {section === 'register' && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto mb-6 text-left space-y-4">
          <h2 className="text-2xl font-semibold text-red-600">🏥 Blood Bank Registration</h2>
          {Object.entries(formData).map(([key, value]) => (
            key !== 'blood' && (
              <div key={key}>
                <label className="block capitalize">{key.replace(/[A-Z]/g, ' $&')}:</label>
                <input
                  className="w-full p-2 border rounded"
                  value={value}
                  required={key !== 'Bombay' && key !== 'HH'}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  placeholder={`Enter ${key.replace(/[A-Z]/g, ' $&')}`}
                />
              </div>
            )
          ))}
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">✅ Submit</button>
        </form>
      )}

      {/* 📋 BLOOD SEEKER */}
      {section === 'seeker' && (
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto mb-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">📋 Available Blood Banks</h2>
          {banks.length === 0 ? <p>No banks registered yet.</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {banks.map((bank, index) => (
                <div key={index} className="border p-4 rounded-xl shadow-sm bg-red-50 text-left">
                  <h3 className="text-lg font-bold text-red-700">{bank.orgName}</h3>
                  <p><strong>Holder:</strong> {bank.holder}</p>
                  <p><strong>Address:</strong> {bank.address}, {bank.district}, {bank.state} - {bank.pin}</p>
                  <p><strong>Phone:</strong> {bank.phone}</p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    {bloodTypes.map((type) => (
                      <p key={type}>🩸 {type}: {bank[type.replace('+', 'pos').replace('-', 'neg')] || '0'} L</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 👣 FOOTER */}
      <footer className="text-sm text-gray-700 mt-6">Made by ❤️ <strong>Prithvi Gupta</strong></footer>
    </div>
  );
}