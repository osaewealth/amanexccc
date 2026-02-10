import { useEffect, useState } from "react";
import { Link } from "wouter";
import { JobService } from "@/services/jobService";

export default function JobList() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    JobService.getAll().then(res => setJobs(res.data))
    .catch(() => {
      setError("Failed to load categories");
    })
    .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-coty-navy font-semibold">
        Loading jobs...
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  const toggleStatus = async (id: string) => {
    const res = await JobService.toggle(id);
    setJobs(prev =>
      prev.map(j =>
        j.id === id ? { ...j, is_open: res.data.is_open } : j
      )
    );
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Job Roles</h1>

        <Link href="/admin/jobs/new">
          <button className="bg-coty-navy text-white px-4 py-2 rounded">
            Add Job
          </button>
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b text-left">
            <th className="p-4">Title</th>
            <th>Department</th>
            <th>Type</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map(job => (
            <tr key={job.id} className="border-b">
              <td className="p-4 font-medium">{job.title}</td>
              <td>{job.department}</td>
              <td className="capitalize">
                {job.job_type.replace("_", " ")}
              </td>
              <td>{job.location}</td>
              <td>
                <button
                  onClick={() => toggleStatus(job.id)}
                  className={`px-3 py-1 rounded text-sm ${
                    job.is_open
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {job.is_open ? "Open" : "Closed"}
                </button>
              </td>
              <td className="space-x-4">
                <Link href={`/admin/jobs/${job.id}/edit`}>
                  <span className="text-blue-600 cursor-pointer">Edit</span>
                </Link>

                <span
                  className="text-red-600 cursor-pointer"
                  onClick={() => {
                    if (confirm("Delete job role?")) {
                      JobService.delete(job.id).then(() =>
                        setJobs(prev =>
                          prev.filter(j => j.id !== job.id)
                        )
                      );
                    }
                  }}
                >
                  Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
