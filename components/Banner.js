import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
function Banner() {
   return (
      <div className="relative">
         <Carousel
            autoPlay
            infiniteLoop
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={2000}>
            <div>
               <img
                  loading="lazy"
                  src="https://firebasestorage.googleapis.com/v0/b/elearn-ivory.appspot.com/o/images%2Fcharacters-from-garena-free-fire_3840x2160_xtrafondos.com%20(1).jpg?alt=media&token=bc02b7e6-6545-4149-9743-edfe5c92051a"
               />
            </div>
            <div>
               <img
                  loading="lazy"
                  src="https://firebasestorage.googleapis.com/v0/b/elearn-ivory.appspot.com/o/images%2Fimg1jpg.jpg?alt=media&token=05dcf82f-6c43-4201-9897-270a385632c3"
               />
            </div>
            <div>
               <img
                  loading="lazy"
                  src="https://firebasestorage.googleapis.com/v0/b/elearn-ivory.appspot.com/o/images%2Fwallpapertip_fire-wallpaper_57141.jpg?alt=media&token=13744c34-9d7b-4713-9f28-8e7a40a5bbad"
               />
            </div>
         </Carousel>
      </div>
   );
}

export default Banner;
