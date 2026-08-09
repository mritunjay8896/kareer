import React from 'react';
import jobForAllImg from '../../image1/jobforall.png';

export const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full flex items-center justify-center lg:justify-end py-2">
      {/* Main Image Container without frame background or borders */}
      <div className="relative w-full max-w-md lg:max-w-[460px] xl:max-w-[520px] group transition-all duration-500">
        <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl">
          <img
            src={jobForAllImg}
            alt="Glitread Career Hub - Jobs For All"
            className="w-full h-auto object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
      </div>
    </div>
  );
};

