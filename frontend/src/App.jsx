import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthenticationProvider } from "./provider/AuthenticationProvider";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Header } from "./components/Header/Header";
import { Login } from "./routes/Login";
import { Home } from "./routes/Home";
import { About } from "./routes/About";
import { AboutSystem } from "./pages/AboutSystem";
import { ListTickets } from "./routes/List/ListTickets";
import { CreateTicket } from "./routes/Create/CreateTicket";
import { DetailTicket } from "./routes/Detail/DetailTicket";
import { CreateTicketHistory } from "./routes/Create/CreateTicketHistory";
import { CreateSector } from "./routes/Create/CreateSector";
import { ListSectors } from "./routes/List/ListSectors";
import { UpdateSector } from "./routes/Update/UpdateSector";
import { CreateStatus } from "./routes/Create/CreateStatus";
import { DetailStatus } from "./routes/Detail/DetailStatus";
import { UpdateStatus } from "./routes/Update/UpdateStatus";
import { ListStatuses } from "./routes/List/ListStatuses";
import { CreateEquipment } from "./routes/Create/CreateEquipment";
import { DetailEquipment } from "./routes/Detail/DetailEquipment";
import { UpdateEquipment } from "./routes/Update/UpdateEquipment";
import { ListEquipments } from "./routes/List/ListEquipments";
import { ListUsers } from "./routes/List/ListUsers";
import { DetailUser } from "./routes/Detail/DetailUser";
import { UpdateUser } from "./routes/Update/UpdateUser";
import { CreateUser } from "./routes/Create/CreateUser";
import { UpdatePassword } from "./routes/Update/UpdatePassword";
import { ListEquipmentsType } from "./routes/List/ListEquipmentsType";
import { DetailEquipmentType } from "./routes/Detail/DetailEquipmentType";
import { CreateEquipmentType } from "./routes/Create/CreateEquipmentType";
import { UpdateEquipmentType } from "./routes/Update/UpdateEquipmentType";

function App() {
  return (
    <AuthenticationProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <ToastContainer />
          <BrowserRouter>
            <Routes>
              <Route path="" element={<Header />}>
                <Route path="" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/about/system" element={<AboutSystem />} />
                {/* Ticket */}
                <Route path="/ticket" element={<ListTickets />} />
                <Route path="/ticket/new" element={<CreateTicket />} />
                <Route path="/ticket/:id" element={<DetailTicket />} />
                <Route
                  path="/ticket/ticket_history/:id"
                  element={<CreateTicketHistory />}
                />
                {/* Sector */}
                <Route
                  path="/sector/new"
                  element={
                    <ProtectedRoute>
                      <CreateSector />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/sector"
                  element={
                    <ProtectedRoute>
                      <ListSectors />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/sector/update/:id"
                  element={
                    <ProtectedRoute>
                      <UpdateSector />
                    </ProtectedRoute>
                  }
                />
                {/* Status */}
                <Route
                  path="/status/new"
                  element={
                    <ProtectedRoute>
                      <CreateStatus />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/status/:id"
                  element={
                    <ProtectedRoute>
                      <DetailStatus />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/status/update/:id"
                  element={
                    <ProtectedRoute>
                      <UpdateStatus />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/status"
                  element={
                    <ProtectedRoute>
                      <ListStatuses />
                    </ProtectedRoute>
                  }
                />
                {/* Equipment */}
                <Route
                  path="/equipment/new"
                  element={
                    <ProtectedRoute>
                      <CreateEquipment />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/equipment/:id"
                  element={
                    <ProtectedRoute>
                      <DetailEquipment />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/equipment/update/:id"
                  element={
                    <ProtectedRoute>
                      <UpdateEquipment />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/equipment"
                  element={
                    <ProtectedRoute>
                      <ListEquipments />
                    </ProtectedRoute>
                  }
                />
                {/* User */}
                <Route
                  path="/user"
                  element={
                    <ProtectedRoute>
                      <ListUsers />
                    </ProtectedRoute>
                  }
                />
                <Route path="/user/detail/:id" element={<DetailUser />} />
                <Route path="/user/update" element={<UpdateUser />} />
                <Route
                  path="/user/update/:id"
                  element={
                    <ProtectedRoute>
                      <UpdateUser />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/user/new"
                  element={
                    <ProtectedRoute>
                      <CreateUser />
                    </ProtectedRoute>
                  }
                />
                <Route path="/user/password" element={<UpdatePassword />} />
                <Route
                  path="/user/password/:id"
                  element={
                    <ProtectedRoute>
                      <UpdatePassword />
                    </ProtectedRoute>
                  }
                />
                {/* Equipment Type */}
                <Route
                  path="/equipment_type"
                  element={
                    <ProtectedRoute>
                      <ListEquipmentsType />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/equipment_type/:id"
                  element={
                    <ProtectedRoute>
                      <DetailEquipmentType />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/equipment_type/new"
                  element={
                    <ProtectedRoute>
                      <CreateEquipmentType />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/equipment_type/update/:id"
                  element={
                    <ProtectedRoute>
                      <UpdateEquipmentType />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
      </div>
    </AuthenticationProvider>
  );
}

export default App;
