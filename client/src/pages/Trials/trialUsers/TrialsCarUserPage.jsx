import { Box, IconButton } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import * as React from "react";
("use client");
import DefaultImage from '../../../../DefaultImage';
import http from "../../../http";
import { ToastContainer, toast } from "react-toastify";
import { useSpring, animated, config } from 'react-spring';
import { useInView } from "react-intersection-observer";
const App = () => {
  const [trialCarList, setTrialCarList] = useState([]);
  const getTrialCar = () => {
    http.get("/trials/viewTrialCar").then((res) => {
      setTrialCarList(res.data);
    });
  };

  useEffect(() => {
    getTrialCar();
  }, []);

  const fadeInProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  const [search, setSearch] = useState("");
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const searchTrialCar = () => {
    http.get(`/trials/userview/viewTrialCar?search=${search}`).then((res) => {
      setTrialCarList(res.data);
    });
  };
  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      searchTrialCar();
    }
  };

  const onClickSearch = () => {
    searchTrialCar();
  };
  const onClickClear = () => {
    setSearch("");
    getTrialCar();
  };

  function AnimatedFadeIn({ children }) {
    const [ref, inView] = useInView({
      triggerOnce:true,
      threshold:0.5,
    });
    const FadeInProps=useSpring({
      from:{opacity:0},
      to: {opacity: inView ? 1:0},
      config: config.gentle,
    });
return(
  <animated.div style={FadeInProps} ref={ref}>
    {children}
  </animated.div>
)
  }

  function AnimatedParagraphSlideLeft({ children }) {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.5,
    });
  
    const fadeInFromLeftProps = useSpring({
      from: { opacity: 0, transform: "translateX(-100px)" },
      to: { opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-100px)" },
      config: config.gentle,
    });
  
    return (
      <animated.p style={fadeInFromLeftProps} className="text-white" ref={ref}>
        {children}
      </animated.p>
    );
  }
  
  function AnimatedParagraphSlideRight({ children }) {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.5,
    });
  
    const fadeInFromRightProps = useSpring({
      from: { opacity: 0, transform: "translateX(100px)" },
      to: { opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(100px)" },
      config: config.gentle, 
    });
  
    return (
      <animated.p style={fadeInFromRightProps} className="text-white text-right" ref={ref}>
        {children}
      </animated.p>
    );
  }
  

  return (
    <div className="relative min-h-screen">
      <h1 className="text-center text-5xl text-green-400">
        Trial Car User Page
      </h1>

      <div id="default-carousel" class="relative w-full" data-carousel="slide">

    <div class="relative h-56 overflow-hidden rounded-lg md:h-96">

        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <i src="client\src\assets\CarouselUserTrialCars\electric-cars-vehicles-explainer-101.png" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>

        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <i src="charging.png" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>

        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="1648435670128.png" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>

    </div>

    <div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
    </div>

    <button type="button" class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span class="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="sr-only">Next</span>
        </span>
    </button>
</div>
<br />
<br />
<div>
<h1 className="text-white text-center">🌟 Introducing the Future of Driving: Trial Cars 🚗⚡</h1>
<br />
<br />
<AnimatedParagraphSlideLeft className="text-white" >
Are you ready to embark on an electrifying journey into the world of cutting-edge transportation? Say goodbye to hesitation and embrace the future of driving with Trial Cars – your passport to a thrilling, emission-free experience like no other!
</AnimatedParagraphSlideLeft>
<br />
<br />
<AnimatedParagraphSlideRight className="text-white text-right" >
Imagine gliding down the road, powered by pure innovation, in an electric car that not only reduces your carbon footprint but also revolutionizes the way you perceive driving. We understand that stepping into the realm of electric vehicles might feel like a leap of faith for some, which is why we've crafted the ultimate solution to make you feel at ease.
</AnimatedParagraphSlideRight>
<br />
<br />

<AnimatedParagraphSlideLeft className="text-white" >
🔌 Plug Into Convenience: With Trial Cars, we've handpicked a selection of top-tier electric car models, each waiting to whisk you away on a captivating test drive. The best part? It won't cost you a dime! Simply browse through our lineup of exceptional electric vehicles, choose the one that resonates with your style, and reserve your exclusive 2-hour test drive.
</AnimatedParagraphSlideLeft>
<br />
<br />

<AnimatedParagraphSlideRight className="text-white" >
🕐 Time Flies When You're Electrified: We value your time just as much as you do. Your trial period is a strictly tantalizing 2 hours of unadulterated electric driving bliss. So, buckle up, press that pedal, and relish every moment as you glide through the cityscape or cruise along the countryside. No extensions, no strings attached – just two hours of pure exhilaration.
</AnimatedParagraphSlideRight>
<br />
<br />

<AnimatedParagraphSlideLeft className="text-white" >
🔄 Seamless Flexibility: Life is unpredictable, and we get that. If your plans change, don't sweat it. Our trusty chatbot is at your service. Simply send a message to our admin and voilà, your reservation is canceled. We're here to make your experience as smooth as possible, from start to finish.
</AnimatedParagraphSlideLeft>
<br />
<br />
<AnimatedParagraphSlideRight className="text-white">
🚫 Missed the Moment? Don't Worry: We believe in second chances! If you happen to miss your reservation, don't despair. Another opportunity is just around the corner. Secure your spot once more and get ready to embark on your electric escapade.
</AnimatedParagraphSlideRight>
<br />
<br />
<AnimatedParagraphSlideLeft className="text-white">
Join us in embracing the future of driving, one electrifying adventure at a time. Whether you're a veteran electric car enthusiast or taking your first exhilarating leap into the world of emission-free driving, Trial Cars are here to make your transition seamless, your experience unforgettable, and your impact on the planet undeniable.
</AnimatedParagraphSlideLeft>
<br />
<br />
<p className="text-white text-center">
Reserve your 2-hour electrifying journey today and let's ignite a new era of driving together! 🌟⚡🚀
</p>
<br />
<img src="./charging.png" class="absolute block w-full top-1/2 left-1/2" alt="..."/>
<br />
<br />
</div>
      <Box>
        <div className="dark:text-white text-black text-lg font-medium mx-4">
          <input
            value={search}
            placeholder="Search"
            className="text-white bg-transparent px-2 mr-3"
            onChange={onSearchChange}
            onKeyDown={onSearchKeyDown}
          />
          <IconButton
            color=""
            className="dark:text-green-500 text-sky-400"
            onClick={onClickSearch}
          >
            <Search />
          </IconButton>
          <IconButton
            color=""
            className="dark:text-green-500 text-sky-400"
            onClick={onClickClear}
          >
            <Clear />
          </IconButton>
        </div>
      </Box>
      <br></br>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-7 ml-16">
        <div class="flex flex-wrap w-100 h-100">
          {trialCarList.map((trialCar, i) => {
            return (
              <AnimatedFadeIn key={i} className="p-5 w-96">
                <div class="p-5 w-96">
                  <div class="max-w-sm bg-white border  transition duration-300  border-gray-200 rounded-md dark:bg-gray-800 hover:shadow-green-500 shadow-3xl ease-out dark:border-gray-700">

                    <DefaultImage className="object-contain h-48 w-96"
                      src={`${import.meta.env.VITE_FILE_BASE_URL_STORE}${
                        trialCar.carImageFile
                      }`}
                      
                    />

                    <div class="p-5">
                      <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          Model: {trialCar.name}
                        </h5>
                      </a>
                      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Brand: {trialCar.carBrand}
                        <br />
                        Address: {trialCar.address}
                      </p>
                      
                      <Link
                        to={`/Trials/trialUsers/TrialsReceiptCreation/${trialCar.carPlateNo}`}
                        className="bg-green-400 p-2 px-5 rounded-md text-black hover:bg-green-600 hover:text-white "
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedFadeIn>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
