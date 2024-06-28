import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import AppLayout from "./Layout/AppLayout";
import AppRouter from "./routes/AppRouter";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./action/userAction";
import "./style/common.style.css";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <div>
      <AppLayout>
        <ScrollToTop />
        <AppRouter />
      </AppLayout>
    </div>
  )
}

export default App

