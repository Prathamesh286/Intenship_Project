import React from 'react'

function MembershipPlans() {
    const plans = [
    {
      title: '2 Year Membership - Couples',
      signupFee: '₨1,000.00 Signup Fee',
      fullCost: '₨230,000.00',
      highlight: true,
    },
    {
      title: 'Annual Membership',
      description: 'Access hours for Colombo.\n4 x per month access at Kandy location',
      signupFee: '₨1,000.00 Signup Fee',
      fullCost: '₨250,000.00',
      highlight: false,
    },
    {
      title: '6 Month Membership',
      description: 'Access hours for Colombo.\n4 x per month access at Kandy location',
      signupFee: '₨1,000.00 Signup Fee',
      fullCost: '₨150,000.00',
      highlight: false,
    },
    {
      title: 'Annual Membership - Couples',
      signupFee: '₨1,000.00 Signup Fee',
      fullCost: '₨144,000.00',
      highlight: true,
    },
  ];
  return (
    
    <div>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
          Choose a Membership
        </h1>

        {/* Filter Section
        <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-center">
          <label className="text-2xl text-white font-semibold">Filter by Club:</label>
          <select className="w-full sm:w-64 px-4 py-3 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
            <option>All</option>
            <option>Individual</option>
            <option>Couples</option>
            <option>Family</option>
            {/* Add more options if needed */}
          {/* </select> */}
        {/* </div> */} 

       

        {/* Plans Grid */}
        <div className="space-y-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg overflow-hidden shadow-lg flex flex-col lg:flex-row justify-between items-stretch ${
                plan.highlight ? 'bg-black text-white' : 'bg-black text-white'
              }`}
            >
              {/* Left Section - Title & Details */}
              <div className="p-8 flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{plan.title}</h2>
                {plan.description && (
                  <p className="text-lg whitespace-pre-line mb-4 opacity-90">
                    {plan.description}
                  </p>
                )}
                <p className="text-lg opacity-90">{plan.signupFee}</p>
              </div>

              {/* Right Section - Price */}
              <div className="p-8 flex flex-col justify-center items-start lg:items-end">
                <p className="text-3xl md:text-4xl font-bold">{plan.fullCost}</p>
                <p className="text-lg mt-2">Full Cost</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

}

export default MembershipPlans
