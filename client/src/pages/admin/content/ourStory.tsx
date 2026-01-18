import api from "@/services/api";
import { useState, useEffect } from "react";

export default function OurStory() {
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      api.get("/story-video/")
        .then(res => setUrl(res.data.youtube_url))
        .catch(() => {
          setError("Failed to load video url");
        })
        .finally(() => setLoading(false));
    }, []);
  
    const save = () => {
      try {
        api.post("/story-video/update/", { youtube_url: url });
      } catch (error) {
        setError("Failed to save video url")
      }
    };

    // if (loading) {
    //     return (
    //       <div className="flex items-center justify-center h-64 text-coty-navy font-semibold">
    //         Loading...
    //       </div>
    //     );
    //   }
    
      if (error) {
        return <p className="text-red-500 text-sm">{error}</p>;
      }
  
    return (
      <div className="max-w-xl bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4">Our Story Video</h1>
  
        <input
          className="input"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="YouTube URL"
        />
  
        <button onClick={save} className="btn-primary mt-4">
          Save
        </button>
      </div>
    );
  }
  