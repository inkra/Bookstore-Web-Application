import React from 'react';
import Main from './pages/Main';
import {Link, NavLink} from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap'

class App extends React.Component {
  render(){
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-0" bg="dark" variant="dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand fs-4" to="/">
                        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/e164c015537247.56293318093f8.jpg" width={205}></img>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/gallery">Gallery</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/siswa">Customer</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/pegawai">Ofiicer</NavLink>
                            </li>
                        </ul>
                        <div className="buttons">
                        <NavLink to="/cart" className="btn ms-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                          </svg></NavLink>
                            <NavLink to="/profile" className="btn ms-2">
                                <img src='https://www.seekpng.com/png/detail/4-49948_anonymous-person-png-banner-library-stock-icon-profil.png' width={30}/></NavLink>
                        </div>
                    </div>
                </div>
            </nav>
      <p><Main /></p>
    </div>
  );
  }
}

export default App;
