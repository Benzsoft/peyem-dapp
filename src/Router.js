import { Route, Routes } from "react-router-dom";
import App from './App';

import QR from './QRcode';

function Router() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<App />} />
        <Route path="/QR" element={<QR />} />
        
      </Routes>
    </div>
  );
}

export default Router;


















// +8801885056850