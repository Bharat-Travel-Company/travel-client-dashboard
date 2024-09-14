// import HotelDetailsComponent from "@/components/hotel-details";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <div className=" flex items-center justify-center h-full min-h-dvh">
        {/* <HotelDetailsComponent></HotelDetailsComponent> */}
        <Register/>
        <Login/>
      </div>
    </>
  );
}

export default App;
