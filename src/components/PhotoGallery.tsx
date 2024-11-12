import React, { useState, useEffect } from "react";
import { ArrowLeft, Trash2, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Photo {
  id: number;
  url: string;
}

const PhotoGallery = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    // Clear previous session data
    sessionStorage.removeItem("temp-photos");

    // Load gallery photos
    const savedPhotos = JSON.parse(
      localStorage.getItem("spevents-photos") || "[]"
    ) as Photo[];
    setPhotos(savedPhotos);

    // Listen for updates from other tabs/windows
    const handleStorageChange = () => {
      const updatedPhotos = JSON.parse(
        localStorage.getItem("spevents-photos") || "[]"
      );
      setPhotos(updatedPhotos);
    };

    // Listen for custom event from PhotoReview
    const handleCustomEvent = (event: CustomEvent) => {
      setPhotos(event.detail.photos);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(
      "spevents-gallery-update",
      handleCustomEvent as EventListener
    );

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "spevents-gallery-update",
        handleCustomEvent as EventListener
      );
    };
  }, []);

  const deletePhoto = (id: number) => {
    const updatedPhotos = photos.filter((photo) => photo.id !== id);
    setPhotos(updatedPhotos);
    localStorage.setItem("spevents-photos", JSON.stringify(updatedPhotos));

    // Broadcast the update
    const updateEvent = new CustomEvent("spevents-gallery-update", {
      detail: { photos: updatedPhotos },
    });
    window.dispatchEvent(updateEvent);
  };

  const handleStartCapturing = () => {
    navigate("/qr", { state: { from: "gallery" } });
  };

  const clearAllData = () => {
    setIsClearing(true);

    localStorage.removeItem("spevents-photos");
    sessionStorage.removeItem("temp-photos");

    setPhotos([]);

    const updateEvent = new CustomEvent("spevents-gallery-update", {
      detail: { photos: [] },
    });
    window.dispatchEvent(updateEvent);
    setTimeout(() => setIsClearing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 overflow-auto">
      {/* Header */}
      <div className="sticky top-0 inset-x-0 bg-gray-900/80 backdrop-blur-md z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-white flex items-center space-x-2"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Back</span>
          </button>
          <h1 className="text-white text-lg font-semibold">Gallery</h1>
          <div className="w-12" />
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="px-4 pb-20">
        <div className="grid grid-cols-2 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative aspect-square group">
              <img
                src={photo.url}
                alt="Event photo"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={clearAllData}
                disabled={isClearing || photos.length === 0}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isClearing ? "bg-red-500" : "bg-white/10 hover:bg-white/20"
                } ${
                  photos.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <RefreshCw
                  className={`w-5 h-5 text-white ${
                    isClearing ? "animate-spin" : ""
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {photos.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
            <p className="text-center mb-4">No photos yet</p>
            <button
              onClick={handleStartCapturing}
              className="px-4 py-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
            >
              Start capturing moments
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
