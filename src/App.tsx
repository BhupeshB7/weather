import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout";
import { ThemeProvider } from "./context/theme-provider";
import WeatherDashboard from "./pages/WeatherDashboard";
import CityPage from "./pages/CityPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <Layout>
            <Routes>
              <Route path="/" element={<WeatherDashboard />} />
              <Route path="/city/:cityName" element={<CityPage />} />
              <Route
                path="*"
                element={
                  <div className="text-center text-3xl text-red-400 font-bold">
                    404
                  </div>
                }
              />
            </Routes>
          </Layout>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
