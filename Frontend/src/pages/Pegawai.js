import React from 'react';
import $ from 'jquery';
import axios from 'axios';

class Pegawai extends React.Component {
    constructor() {
        super();
            this.state = {
            pegawai: [], // array pegawai untuk menampung data pegawai
            nip: "",
            nama: "",
            alamat: "",
            action: "",
            search: "",
            }
        }

        bind = (event) => {
            this.setState({[event.target.name]: event.target.value});
            }

            Close = () =>{
                $("#modal").hide()
            }

            Add = () => {
            // mengosongkan isi variabel nip, nama, dan alamat
            // set action menjadi "insert"
            $("#modal").show()
            this.setState({
            nip: "",
            nama: "",
            alamat: "",
            action: "insert"
            });
            }

            Edit = (item) => {
                /*
                - mengisikan isi variabel nip, nama, alamat sesuai dengan data yang
                akan diedit
                - set action menjadi "update"
                */
               // menampilkan komponen modal
               $("#modal").show()
                this.setState({
                    nip: item.nip,
                    nama: item.nama,
                    alamat: item.alamat,
                    action: "update",
                    selectedItem: item
                });
            }
            
            getPegawai = () => {
            let url = "http://localhost:2910/pegawai";
            // mengakses api untuk mengambil data pegawai
            axios.get(url)
            .then(response => {
            // mengisikan data dari respon API ke array pegawai
            this.setState({pegawai: response.data.pegawai});
            })
            .catch(error => {
            console.log(error);
            });
            }


            searching = event => {
                if(event.keyCode === 13){
                // 13 adalah kode untuk tombol enter
                let keyword = this.state.keyword.toLowerCase()
                let tempSiswa = this.state.siswa
                let result = tempSiswa.filter(item => {
                return item.nis.toLowerCase().includes(keyword) ||
                item.nama.toLowerCase().includes(keyword) ||
                item.alamat.toLowerCase().includes(keyword)
                })
                this.setState({siswa: result})
                }
            }

     findPegawai = (event) => {
        let url = "http://localhost:2910/pegawai";
            if (event.keyCode === 13) {
            // menampung data keyword pencarian
                let form = {
                find: this.state.search
            }
            // mengakses api untuk mengambil data pegawai
            // berdasarkan keyword
            axios.post(url, form)
                .then(response => {
            // mengisikan data dari respon API ke array pegawai
            this.setState({pegawai: response.data.pegawai});
            })
        .catch(error => {
        console.log(error);
        });
        }
    }

            
            SavePegawai = (event) => {
                event.preventDefault();
                /* menampung data nip, nama dan alamat dari Form
                ke dalam FormData() untuk dikirim */
                let url = "";
                if (this.state.action === "insert") {
                url = "http://localhost:2910/pegawai/save"
                } else {
                url = "http://localhost:2910/pegawai/update"
                }
                let form = {
                nip: this.state.nip,
                nama: this.state.nama,
                alamat: this.state.alamat
                }
                // mengirim data ke API untuk disimpan pada database
                axios.post(url, form)
                .then(response => {
                // jika proses simpan berhasil, memanggil data yang terbaru
                this.getPegawai();
                })
                .catch(error => {
                console.log(error);
                });
                // menutup form modal
                $("#modal").hide()
                }

                Drop = (nip) => {
                let url = "http://localhost:2910/pegawai/" + nip;
                // memanggil url API untuk menghapus data pada database
                if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
                axios.delete(url)
                .then(response => {
                // jika proses hapus data berhasil, memanggil data yang terbaru
                this.getPegawai();
                })
                .catch(error => {
                console.log(error);
                });
                }
                }
                componentDidMount(){
                // method yang pertama kali dipanggil pada saat load page
                this.getPegawai()
                }

        
        render(){
            return (
                <div className="container"> <br></br>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="display-6">Officer Data</span>
                </h4><br></br>
                    <div class="col-md-5">
                        <div class="form"><input type="text" name="search" value={this.state.search}onChange={this.bind} onKeyUp={this.findPegawai} class="form-control form-input" placeholder="Find Officer"/></div>
                    </div>
<br></br>
                <div class="container">
                </div>
                        
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>NIP</th>
                                    <th>Nama</th>
                                    <th>Alamat</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.pegawai.map((item,index) => {
                                return (
                                <tr key={index}>
                                    <td>{item.nip}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.alamat}</td>
                                    <td>
                                    <button className="btn btn-sm btn-outline-dark m-1" data-toggle="modal" data-target="#modal" onClick={() => this.Edit(item)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                                    </svg></button>
                                    <button className="btn btn-sm btn-dark m-1" onClick={() => this.Drop(item.nip)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                    </svg></button>
                                    </td>
                                </tr>
                                );
                                })}
                            </tbody>
                        </table>
                        <br></br>
                        <button className="btn btn-dark btn-lg" onClick={this.Add} data-toggle="modal" data-target="#modal">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg> Add New Officer
                </button>


                {/* component modal sbg control manipulasi data */}
                <div className="modal modal" id="modal">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title"><b>Officer Data</b></h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => this.Close()}></button>
                                </div>
                                <div class="modal-body">
                                <form onSubmit={this.SavePegawai}>
                                NIP
                                <input type="number" name="nip" value={this.state.nip} onChange={this.bind} className="form-control" required />
                                Nama
                                <input type="text" name="nama" value={this.state.nama} onChange={this.bind} className="form-control" required />
                                Alamat
                                <input type="text" name="alamat" value={this.state.alamat} onChange={this.bind} className="form-control" required />
                                    <button className="btn btn-dark btn-block" type="submit">
                                        Save
                                    </button>
                                </form>
                                    <br></br>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            );
            }
}

export default Pegawai;