import HotelDetailsComponent from "@/components/hotel-details";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

function App() {
  return (
    <>
      <div className=" flex items-center justify-center h-full min-h-dvh w-full">
        {/* <HotelDetailsComponent></HotelDetailsComponent> */}
        {/* <RegisterPage></RegisterPage> */}
        <LoginPage></LoginPage>
      </div>
    </>
  );
}

export default App;
