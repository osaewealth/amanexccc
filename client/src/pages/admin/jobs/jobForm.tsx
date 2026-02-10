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
  };

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-6">
        {id ? "Edit Job Role" : "New Job Role"}
      </h1>

      <input
        className="w-full border p-2 mb-4"
        placeholder="Job title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          className="border p-2"
          placeholder="Department"
          value={department}
          onChange={e => setDepartment(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <select
          className="border p-2"
          value={jobType}
          onChange={e => setJobType(e.target.value)}
        >
          <option value="full_time">Full-time</option>
          <option value="part_time">Part-time</option>
        </select>

        <input
          className="border p-2"
          placeholder="Experience (e.g. 2+ years)"
          value={experience}
          onChange={e => setExperience(e.target.value)}
        />
      </div>

      <textarea
        className="w-full border p-2 mt-4"
        rows={4}
        placeholder="Job description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <textarea
        className="w-full border p-2 mt-4"
        rows={4}
        placeholder="Requirements (one per line)"
        value={requirements}
        onChange={e => setRequirements(e.target.value)}
      />

      <textarea
        className="w-full border p-2 mt-4"
        rows={4}
        placeholder="Responsibilities (one per line)"
        value={responsibilities}
        onChange={e => setResponsibilities(e.target.value)}
      />

      <label className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          checked={isOpen}
          onChange={e => setIsOpen(e.target.checked)}
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
          className="bg-coty-navy text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
