import { Info, Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { InfoIcon } from '@/app/components/InfoIcon';
import { useState, useRef } from 'react';
import playIcon from 'figma:asset/d877f25f9c8cae23cec8dae0b7d775c94661604a.png';
import previewImage from '../../imports/preview.jpg';

export function LikesAnalysisSection() {
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 28; // Фиксированная длительность
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      const newTime = percentage * duration;
      setCurrentTime(newTime);
    }
  };

  const handleSliderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleSliderClick(e);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        const clickX = Math.max(0, Math.min(moveEvent.clientX - rect.left, rect.width));
        const percentage = clickX / rect.width;
        const newTime = percentage * duration;
        setCurrentTime(newTime);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const likesPercentage = duration > 0 ? Math.max(67 - Math.floor((currentTime / duration) * 67), 0) : 67;

  // Функция для вычисления Y координаты на графике лайков
  const getRetentionY = (progress: number) => {
    // График постепенно падает начиная с 11 секунды (39%)
    const points = [
      { x: 0, y: 10 },      // Начало - высокий уровень (80%)
      { x: 30, y: 15 },     // Небольшое снижение до 11 секунды
      { x: 39, y: 20 },     // 11 секунд (39%) - начало заметного падения
      { x: 50, y: 45 },     // Постепенное падение
      { x: 65, y: 70 },     // Продолжает падать
      { x: 80, y: 88 },     // Приближается к низу
      { x: 100, y: 100 }    // Достигает нижнего уровня
    ];

    // Найти две ближайшие точки для интерполяции
    for (let i = 0; i < points.length - 1; i++) {
      if (progress >= points[i].x && progress <= points[i + 1].x) {
        const t = (progress - points[i].x) / (points[i + 1].x - points[i].x);
        return points[i].y + t * (points[i + 1].y - points[i].y);
      }
    }
    return 100; // По умолчанию последнее значение (0%)
  };

  const dotX = progressPercentage;
  const dotY = getRetentionY(progressPercentage);

  return (
    <div className="px-3 py-6 bg-[#1e1e1e] mx-3 rounded-[6px] mb-6">
      <div className="flex items-center gap-0.5 mb-2">
        <h2 className="text-white text-[17px] font-bold" style={{ fontFamily: 'TikTok Sans, sans-serif' }}>Лайки</h2>
        <InfoIcon />
      </div>

      <p className="text-neutral-400 text-[14px] mb-4">
        Большинство зрителей поставили лайк этому видео на отметке 0:11. Узнайте, какой момент понравился зрителям.
      </p>

      {/* Video Preview */}
      <div className="relative mb-6">
        <div className="relative w-full max-w-[155px] mx-auto aspect-[11/16]">
          <img
            src={previewImage}
            alt="Video preview"
            className="w-full h-full object-cover rounded-[5px]"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={playIcon} alt="Play" className="w-[30px] h-[30px]" />
          </div>
        </div>
      </div>

      {/* Retention Chart */}
      <div className="relative max-w-[320px] mx-auto">
        <div className="relative h-16 mb-4 flex items-stretch">
          {/* Graph container */}
          <div className="relative flex-1">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="overflow-visible">
              <defs>
                {/* Gradient for the area fill */}
                <linearGradient id="likesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#5eb3f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#5eb3f6" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid lines - равномерное расстояние: 80%, 60%, 40%, 20% (пунктирные) */}
              <line x1="0" y1="0" x2="100" y2="0" stroke="#4c4c4c" strokeDasharray="3 3" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1="25" x2="100" y2="25" stroke="#4c4c4c" strokeDasharray="3 3" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#4c4c4c" strokeDasharray="3 3" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
              <line x1="0" y1="75" x2="100" y2="75" stroke="#4c4c4c" strokeDasharray="3 3" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />

              {/* 0% линия - сплошная */}
              <line x1="0" y1="100" x2="100" y2="100" stroke="#4c4c4c" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />

              {/* Gradient fill area under the likes line */}
              <path
                d="M 0,10 L 30,15 L 39,20 L 50,45 L 65,70 L 80,88 L 100,100 L 100,100 L 0,100 Z"
                fill="url(#likesGradient)"
              />

              {/* Likes line - постепенное падение начиная с 11 секунды */}
              <polyline
                points="0,10 30,15 39,20 50,45 65,70 80,88 100,100"
                fill="none"
                stroke="#5eb3f6"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Vertical line indicator at current position */}
            <div
              className="absolute w-px"
              style={{
                left: `${dotX}%`,
                top: '0%',
                height: '100%',
                backgroundColor: '#5eb3f6'
              }}
            />

            {/* Current position dot */}
            <div
              className="absolute w-2.5 h-2.5 rounded-full border-2 border-[#5eb3f6]"
              style={{
                left: `${dotX}%`,
                top: `${dotY}%`,
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#ffffff'
              }}
            />
          </div>

          {/* Percentage labels - on the RIGHT side aligned with grid lines */}
          <div className="relative pl-1.5" style={{ width: '32px' }}>
            <span className="absolute text-xs text-neutral-500 leading-none" style={{ top: '0%', transform: 'translateY(-50%)' }}>80%</span>
            <span className="absolute text-xs text-neutral-500 leading-none" style={{ top: '25%', transform: 'translateY(-50%)' }}>60%</span>
            <span className="absolute text-xs text-neutral-500 leading-none" style={{ top: '50%', transform: 'translateY(-50%)' }}>40%</span>
            <span className="absolute text-xs text-neutral-500 leading-none" style={{ top: '75%', transform: 'translateY(-50%)' }}>20%</span>
          </div>
        </div>

        {/* Timeline Slider */}
        <div className="relative mt-3 flex items-stretch">
          <div className="flex-1">
            <div
              ref={sliderRef}
              className="relative h-1 bg-[#666666] rounded-full cursor-pointer"
              onClick={handleSliderClick}
            >
              <div
                className="absolute left-0 top-0 h-full bg-white rounded-full pointer-events-none"
                style={{ width: `${progressPercentage}%` }}
              ></div>
              <div
                className="absolute top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full shadow-lg cursor-grab active:cursor-grabbing"
                style={{ left: `${progressPercentage}%`, marginLeft: '-14px' }}
                onMouseDown={handleSliderMouseDown}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-3">
              <span className="text-neutral-400">{formatTime(currentTime)} ({likesPercentage}%)</span>
              <span className="text-neutral-400">{formatTime(duration)}</span>
            </div>
          </div>
          {/* Spacer to match percentage labels width */}
          <div style={{ width: '32px' }} className="pl-1.5"></div>
        </div>
      </div>
    </div>
  );
}
