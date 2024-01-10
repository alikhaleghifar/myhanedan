import {ToastContainer} from "react-toastify";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./page/home";
import {TrackerTransportation} from "./page/trackerTransportation";
import "react-toastify/dist/ReactToastify.css";
import {TransportPayment} from "./page/transportPayment";
// import 'leaflet/dist/leaflet.css';
function App() {
  return (
<>

  <ToastContainer />
  <BrowserRouter>
    <Routes>
      {/*<Route path='*' element={<Page404 />} />*/}
      <Route path="/" element={<Home/>} />
      <Route path="/TrackerTransportation" element={<TrackerTransportation/>} />
      <Route path="/TransportPayment" element={<TransportPayment/>} />
      {/*<Route path="/calculator" element={<Calculator/>} />*/}
      {/*<Route path="/calculatorHome" element={<CalculatorHome/>} />*/}
      {/*<Route path="/calculatorCar" element={<CalculatorCar/>} />*/}
      {/*<Route path="/calculatorPublicTransport" element={<CalculatorPublicTransport/>} />*/}
      {/*<Route path="/calculatorMotorBike" element={<CalculatorMotorBike/>} />*/}
      {/*<Route path="/calculatorResult" element={<CalculatorResult/>} />*/}
      {/*<Route path="/calculatorPayment" element={<CalculatorPayment/>} />*/}
      {/*<Route path="/ClimateChange" element={<ClimateChange/>} />*/}
      {/*<Route path="/Deforestation" element={<Deforestation/>} />*/}
      {/*<Route path="/DevelopmentGoals" element={<DevelopmentGoals/>} />*/}
      {/*<Route path="/Reduce" element={<Reduce/>} />*/}
      {/*<Route path="/info" element={<Info/>} />*/}
    </Routes>
  </BrowserRouter>

</>
  );
}

export default App;
