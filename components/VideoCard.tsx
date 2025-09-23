import React from "react";

const VideoCard = () => {
  return (
    <div>
      <video
        src="/assets/FACT COMERCIAL .mp4" // put your video file inside /public/videos/
        className="w-full h-96 md:h-[500px] object-cover rounded-lg shadow-2xl transition-all duration-700 hover:shadow-3xl"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
};

export default VideoCard;
