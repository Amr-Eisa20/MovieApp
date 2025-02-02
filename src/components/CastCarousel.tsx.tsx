"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";

interface CastMember {
  id: number;
  name: string;
  character: string;
  image: string;
}

interface CastCarouselProps {
  credits: CastMember[];
}

export default function CastCarousel({ credits }: CastCarouselProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <Swiper
        modules={[Scrollbar]}
        scrollbar={{ hide: false, draggable: true }}
        spaceBetween={16}
        slidesPerView="auto"
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {credits.slice(0, 10).map((credit) => (
          <SwiperSlide key={credit.id}>
            <div className="w-36 sm:w-44 text-center bg-white rounded-lg shadow-md border border-gray-200 p-3">
              <img
                src={credit.image}
                alt={credit.name}
                className="w-full h-40 sm:h-48 object-cover rounded-md"
              />
              <p className="font-semibold mt-2 text-sm">{credit.name}</p>
              <p className="text-gray-500 text-xs">{credit.character}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
