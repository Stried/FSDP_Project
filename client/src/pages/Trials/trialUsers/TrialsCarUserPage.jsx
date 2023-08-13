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
import Imageone from "./../../../assets/CarouselUserTrialCars/charging.png";
import Imagetwo from "./../../../assets/CarouselUserTrialCars/electric-cars-vehicles-explainer-101.png";
import Imagethree from "./../../../assets/CarouselUserTrialCars/charger.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DefaultImage from "../../../../DefaultImage";
import http from "../../../http";
import { ToastContainer, toast } from "react-toastify";
import { useSpring, animated, config } from "react-spring";
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
      triggerOnce: true,
      threshold: 0.5,
    });
    const FadeInProps = useSpring({
      from: { opacity: 0 },
      to: { opacity: inView ? 1 : 0 },
      config: config.gentle,
    });
    return (
      <animated.div style={FadeInProps} ref={ref}>
        {children}
      </animated.div>
    );
  }

  function AnimatedParagraphSlideLeft({ children }) {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.5,
    });

    const fadeInFromLeftProps = useSpring({
      from: { opacity: 0, transform: "translateX(-100px)" },
      to: {
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-100px)",
      },
      config: config.gentle,
    });

    return (
      <animated.p
        style={fadeInFromLeftProps}
        className="text-white mb-10"
        ref={ref}
      >
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
      to: {
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(100px)",
      },
      config: config.gentle,
    });

    return (
      <animated.p
        style={fadeInFromRightProps}
        className="text-white text-right mb-10"
        ref={ref}
      >
        {children}
      </animated.p>
    );
  }

  return (
    <div className="relative min-h-screen">
      <h1 className="text-center text-5xl text-green-400">
        Trial Car User Page
      </h1>
      <br />
      <div className="carousel-container h-15">
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={5000}
          transitionTime={400}
          dynamicHeight
        >
          <div>
            <DefaultImage
              src={Imageone}
              style={{
                objectFit: "contain",
                height: "450px",
                maxHeight: "450",
              }}
              alt="Carousel Image 1 "
            />
            <a href="#">
              <div className="overlay absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100 bg-black bg-opacity-50">
                <p className="overlay-text text-white text-center text-3xl p-2">
                  The Future of Electronic vehicles
                </p>
              </div>
            </a>
          </div>
          <div>
            <DefaultImage
              src={Imagetwo}
              style={{
                objectFit: "contain",
                height: "450px",
                maxHeight: "450",
              }}
              alt="Carousel Image 2"
            />
            <a href="#">
              <div className="overlay absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100 bg-black bg-opacity-50">
                <p className="overlay-text text-white text-center text-3xl p-2">
                  an In Depth Guide on Electronic Vehicles
                </p>
              </div>
            </a>
          </div>
          <div>
            <DefaultImage
              src={Imagethree}
              style={{
                objectFit: "contain",
                height: "450px",
                maxHeight: "450",
              }}
              alt="Carousel Image 3"
            />

            <a href="#">
              <div className="overlay absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100 bg-black bg-opacity-50">
                <p className="overlay-text text-white text-center text-3xl p-2">
                  Charging Stations
                </p>
              </div>
            </a>
          </div>
        </Carousel>
      </div>
      <br />
      <br />
      <div>
        <h1 className="text-white text-4xl text-center mb-10">
          🌟 Introducing the Future of Driving:{" "}
          <span className="text-green-400">Trial Cars</span> 🚗⚡
        </h1>

        <AnimatedParagraphSlideLeft>
          Are you ready to embark on an{" "}
          <strong className="text-green-400">electrifying</strong> journey into
          the world of cutting-edge transportation? Say goodbye to hesitation
          and <strong className="text-green-400">embrace the future</strong> of
          driving with Trial Cars – your passport to a thrilling, emission-free
          experience like no other!
        </AnimatedParagraphSlideLeft>

        <AnimatedParagraphSlideRight>
          Imagine gliding down the road, powered by{" "}
          <strong className="text-green-400">pure innovation</strong>, in an
          electric car that not only{" "}
          <strong className="text-green-400">reduces</strong> your carbon
          footprint but also revolutionizes the way you perceive driving. We
          understand that stepping into the realm of electric vehicles might
          feel like a leap of faith for some, which is why we've crafted the{" "}
          <strong className="text-green-400">ultimate solution</strong> to make
          you feel at ease.
        </AnimatedParagraphSlideRight>

        <hr />
        <br />
        <AnimatedParagraphSlideLeft>
          🔌 <strong className="text-green-400">Plug Into Convenience</strong>:
          With Trial Cars, we've handpicked a selection of{" "}
          <strong className="text-green-400">top-tier</strong> electric car
          models, each waiting to whisk you away on a captivating test drive.
          The best part? It{" "}
          <strong className="text-green-400">won't cost you a dime!</strong>{" "}
          Simply browse through our lineup of exceptional electric vehicles,
          choose the one that resonates with your style, and reserve your
          exclusive 2-hour test drive.
        </AnimatedParagraphSlideLeft>

        <AnimatedParagraphSlideRight>
          🕐{" "}
          <strong className="text-green-400">
            Time Flies When You're Electrified
          </strong>
          : We value your time just as much as you do. Your trial period is a
          strictly{" "}
          <strong className="text-green-400">tantalizing 2 hours</strong> of
          unadulterated electric driving bliss. So, buckle up, press that pedal,
          and relish every moment as you glide through the cityscape or cruise
          along the countryside. No extensions, no strings attached – just two
          hours of <strong className="text-green-400">pure exhilaration</strong>
          .
        </AnimatedParagraphSlideRight>

        <AnimatedParagraphSlideLeft>
          🔄 <strong className="text-green-400">Seamless Flexibility</strong>:
          Life is unpredictable, and we get that. If your plans change, don't
          sweat it. Our trusty chatbot is at your service.{" "}
          <strong className="text-green-400">Simply send a message</strong> to
          our admin and voilà, your reservation is canceled. We're here to make
          your experience as smooth as possible, from start to finish.
        </AnimatedParagraphSlideLeft>

        <AnimatedParagraphSlideRight>
          🚫{" "}
          <strong className="text-green-400">
            Missed the Moment? Don't Worry
          </strong>
          : We believe in{" "}
          <strong className="text-green-400">second chances!</strong> If you
          happen to miss your reservation, don't despair. Another{" "}
          <strong className="text-green-400">opportunity</strong> is just around
          the corner. Secure your spot once more and get ready to embark on your
          electric escapade.
        </AnimatedParagraphSlideRight>
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
                    <DefaultImage
                      className="object-cover h-48 w-96"
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
      <br></br>
      <ToastContainer />
    </div>
  );
};

export default App;
