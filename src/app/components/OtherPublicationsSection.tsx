import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import over1 from '@/imports/over1.jpg';
import over2 from '@/imports/over2.jpg';
import over3 from '@/imports/over3.jpg';

export function OtherPublicationsSection() {
  const thumbnails = [
    over1,
    over2,
    over3
  ];

  return (
    <div className="px-3 py-4 bg-[#1e1e1e] mx-3 rounded-[6px] mb-2">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-white leading-snug" style={{ fontSize: '13px' }}>Посмотреть данные других<br />публикаций</h2>
        <div className="flex gap-1.5 flex-shrink-0">
          {thumbnails.map((thumb, index) => (
            <ImageWithFallback
              key={index}
              src={thumb}
              alt={`Thumbnail ${index + 1}`}
              className="w-[28px] h-[32px] object-cover rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
}