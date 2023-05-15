import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./routes/Login";
import { Home } from "./pages/Home";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { ListTickets } from "./routes/ListTickets";
import { ListSectors } from "./routes/ListSectors";
import { ListUsers } from "./routes/ListUsers";
import { CreateTicket } from "./routes/CreateTicket";
import { CreateSector } from "./routes/CreateSector";
import { CreateStatus } from "./routes/CreateStatus";
import { CreateEquipment } from "./routes/CreateEquipment";
import { CreateUser } from "./routes/CreateUser";
import { DetailTicket } from "./routes/DetailTicket";
import { DetailEquipment } from "./routes/DetailEquipment";
import { CreateEquipmentType } from "./routes/CreateEquipmentType";
import { CreateTicketHistory } from "./routes/CreateTicketHistory";
import { ListEquipments } from "./routes/ListEquipments";
import { ListEquipmentsType } from "./routes/ListEquipmentsType";
import { DetailUser } from "./routes/DetailUser";
import { DetailEquipmentType } from "./routes/DetailEquipmentType";
import { ListStatuses } from "./routes/ListStatuses";
import { DetailStatus } from "./routes/DetailStatus";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthenticationProvider } from "./provider/AuthenticationProvider";
import { UpdateSector } from "./routes/UpdateSector";

function App() {
  return (
    <AuthenticationProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />
        <ToastContainer />
        <main className="flex flex-1 overflow-y-scroll no-scrollbar p-4">
          <BrowserRouter>
            <Routes>
              <Route path="" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/ticket/new" element={<CreateTicket />} />
              <Route path="/ticket" element={<ListTickets />} />
              <Route path="/ticket/:id" element={<DetailTicket />} />
              <Route
                path="/ticket/ticketHistory/:id"
                element={<CreateTicketHistory />}
              />
              <Route path="/sector/new" element={<CreateSector />} />
              <Route path="/sectors" element={<ListSectors />} />
              <Route path="/sector/update/:id" element={<UpdateSector />} />
              <Route path="/status/new" element={<CreateStatus />} />
              <Route path="/status/:id" element={<DetailStatus />} />
              <Route path="/statuses" element={<ListStatuses />} />
              <Route path="/equipment/new" element={<CreateEquipment />} />
              <Route path="/equipment/:id" element={<DetailEquipment />} />
              <Route path="/equipments" element={<ListEquipments />} />
              <Route path="/users" element={<ListUsers />} />
              <Route path="/user/:id" element={<DetailUser />} />
              <Route path="/user/new" element={<CreateUser />} />
              <Route path="/equipments_type" element={<ListEquipmentsType />} />
              <Route
                path="/equipment_type/:id"
                element={<DetailEquipmentType />}
              />
              <Route
                path="/equipment_type/new"
                element={<CreateEquipmentType />}
              />
            </Routes>
          </BrowserRouter>
        </main>
        <Footer />
      </div>
    </AuthenticationProvider>
  );
}

export default App;
