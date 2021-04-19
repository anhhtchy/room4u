//import css
import './App.css';
import 'antd/dist/antd.css';

//import react router
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//import components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default App;
