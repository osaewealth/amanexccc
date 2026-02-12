import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { JobService } from "@/services/jobService";

export default function JobForm({ id }: { id?: string }) {
  const [, navigate] = useLocation();

  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("full_time");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      JobService.getOne(id).then(res => {
        const j = res.data;
        setTitle(j.title);
        setDepartment(j.department);
        setLocation(j.location);
        setJobType(j.job_type);
        setExperience(j.experience);
        setDescription(j.description);
        setRequirements(j.requirements);
        setResponsibilities(j.responsibilities);
        setIsOpen(j.is_open);
      });
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      setSaving(true);
      const payload = {
        title,
        department,
        location,
        job_type: jobType,
        experience,
        description,
        requirements,
        responsibilities,
        is_open: isOpen
      };

      if (id) {
        await JobService.update(id, payload);
      } else {
        await JobService.create(payload);
      }

      navigate("/admin/jobs");
    } catch (err:any) {
      console.error(err);
      alert("Failed to save job");
      setSaving(false);
      setError(err.message || "Failed to save job");
    }
  };

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-6">
        {id ? "Edit Job Role" : "New Job Role"}
      </h1>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        className="w-full border p-2 mb-4 disabled:bg-gray-100 disabled:cursor-not-allowed"
        placeholder="Job title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        disabled={saving}
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          className="border p-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="Department"
          value={department}
          onChange={e => setDepartment(e.target.value)}
          disabled={saving}
        />

        <input
          className="border p-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
          disabled={saving}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <select
          className="border p-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
          value={jobType}
          onChange={e => setJobType(e.target.value)}
          disabled={saving}
        >
          <option value="full_time">Full-time</option>
          <option value="part_time">Part-time</option>
        </select>

        <input
          className="border p-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="Experience (e.g. 2+ years)"
          value={experience}
          onChange={e => setExperience(e.target.value)}
          disabled={saving}
        />
      </div>

      <textarea
        className="w-full border p-2 mt-4 disabled:bg-gray-100 disabled:cursor-not-allowed"
        rows={4}
        placeholder="Job description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        disabled={saving}
      />

      <textarea
        className="w-full border p-2 mt-4 disabled:bg-gray-100 disabled:cursor-not-allowed"
        rows={4}
        placeholder="Requirements (one per line)"
        value={requirements}
        onChange={e => setRequirements(e.target.value)}
        disabled={saving}
      />

      <textarea
        className="w-full border p-2 mt-4 disabled:bg-gray-100 disabled:cursor-not-allowed"
        rows={4}
        placeholder="Responsibilities (one per line)"
        value={responsibilities}
        onChange={e => setResponsibilities(e.target.value)}
        disabled={saving}
      />

      <label className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          checked={isOpen}
          onChange={e => setIsOpen(e.target.checked)}
          disabled={saving}
        />
        Job is open
      </label>

      <div className="flex justify-end mt-6 gap-4">
        <button
          onClick={() => navigate("/admin/jobs")}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-coty-navy text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {saving ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
}
