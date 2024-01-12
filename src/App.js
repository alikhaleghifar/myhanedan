import {ToastContainer} from "react-toastify";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./page/home";
import {TrackerTransportation} from "./page/trackerTransportation";
import "react-toastify/dist/ReactToastify.css";
import {TransportPayment} from "./page/transportPayment";
import StepCounter from "./page/stepCounter";
import {PlanReservationCarsList} from "./page/planReservation/planReservationCarsList";
import {PlanReservation} from "./page/planReservation/planReservation";
import {LinesPrice} from "./page/linesPrice";
import {TimeTableStops} from "./page/timeTableStops";
import {Events} from "./page/events";
import {Infoforce} from "./page/infoforce";
import {UsePoints} from "./page/usePoints";
import Login from "./page/login";
import Register from "./page/register";
import ConfirmLogin from "./page/confirmLogin";

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
      <Route path="/StepCounter" element={<StepCounter/>} />
      <Route path="/PlanReservationCarsList" element={<PlanReservationCarsList/>} />
      <Route path="/PlanReservation/:id" element={<PlanReservation/>} />
      <Route path="/LinesPrice" element={<LinesPrice/>} />
      <Route path="/TimeTableStops" element={<TimeTableStops/>} />
      <Route path="/Events" element={<Events/>} />
      <Route path="/Infoforce" element={<Infoforce/>} />
      <Route path="/UsePoints" element={<UsePoints/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/Register" element={<Register/>} />
      <Route path="/ConfirmLogin/:number" element={<ConfirmLogin/>} />
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
