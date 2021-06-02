//import css
import './App.css';
import { Input } from 'antd';
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
import Login from './components/Login/Login';
import Home from './components/Homepage/Home';
import Register from './components/Register/Register';
import PhongTroSV from './components/PhongTroSV';
import ChungCuMini from './components/ChungCuMini';
import ChungCu from './components/ChungCu';
import PageDetail from './components/PageDetail/PageDetail';
import NhaNguyenCan from './components/NhaNguyenCan';
import SearchResult from './components/SearchResult';
import KenhChuNha from './components/KenhChuNha';
import GuestView from './components/TrangCaNhan_GuestView';
import TrangCaNhan from './components/TrangCaNhan';
import Admin from './components/Admin/Admin';
import ListUser from './components/Admin/components/ListUser';
import AdminView from './components/Admin_QuanLyChuNha';

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        {/* <div className="search">
          <Input.Search
            placeholder="Tìm kiếm phòng bạn muốn..."
            allowClear
            // onSearch={onSearch}
            className="inputSearch"
            size="large"
          />
        </div> */}
        <Switch>
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route path="/admin/list-user/:id">
            <ListUser />
          </Route>
          <Route path="/admin/user-detail/:id">
            <AdminView />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/phong-tro-sv" exact>
            <PhongTroSV />
          </Route>
          <Route path="/phong-tro-sv/:id">
            <PageDetail />
          </Route>
          <Route path="/chung-cu-mini" exact>
            <ChungCuMini />
          </Route>
          <Route path="/chung-cu-mini/:id">
            <PageDetail />
          </Route>
          <Route path="/chung-cu" exact>
            <ChungCu />
          </Route>
          <Route path="/chung-cu/:id">
            <PageDetail />
          </Route>
          <Route path="/nha-nguyen-can" exact>
            <NhaNguyenCan />
          </Route>
          <Route path="/nha-nguyen-can/:id">
            <PageDetail />
          </Route>
          <Route path="/search">
            <SearchResult />
          </Route>
          <Route path="/kenh-chu-nha">
            <KenhChuNha />
          </Route>
          <Route path="/xem-trang-ca-nhan/:id">
            <GuestView />
          </Route>
          <Route path="/trang-ca-nhan">
            <TrangCaNhan />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
