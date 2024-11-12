import {
  Card,
  CardContent,
  CardHeader,
  CardTitle, 
} from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiDirectionUp,
  WiDirectionDown,
} from "react-icons/wi";
import { WeatherData } from "@/api/types";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/theme-provider";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: string;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // Simulating loading time
    return () => clearTimeout(timer);
  }, []);

  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
  } = data;

  const themeStyles =
    theme === "dark"
      ? "bg-gradient-to-br from-gray-800 to-blue-900"
      : "bg-gradient-to-br from-blue-200 to-blue-500";

  const tempMinColor = temp_min < 30 ? "text-red-500" : "text-blue-500";
  const tempMaxColor = temp_max > 30 ? "text-red-500" : "text-blue-500";

  return (
    <motion.div
      className={`w-full max-w-md mx-auto mt-6 ${themeStyles} p-6 rounded-lg shadow-xl`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="text-center">
          {isLoading ? (
            <div className="animate-pulse h-6 bg-gray-300 rounded-md w-3/4 mx-auto"></div>
          ) : (
            <>
              <CardTitle className="text-3xl font-bold tracking-wider locationName">
                {locationName || data.name}
              </CardTitle> 
            </>
          )}
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 pt-4 ">
          {isLoading ? (
            Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse h-6 bg-gray-300 rounded-md"
              ></div>
            ))
          ) : (
            <>
              {/* Temperature Min */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.1 }}
                className={`flex items-center gap-1 ${tempMinColor}`}
              >
                <motion.div
                  whileHover={{ rotate: -15, scale: 1.3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <WiDirectionDown size={24} />
                </motion.div>
                <span className="text-xl">{Math.round(temp_min)}°C</span>
              </motion.div>

              {/* Temperature Max */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.1 }}
                className={`flex items-center gap-1 ${tempMaxColor}`}
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <WiDirectionUp size={24} />
                </motion.div>
                <span className="text-xl">{Math.round(temp_max)}°C</span>
              </motion.div>

              {/* Feels Like */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2"
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <WiThermometer
                    size={32}
                    className={` ${
                      theme === "dark" ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                </motion.div>
                <span className="text-sm ">
                  <strong className="opacity-70 text-blue-500"> Feels Like: </strong>
                  <b
                    className={`text-2xl ${
                      theme === "dark" ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    {Math.round(feels_like)}°C
                  </b>{" "}
                </span>
              </motion.div>

              {/* Humidity */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2"
              >
                <motion.div
                  whileHover={{ rotate: -15, scale: 1.3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <WiHumidity size={32} />
                </motion.div>
                <span className="text-sm ">
                  <strong className="opacity-70"> Humidity </strong>
                  <b className="text-2xl">{humidity}%</b>{" "}
                </span>
              </motion.div>

              {/* Wind Speed */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2"
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <WiStrongWind size={32}  className={` ${
                      theme === "dark" ? "text-amber-200" : "text-amber-600"
                    }`}/>
                </motion.div>
                <span className="text-sm ">
                  <strong className="opacity-70 text-amber-600"> Wind: </strong>
                  <b
                    className={`text-2xl ${
                      theme === "dark" ? "text-amber-200" : "text-amber-600"
                    }`}
                  >
                    {speed} m/s
                  </b>{" "}
                </span> 
              </motion.div>

              {/* Current Temperature */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2"
              >
                <motion.div
                  whileHover={{ rotate: -15, scale: 1.3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <WiThermometer size={32} className={` ${
                      theme === "dark" ? "text-amber-200" : "text-amber-600"
                    }`}/>
                </motion.div>
                <span className="text-sm ">
                  <strong className="opacity-70 text-amber-600"> Current Temp: </strong>
                  <b
                    className={`text-3xl ${
                      theme === "dark" ? "text-amber-200" : "text-amber-600"
                    }`}
                  >
                    {Math.round(temp)}°C
                  </b>{" "}
                </span>  
              </motion.div>

              {/* Pressure */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2"
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <WiThermometer size={32} className={` ${
                      theme === "dark" ? "text-green-300" : "text-green-600"
                    }`}/>
                </motion.div>
                <span className="text-sm ">
                  <strong className="opacity-70 text-green-600"> Pressure: </strong>
                  <b
                    className={`text-xl ${
                      theme === "dark" ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    {pressure} hPa
                  </b>{" "}
                </span> 
              </motion.div>
            </>
          )}
          
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="h-full w-full object-contain"
              />
              <div className="absolute bottom-0 text-center">
                <p className="text-sm font-medium capitalize">
                  {currentWeather.description}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CurrentWeather;
