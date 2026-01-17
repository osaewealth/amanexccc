import api from "@/services/api";
import { useState, useEffect } from "react";

export default function OurMission() {
    const [url, setUrl] = useState("");
  
    useEffect(() => {
      api.get("/mission-video/")
        .then(res => setUrl(res.data.youtube_url));
    }, []);
  
    const save = () => {
      api.post("/mission-video/update/", { youtube_url: url });
    };
  
    return (
      <div className="max-w-xl bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4">Our Mission Video</h1>
  
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
  