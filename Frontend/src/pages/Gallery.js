import React, { Component } from 'react'
import Card from "../components/Card";
import $ from 'jquery';
import '../index.css';


export default class Gallery extends Component {

    constructor() {
        super()
        this.state = {
            buku: [
                {
                    isbn: "12345", judul: "Kita Pernah Salah", penulis: "Fuad Bakh & Aria Shinta",
                    penerbit: "Wahyu Qolbu", harga: 69000,
                    cover: "https://cdn.gramedia.com/uploads/items/9786026358721_kita-pernah-salah__w600_hauto.jpg"
                },
                {
                    isbn: "12346", judul: "Sebatas Mimpi", penulis: "Hujan Mimpi",
                    penerbit: "TransMedia Pustaka", harga: 60000,
                    cover: "https://www.bukukita.com/babacms/displaybuku/99371_f.jpg"
                },
                {
                    isbn: "54321", judul: "Mariposa", penulis: "Hidayatul Fajriyah (Luluk HF)",
                    penerbit: "Coconut Books", harga: 79000,
                    cover: "https://upload.wikimedia.org/wikipedia/id/thumb/b/b0/Mariposa_%28sampul%29.jpeg/220px-Mariposa_%28sampul%29.jpeg"
                },
            ],

            action: "",
            isbn: "",
            judul: "",
            penulis: "",
            penerbit: "",
            harga: 0,
            cover: "",
            selectedItem: null,
        }
        this.state.filterBuku = this.state.buku


    }

    setUser = () => {
        // cek eksistensi dari session storage
        if(localStorage.getItem("user") === null){
        // kondisi jika session storage "user" belum dibuat
        let prompt = window.prompt("Masukkan Nama Anda","")
        if(prompt === null || prompt === ""){
        // jika user tidak mengisikan namanya
        this.setUser()
        }else{
        // jika user telah mengisikan namanya
        // simpan nama user ke session storage
        localStorage.setItem("user", prompt)
        // simpan nama user ke state.user
        this.setState({user: prompt})
        }
        }else{
        // kondisi saat session storage "user" telah dibuat
        // akses nilai dari session storage "user"
        let name = localStorage.getItem("user")
        this.setState({user: name})
        }
        }

        componentDidMount(){
            this.setUser()
            }

    Close = () =>{
        $("#modal").hide()
    }

    Add = () => {
        // menampilkan komponen modal
        $("#modal").show()
        this.setState({
            isbn: Math.random(1, 10000000),
            judul: "",
            penulis: "",
            penerbit: "",
            cover: "",
            harga: 0,
            action: "insert"
        })
    }

    Edit = (item) => {
        // menampilkan komponen modal
        $("#modal").show()
        this.setState({
            isbn: item.isbn,
            judul: item.judul,
            penulis: item.penulis,
            penerbit: item.penerbit,
            cover: item.cover,
            harga: item.harga,
            action: "update",
            selectedItem: item
        })
    }


    Save = (event) => {
        event.preventDefault();
        // menampung data state buku
        let tempBuku = this.state.buku

        if (this.state.action === "insert") {
            // menambah data baru
            tempBuku.push({
                isbn: this.state.isbn,
                judul: this.state.judul,
                penulis: this.state.penulis,
                penerbit: this.state.penerbit,
                cover: this.state.cover,
                harga: this.state.harga,
            })
        } else if (this.state.action === "update") {
            // menyimpan perubahan data
            let index = tempBuku.indexOf(this.state.selectedItem)
            tempBuku[index].isbn = this.state.isbn
            tempBuku[index].judul = this.state.judul
            tempBuku[index].penulis = this.state.penulis
            tempBuku[index].penerbit = this.state.penerbit
            tempBuku[index].cover = this.state.cover
            tempBuku[index].harga = this.state.harga
        }

        this.setState({ buku: tempBuku })

        // menutup komponen modal_buku
        $("#modal").hide()
    }

    Drop = (item) => {
        // beri konfirmasi untuk menghapus data
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            // menghapus data
            let tempBuku = this.state.buku
            // posisi index data yg akan dihapus
            let index = tempBuku.indexOf(item)

            // hapus data
            tempBuku.splice(index, 1)

            this.setState({ buku: tempBuku })
        }
    }

    searching = event => {
        if (event.keyCode === 13) {
            // 13 adalah kode untuk tombol enter

            let keyword = this.state.keyword.toLowerCase()
            let tempBuku = this.state.buku
            let result = tempBuku.filter(item => {
                return item.judul.toLowerCase().includes(keyword) ||
                    item.penulis.toLowerCase().includes(keyword) ||
                    item.penerbit.toLowerCase().includes(keyword)
            })

            this.setState({ filterBuku: result })
        }
    }

    addToCart = (selectedItem) => {
        // membuat sebuah variabel untuk menampung cart sementara
        let tempCart = []
        // cek eksistensi dari data cart pada localStorage
        if(localStorage.getItem("cart") !== null){
        tempCart = JSON.parse(localStorage.getItem("cart"))
        // JSON.parse() digunakan untuk mengonversi dari string -> array object
        }
        // cek data yang dipilih user ke keranjang belanja
        let existItem = tempCart.find(item => item.isbn === selectedItem.isbn)
        if(existItem){
        // jika item yang dipilih ada pada keranjang belanja
        window.alert("Anda telah memilih item ini")
        }else{
        // user diminta memasukkan jumlah item yang dibeli
        let promptJumlah = window.prompt("Masukkan jumlah item yang beli","")
        if(promptJumlah !== null && promptJumlah !== ""){
        // jika user memasukkan jumlah item yg dibeli
        // menambahkan properti "jumlahBeli" pada item yang dipilih
        selectedItem.jumlahBeli = promptJumlah
        // masukkan item yg dipilih ke dalam cart
        tempCart.push(selectedItem)
        // simpan array tempCart ke localStorage
        localStorage.setItem("cart", JSON.stringify(tempCart))
        }
        }
        }



    render() {
        return (
            <div className="container"> <br></br>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="display-6">Welcome, { this.state.user }</span>
                </h4>
                <h6 className='desc'>Explore your favourite books and get your new book collection with the best price.</h6><br></br>
                <div class="container">
                <button className="addbook btn btn-dark btn-lg" onClick={() => this.Add()} data-toggle="modal" data-target="#modal">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg> Add New Book
                </button>
                    <div class="col-md-5">
                        <div class="form"><input type="text" value={this.state.keyword}
                            onChange={ev => this.setState({ keyword: ev.target.value })}
                            onKeyUp={ev => this.searching(ev)} class="form-control form-input" placeholder="Find the book"/></div>
                        </div>
                </div>
             
        
                
                <div className="row">
                    {this.state.filterBuku.map((item, index) => (
                        <Card
                        key={index}
                        judul={item.judul}
                        isbn={item.isbn}
                        penulis={item.penulis}
                        penerbit={item.penerbit}
                        harga={item.harga}
                        cover={item.cover}
                        onEdit={() => this.Edit(item)}
                        onDrop={() => this.Drop(item)}
                        onCart={ () => this.addToCart(item)}
                    />
                    ))}
                </div>


                {/* component modal sbg control manipulasi data */}
                <div className="modal modal" id="modal">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title"><b>Book Data</b></h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => this.Close()}></button>
                                </div>
                                <div class="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Judul Buku
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.judul}
                                        onChange={ev => this.setState({ judul: ev.target.value })}
                                        required />
                                    
                                    ISBN
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.isbn}
                                        onChange={ev => this.setState({ isbn: ev.target.value })}
                                        required />

                                    Penulis Buku
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.penulis}
                                        onChange={ev => this.setState({ penulis: ev.target.value })}
                                        required />

                                    Penerbit Buku
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.penerbit}
                                        onChange={ev => this.setState({ penerbit: ev.target.value })}
                                        required />

                                    Harga Buku
                                    <input type="number" className="form-control mb-2"
                                        value={this.state.harga}
                                        onChange={ev => this.setState({ harga: ev.target.value })}
                                        required />

                                    Cover Buku
                                    <input type="url" className="form-control mb-2"
                                        value={this.state.cover}
                                        onChange={ev => this.setState({ cover: ev.target.value })}
                                        required />

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

        )
    }
}
