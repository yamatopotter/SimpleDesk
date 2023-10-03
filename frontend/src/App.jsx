import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazyLoad } from "./lazyLoad";
const Login = lazyLoad("./routes/Login", "Login");
const Home = lazyLoad("./routes/Home", "Home");
const Header = lazyLoad("./components/Header/Header", "Header");
const About = lazyLoad("./routes/About", "About");
const ListSectors = lazyLoad("./routes/List/ListSectors", "ListSectors");
const ListUsers = lazyLoad("./routes/List/ListUsers", "ListUsers");
const ListEquipments = lazyLoad("./routes/List/ListEquipments", "ListEquipments");
const CreateTicket = lazyLoad("./routes/Create/CreateTicket", "CreateTicket");
const CreateSector = lazyLoad("./routes/Create/CreateSector", "CreateSector");
const CreateStatus = lazyLoad("./routes/Create/CreateStatus", "CreateStatus");
const CreateEquipment = lazyLoad(
  "./routes/Create/CreateEquipment",
  "CreateEquipment"
);
const CreateUser = lazyLoad("./routes/Create/CreateUser", "CreateUser");
const CreateEquipmentType = lazyLoad(
  "./routes/Create/CreateEquipmentType",
  "CreateEquipmentType"
);
const CreateTicketHistory = lazyLoad(
  "./routes/Create/CreateTicketHistory",
  "CreateTicketHistory"
);
const DetailTicket = lazyLoad("./routes/Detail/DetailTicket", "DetailTicket");
const DetailEquipment = lazyLoad(
  "./routes/Detail/DetailEquipment",
  "DetailEquipment"
);
import { ListEquipments } from "./routes/List/ListEquipments";
import { ListEquipmentsType } from "./routes/List/ListEquipmentsType";
import { DetailUser } from "./routes/Detail/DetailUser";
import { DetailEquipmentType } from "./routes/Detail/DetailEquipmentType";
import { ListStatuses } from "./routes/List/ListStatuses";
import { DetailStatus } from "./routes/Detail/DetailStatus";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthenticationProvider } from "./provider/AuthenticationProvider";
import { UpdateSector } from "./routes/Update/UpdateSector";
import { UpdateStatus } from "./routes/Update/UpdateStatus";
import { UpdateEquipment } from "./routes/Update/UpdateEquipment";
import { UpdateEquipmentType } from "./routes/Update/UpdateEquipmentType";
import { UpdateUser } from "./routes/Update/UpdateUser";
import { UpdatePassword } from "./routes/Update/UpdatePassword";
import { ListTickets } from "./routes/List/ListTickets";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Suspense, lazy } from "react";

function App() {
  return (
    <AuthenticationProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <ToastContainer />
        <Suspense>
          <BrowserRouter>
            <Routes>
              <Route path="" element={<Header />}>
                <Route path="" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
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
                <Route path="/user/update/:id" element={<UpdateUser />} />
                <Route
                  path="/user/new"
                  element={
                    <ProtectedRoute>
                      <CreateUser />
                    </ProtectedRoute>
                  }
                />
                <Route path="/user/password/:id" element={<UpdatePassword />} />
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
        </Suspense>
      </div>
    </AuthenticationProvider>
  );
}

export default App;
