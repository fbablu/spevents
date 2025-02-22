import { PhotoSlideshow } from "../components";
import SlideshowQRCode from "./SlideshowQRCode";

export default function SlideshowPage() {
  return (
    <div className="relative h-screen">
      <PhotoSlideshow />

      {/* QR Code moved to top right */}
      <div className="absolute top-5 right-16 z-50">
        <SlideshowQRCode />
      </div>
    </div>
  );
}
