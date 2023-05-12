import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./routes/Login";
import { Home } from "./pages/Home";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { ListTickets } from "./routes/ListTickets";
import { ListSectors } from "./routes/ListSectors";
import { CreateTicket } from "./routes/CreateTicket";
import { CreateSector } from "./routes/CreateSector";
import { CreateStatus } from "./routes/CreateStatus";
import { TicketDetail } from "./routes/TicketDetail";

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <main className="flex flex-1 overflow-y-scroll no-scrollbar p-4">
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/ticket/new" element={<CreateTicket />} />
            <Route path="/ticket" element={<ListTickets />} />
            <Route path="/ticket/:id" element={<TicketDetail />} />
            <Route path="/sector/new" element={<CreateSector />} />
            <Route path="/sector" element={<ListSectors />} />
            <Route path="/status/new" element={<CreateStatus />} />
          </Routes>
        </BrowserRouter>
      </main>
      <Footer />
    </div>
  );
}

export default App;
