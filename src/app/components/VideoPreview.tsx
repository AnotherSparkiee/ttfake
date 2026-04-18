import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import thumbnailImage from '../../imports/preview.jpg';

export function VideoPreview() {
  return (
    <div className="px-4 py-4 flex flex-col items-center">
      <div className="relative">
        <img
          src={thumbnailImage}
          alt="Video thumbnail"
          className="w-[77px] h-[104px] object-cover rounded-md"
        />
        <div className="absolute bottom-1 left-0 right-0 text-center">
          <span className="text-white text-sm font-medium drop-shadow-md">
            38.01 с.
          </span>
        </div>
      </div>
      <p className="text-sm mt-3" style={{ color: '#e0e0e0', fontSize: '13px' }}>
        Опубликовано 5 апр 2026, 18:33
      </p>
    </div>
  );
}