import React, { Component } from 'react'
import $ from 'jquery';
import '../index.css';


export default class Siswa extends Component {

    constructor() {
        super()
        this.state = {
            siswa : [
                {nis: "100", nama: "Musthofa", alamat: "Surabaya"},
                {nis: "101", nama: "Nurul", alamat: "Malang"},
                {nis: "102", nama: "Misbah", alamat: "Pasuruan"},
            ],
            nis: "",
            nama: "",
            alamat: "",
            action: ""
        }
    }

    bind = (event) => {
        this.setState({[event.target.name]: event.target.value}); 
    }

    Close = () =>{
        $("#modal").hide()
    }

    Add = () => {
        // menampilkan komponen modal
        $("#modal").show()
        this.setState({
            nis: "",
            nama: "",
            alamat: "",
            action: "insert"
        })
    }

    Edit = (item) => {
        // menampilkan komponen modal
        $("#modal").show()
        this.setState({
            nis: item.nis,
                nama: item.nama,
                alamat: item.alamat,
                action: "update",
            selectedItem: item
        })
    }

     SaveSiswa = (event) => {
        event.preventDefault();
        // menampung data state siswa
        let temp = this.state.siswa;

        if (this.state.action === "insert") {
            // menambah data baru
            temp.push({
                nis: this.state.nis,
                nama: this.state.nama,
                alamat: this.state.alamat
            });
        } else if (this.state.action === "update") {
            // menyimpan perubahan data
            let index = temp.findIndex(item => item.nis === this.state.nis);
            temp[index].nama = this.state.nama; 
            temp[index].alamat = this.state.alamat;
        }

        this.setState({siswa: temp});

        // menutup komponen modal
        $("#modal").hide()
    }

    Drop = (index) => {
        // beri konfirmasi untuk menghapus data
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            // menghapus data
            let temp = this.state.siswa;

            // hapus data
            temp.splice(index,1);
            this.setState({siswa: temp});
        }
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

    render() {
        return (
            <div className="container"> <br></br>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="display-6">Customer Data</span>
                </h4><br></br>
                <div class="col-md-5">
                        <div class="form"><input type="text" value={this.state.keyword} onChange={ev => this.setState({keyword: ev.target.value})} onKeyUp={ev => this.searching(ev)} class="form-control form-input" placeholder="Find customer"/></div>
                        </div><br></br>
                <div class="container">
                <table className="table">
                            <thead>
                                <tr>
                                    <th>Customer ID</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.siswa.map((item,index) => {
                                return (
                                <tr key={index}>
                                    <td>{item.nis}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.alamat}</td>
                                    <td>
                                    <button className="btn btn-outline-dark m2" onClick={() => this.Edit(item)} data-toggle="modal" data-target="#modal"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                                    </svg></button>
                                    <button className="btn btn-dark m1" onClick={() => this.Drop(index)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                    </svg></button>
                                    </td>
                                </tr>
                                );
                                })}
                            </tbody>
                        </table>

                        <br></br>
                        <button className="btn btn-dark btn-lg" onClick={() => this.Add()} data-toggle="modal" data-target="#modal">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg> Add New Customer
                </button>


                {/* component modal sbg control manipulasi data */}
                <div className="modal modal" id="modal">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title"><b>Customer Data</b></h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => this.Close()}></button>
                                </div>
                                <div class="modal-body">
                                <form onSubmit={ev => this.SaveSiswa(ev)}>
                                Customer ID
                                <input type="text" name="nis" className="form-control mb-2" onChange={this.bind} value={this.state.nis} required />
                                Nama
                                <input type="text" name="nama" className="form-control mb-2" onChange={this.bind} value={this.state.nama} required />
                                Alamat
                                <input type="text" name="alamat" className="form-control mb-2" onChange={this.bind} value={this.state.alamat} required />
                                

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
                    
            </div>

        )
    }
}