import api from "../../api";
import React, { useState, useEffect } from "react";

const AddTransformationModal = ({
  open,
  onClose,
  mode = "create",
  initialData = null,
  setIsStickyHeader,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
      });
    } else {
      setFormData({ name: "", description: "" });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let values = { ...formData };

      // attach userId
      const userId = JSON.parse(localStorage.getItem("user"))?._id;
      values.user = userId;

      // attach templateId / url from query params if available
      const storedQueryParams = localStorage.getItem("queryParams");
      if (storedQueryParams) {
        const tempQuery = new URLSearchParams(storedQueryParams);
        values.templateId = tempQuery.get("templateid");
        values.url = tempQuery.get("url");
      }

      if (mode === "create") {
        if (values.url) {
          // 🚀 URL-based conversion (no AI)
          delete values.generateUsingAI;
          const file = new File([values.url], "text.txt", {
            type: "text/plain",
          });

          const res = await api.post("/conversion", values);
          console.log("Created URL-based conversion:", res.data);

          // Optional: upload file if your backend expects it
          // await handleUploadFile(file, "0", null, "1", true, true, res.data.createConversion?._id, true, true);

        } else {
          // 🚀 Normal create (with or without AI)
          const res = await api.post("/conversion", values);
          console.log("Created new conversion:", res.data);
        }
      } else if (mode === "edit" && initialData?._id) {
        // 🚀 Update conversion
        delete values.generateUsingAI;
        const res = await api.patch(`/conversion/${initialData._id}`, values);
        console.log("Updated conversion:", res.data);
      }

      onClose();
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 relative animate-fade-in max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => {
            onClose();
            setIsStickyHeader(true);
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-light"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          {mode === "edit" ? "Edit Transformation" : "Add Transformation"}
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-[#4AA181] mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Example: Conference Attendees"
              className="w-full border border-gray-200 focus:border-[#4AA181] focus:ring-1 focus:ring-[#4AA181] rounded-lg px-3 py-2 text-gray-900 bg-white placeholder-gray-400 outline-none transition"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4AA181] mb-1">
              Description
            </label>
            <textarea
              placeholder="Description example: This transformation is used to collect..."
              className="w-full border border-gray-200 focus:border-[#4AA181] focus:ring-1 focus:ring-[#4AA181] rounded-lg px-3 py-2 text-gray-900 bg-white placeholder-gray-400 outline-none min-h-[140px] transition"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            {mode === "create" && (
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
              disabled={loading}
              className="w-full sm:flex-1 bg-[#4AA181] text-white rounded-lg px-4 py-2 font-medium hover:bg-[#388a6b] transition"
            >
              {loading
                ? "Processing..."
                : mode === "edit"
                ? "Save Changes"
                : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransformationModal;
