import React, { useState, useEffect } from "react";

const AddTransformationModal = ({ open, onClose, mode = 'create', initialData = null ,setIsStickyHeader }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || ''
      });
    } else {
      setFormData({ name: '', description: '' });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'edit') {
      console.log('Editing transformation:', formData);
    } else {
      console.log('Creating transformation:', formData);
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 relative animate-fade-in max-h-[90vh] overflow-y-auto">
        <button
          onClick={()=>{onClose();setIsStickyHeader(true)}}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-light"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          {mode === 'edit' ? 'Edit Transformation' : 'Add Transformation'}
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-[#4AA181] mb-1">Name</label>
            <input
              type="text"
              placeholder="Example: Conference Attendees"
              className="w-full border border-gray-200 focus:border-[#4AA181] focus:ring-1 focus:ring-[#4AA181] rounded-lg px-3 py-2 text-gray-900 bg-white placeholder-gray-400 outline-none transition"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4AA181] mb-1">Description</label>
            <textarea
              placeholder="Description example: This transformation is used to collect a list of contacts of speakers and attendees of the conferences including persons' name, position, company name, email, LinkedIn profile, X (Twitter) profile, and the conference name and website."
              className="w-full border border-gray-200 focus:border-[#4AA181] focus:ring-1 focus:ring-[#4AA181] rounded-lg px-3 py-2 text-gray-900 bg-white placeholder-gray-400 outline-none min-h-[140px] transition"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            {mode === 'create' && (
              <>
                <button
                  type="button"
                  className="w-full sm:flex-1 bg-gray-100 text-gray-400 rounded-lg px-4 py-2 font-medium cursor-not-allowed"
                  disabled
                >
                  Create Using AI
                </button>
                <button
                  type="button"
                  className="w-full sm:flex-1 bg-[#e6f4ef] text-[#4AA181] rounded-lg px-4 py-2 font-medium border border-[#4AA181] hover:bg-[#d2ede3] transition"
                >
                  Upload sample file
                </button>
              </>
            )}
            <button
              type="submit"
              className="w-full sm:flex-1 bg-[#4AA181] text-white rounded-lg px-4 py-2 font-medium hover:bg-[#388a6b] transition"
            >
              {mode === 'edit' ? 'Save Changes' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransformationModal;