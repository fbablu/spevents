import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Camera, Award, Grid, WandSparkles, Share2, X, Trash2, Check } from 'lucide-react';
import { useNgrok } from '../../contexts/NgrokContext';
import { motion, AnimatePresence } from 'framer-motion';
import { shareToInstagram } from './utils/collage';

interface Photo {
  url: string;
  name: string;
  created_at: string;
}

interface TabConfig {
  id: string;
  icon: React.ReactNode;
  label: string;
}

export function GuestDashboard() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { baseUrl } = useNgrok();

  const navigateWithBaseUrl = (path: string) => {
    const fullPath = path === "/" ? `/${eventId}/guest` : `/${eventId}/guest${path}`;
    if (window.innerWidth <= 768 && baseUrl) {
      window.location.href = `${baseUrl}${fullPath}`;
    } else {
      navigate(fullPath);
    }
  };
  const [photos, setPhotos] = useState<Photo[]>(() => {
    return JSON.parse(localStorage.getItem('uploaded-photos') || '[]');
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('gallery');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedPhotosToDelete, setSelectedPhotosToDelete] = useState<Set<string>>(new Set());

  const tabs: TabConfig[] = [
    { id: 'gallery', icon: <Grid className="w-6 h-6 text-white font-bold" />, label: 'Gallery' },
    { id: 'camera', icon: <Camera className="w-6 h-6 text-white font-bold" />, label: 'Camera' },
    { id: 'create', icon: <WandSparkles className="w-6 h-6 text-white font-bold" />, label: 'Create' },
    { id: 'prize', icon: <Award className="w-6 h-6 text-white font-bold" />, label: 'Prize' },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    
    const navigateToPath = (path: string) => {
      const fullPath = path === "/" 
        ? `/${eventId}/guest` 
        : `/${eventId}/guest${path}`;
        
      navigate(fullPath);
    };
    
    switch (tabId) {
      case 'camera':
        navigateToPath('/camera');
        break;
      case 'create':
        navigateToPath('/create');
        break;
      case 'prize':
        navigateToPath('/feedback');
        break;
      case 'gallery':
        navigateToPath('/');
        break;
    }
  };

  const handlePhotoClick = (index: number) => {
    if (isDeleteMode) {
      const photo = photos[index];
      setSelectedPhotosToDelete(prev => {
        const newSet = new Set(prev);
        if (newSet.has(photo.name)) {
          newSet.delete(photo.name);
        } else {
          newSet.add(photo.name);
        }
        return newSet;
      });
    } else {
      setSelectedPhotoIndex(index);
    }
  };

  const handleShare = async (photo: Photo) => {
    try {
      await shareToInstagram(photo.url);
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Error sharing photo');
    }
  };

  const handleSwipe = (direction: number) => {
    if (selectedPhotoIndex === null) return;
    
    const newIndex = selectedPhotoIndex + direction;
    if (newIndex >= 0 && newIndex < photos.length) {
      setSelectedPhotoIndex(newIndex);
    }
  };

  const handleSelectAllPhotos = () => {
    if (selectedPhotosToDelete.size === photos.length) {
      setSelectedPhotosToDelete(new Set());
    } else {
      setSelectedPhotosToDelete(new Set(photos.map(p => p.name)));
    }
  };

  const handleDeleteSelectedPhotos = () => {
    const newPhotos = photos.filter(photo => !selectedPhotosToDelete.has(photo.name));
    setPhotos(newPhotos);
    localStorage.setItem('uploaded-photos', JSON.stringify(newPhotos));
    setSelectedPhotosToDelete(new Set());
    setIsDeleteMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 bg-gray-900/80 backdrop-blur-lg z-10 border-b border-white/10">
        <div className="px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-medium text-white">Your Photos</h1>
          <div className="flex items-center gap-2">
            {photos.length > 0 && (
              <button
                onClick={() => setIsDeleteMode(!isDeleteMode)}
                className={`p-2 rounded-full transition-colors ${
                  isDeleteMode ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Delete Mode Controls */}
        <AnimatePresence>
          {isDeleteMode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 py-2 border-t border-white/10"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={handleSelectAllPhotos}
                  className="text-sm text-white/70 hover:text-white"
                >
                  {selectedPhotosToDelete.size === photos.length ? 'Deselect All' : 'Select All'}
                  <span className="ml-2 text-white/50">
                    ({selectedPhotosToDelete.size} selected)
                  </span>
                </button>
                {selectedPhotosToDelete.size > 0 && (
                  <button
                    onClick={handleDeleteSelectedPhotos}
                    className="px-4 py-1.5 bg-red-500 text-white text-sm rounded-full"
                  >
                    Delete Selected
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="pb-24">
        {activeTab === 'gallery' && (
          <div className="px-4 pt-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-48">
                <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              </div>
            ) : photos.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-white/60">No photos yet</p>
                <button
                  onClick={() => navigateWithBaseUrl('/camera')}
                  className="mt-4 px-6 py-2 bg-white/10 text-white rounded-full hover:bg-white/20"
                >
                  Take Photos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {photos.map((photo, index) => (
                  <motion.div
                    key={photo.name}
                    className="relative aspect-square"
                    onClick={() => handlePhotoClick(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img
                      src={photo.url}
                      alt="Your photo"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {isDeleteMode && selectedPhotosToDelete.has(photo.name) && (
                      <div className="absolute inset-0 bg-red-500/30 rounded-lg flex items-center justify-center">
                        <Check className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Photo Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <div className="absolute top-4 right-4 z-10 flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare(photos[selectedPhotoIndex]);
                }}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20"
              >
                <Share2 className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div 
              className="h-full flex items-center justify-center touch-pan-y"
              onTouchStart={(e) => {
                const touch = e.touches[0];
                const startX = touch.clientX;
                
                const handleTouchMove = (e: TouchEvent) => {
                  const touch = e.touches[0];
                  const diff = touch.clientX - startX;
                  if (Math.abs(diff) > 50) {
                    handleSwipe(diff > 0 ? -1 : 1);
                    document.removeEventListener('touchmove', handleTouchMove);
                  }
                };
                
                document.addEventListener('touchmove', handleTouchMove);
                document.addEventListener('touchend', () => {
                  document.removeEventListener('touchmove', handleTouchMove);
                }, { once: true });
              }}
            >
              <motion.img
                key={selectedPhotoIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                src={photos[selectedPhotoIndex].url}
                alt="Selected photo"
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              {photos.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === selectedPhotoIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 inset-x-0 bg-gray-900/80 backdrop-blur-lg">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex items-center justify-around">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`p-4 rounded-full relative ${
                  activeTab === tab.id
                    ? 'text-white bg-white/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.icon}
                <span className="sr-only">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}