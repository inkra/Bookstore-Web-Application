import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Beranda from './Beranda';
import Siswa from './Siswa';
import Karya from './Karya';
import Kontak from './Kontak';
import Gallery from './Gallery';
import Cart from './Cart';
import Pegawai from './Pegawai';

const Main = () => (
    
    <Switch>
        <Route exact path="/" component={Beranda} />
        <Route path="/siswa" component={Siswa} />
        <Route path="/karya" component={Karya} />
        <Route path="/kontak" component={Kontak} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/cart" component={Cart} />
        <Route path="/pegawai" component={Pegawai} />
    </Switch>
    
    
)

export default Main;