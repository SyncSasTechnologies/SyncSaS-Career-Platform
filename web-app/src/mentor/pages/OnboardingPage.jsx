import React, { useState } from 'react';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, title: 'Profile Setup', description: 'Complete your mentor profile' },
    { id: 2, title: 'Experience', description: 'Add your professional experience' },
    { id: 3, title: 'Expertise', description: 'Define your areas of expertise' },
    { id: 4, title: 'Availability', description: 'Set your availability hours' }
  ];

  return (
    <div className="onboarding-page">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Mentor Onboarding</h1>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((s) => (
              <div key={s.id} className="flex-1 mx-1">
                <div className={`rounded-full h-2 ${s.id <= step ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                <p className="text-xs mt-2 text-center">{s.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow p-8 max-w-2xl mx-auto">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Profile Setup</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="Enter your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" className="w-full border rounded-lg px-4 py-2" placeholder="Enter your email" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea className="w-full border rounded-lg px-4 py-2" rows="4" placeholder="Tell us about yourself"></textarea>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Professional Experience</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Position</label>
                  <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="Your current job title" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="Company name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Years of Experience</label>
                  <input type="number" className="w-full border rounded-lg px-4 py-2" placeholder="Years" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Areas of Expertise</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Skills</label>
                  <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="E.g., React, Node.js, Python" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Industries</label>
                  <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="E.g., Tech, Finance, Healthcare" />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Set Your Availability</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Hours per week</label>
                  <input type="number" className="w-full border rounded-lg px-4 py-2" placeholder="Hours" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred time zone</label>
                  <select className="w-full border rounded-lg px-4 py-2">
                    <option>Select timezone</option>
                    <option>EST</option>
                    <option>CST</option>
                    <option>MST</option>
                    <option>PST</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="px-6 py-2 border rounded-lg disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === steps.length}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
            >
              {step === steps.length ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
