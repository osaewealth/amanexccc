import api from "@/services/api";
import { useState, useEffect } from "react";

export default function OurMission() {
    const [url, setUrl] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
  
    useEffect(() => {
      api.get("/mission-video/")
        .then(res => setUrl(res.data.youtube_url))
        .catch(() => {
          setError("Failed to load video url");
        })
        .finally(() => setLoading(false));
    }, []);
  
    const save = async () => {
      try {
        setSaving(true);
        await api.post("/mission-video/update/", { youtube_url: url });
        setSaving(false);
      } catch (error) {
        setError("Failed to save video url");
        setSaving(false);
      }
    };

    // if (loading) {
    //     return (
    //       <div className="flex items-center justify-center h-64 text-coty-navy font-semibold">
    //         Loading...
    //       </div>
    //     );
    //   }
  
    return (
      <div className="max-w-xl bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4">Our Mission Video</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}
  
        <input
          className="w-full border p-2 mb-4 disabled:bg-gray-100 disabled:cursor-not-allowed"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="YouTube URL"
          disabled={saving}
        />
  
        <button 
          onClick={save} 
          disabled={saving}
          className="bg-coty-navy text-white px-4 py-2 rounded mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
    );
  }
  