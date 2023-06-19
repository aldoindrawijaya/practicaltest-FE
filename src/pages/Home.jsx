import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { Button, Modal } from 'flowbite-react';
import { useNavigate } from "react-router-dom";
import AddProductForm from '../components/AddProductForm'
import EditProductForm from '../components/EditProductForm'

function Home() {

  const navigate = useNavigate()
  const [file, setFile] = useState(null);
  const [openModal, setOpenModal] = useState("");
  const props = { openModal, setOpenModal };
  const [ content, setContent] = useState([])
  const [idProduk, setIdProduk] = useState('')
  const [ product, setProduct] = useState({      
  foto_barang:"",
  nama_produk: "",
  harga_beli:0,
  harga_jual:0,
  stok:0,})
  

  const fetchContent = async () => {
    let response = await axios.get(`http://localhost:8000/auth`)
    setContent(response.data)
  }

  const confirmDelete = (id_produk) => {
    const options = {
      title: 'Apakah ingin menghapus produk?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteContent(id_produk)
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => {},
      afterClose: () => {},
      onClickOutside: () => {},
      onKeypress: () => {},
      onKeypressEscape: () => {},
      overlayClassName: "overlay-custom-class-name"
    };
    
    confirmAlert(options);
  }

  const deleteContent = async (id_produk) => {
  const requestBody = {id_produk}
    await axios.post(`http://localhost:8000/auth/delete`, requestBody)
    .then((response)=> {
      alert(response.data.message)
      fetchContent();
    })
  }

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    let preview = document.getElementById("imagepreview");
    preview.src = URL.createObjectURL(event.target.files[0]);
  };

  const uploadImage = async (id_content) => {
    if (file) {
      // const id = JSON.parse(localStorage.getItem('user')).id
      const obj = {
        id : id_content
      };
      let formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(obj));

      const response = await axios.post(
        "http://localhost:8000/upload",
        formData
      );
      if (!response.error) {
        fetchContent()
      }
    } else {
      alert("select image first");
    }
  };

  const addContent = async () => {
    await axios
      .post("http://localhost:8000/auth/add", product)
      .then((response) => {
        console.log(response.data)
        alert(response.data.message)
        uploadImage(response.data.data.insertId);
        
      });
  };

  const editProduct = async () => {
    const updatedProduct = {...product, id_produk: idProduk}

    await axios
    .put("http://localhost:8000/auth/update", updatedProduct)
    .then((response) => {
      alert(response.data.message)
      fetchContent()
      uploadImage(idProduk);
    });
  }

  function handleOnChange(event){
    setProduct(product => ({
      ...product,
      [event.target.name]: event.target.value
    }))
  }

  useEffect(()=>{
    const id = JSON.parse(localStorage.getItem('user')).id
    fetchContent()
  }, [])

  useEffect(()=>{
    const getProduct = async () => {
      await axios
      .get(`http://localhost:8000/auth/${idProduk}`)
      .then((response) => {
        const produk = response.data;
        console.log(response)
        setProduct(product => ({
          ...product,
          foto_barang:"",
          nama_produk: produk?.nama_produk,
          harga_beli:produk?.harga_beli,
          harga_jual:produk?.harga_jual,
          stok:produk?.stok
        }))
      });
    }

    getProduct()
    
  }, [idProduk])

  const renderContent = () =>{

    return content.map((data)=>{
      console.log(data.foto_produk)
      return (
      <div style={{marginBottom: "24px"}} className='mx-6 my-4'>
        <div className='group-relative'>
            <img style={{ padding: "0 700px"}}
            src={'http://localhost:8000' + data.foto_barang}
            alt=''
            className='max-h-80 h-full w-full p-80 object-cover object-center lg:h-full lg:w-full mb-5'/>
          <div
            style={{width: "320px", margin: "0 auto"}}
            className='mt-4 flex justify-between'
            >
              <div>
                <h3 className='font-bold'>{data.nama_produk}</h3>
                <p className='mt-1 text-sm text-gray-500'>
                  Harga Beli : {data.harga_beli}
                </p>
                <p className='mt-1 text-sm text-gray-500'>
                  Harga Jual : {data.harga_jual}
                </p>
                <p className='text-m font-medium text-gray-900'>
                   Stok : {data.stok}
                </p>
 
              </div>
              <div className='flex flex-col'>
              <button
        className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={()=> confirmDelete(data.id_produk)}
      >
        Delete
      </button>

        
                <EditProductForm file={file} product={product} editProduct={editProduct} setFile={event => onFileChange(event)} idProduk={data.id_produk} setIdProduct={setIdProduk} resetProduct={setProduct} setProduct={event => handleOnChange(event)}></EditProductForm>

              </div>
          </div>
        </div>
      </div>
        )
    })
  }
  return (
    <div>
      <div className='flex justify-center mt-5 mx-6'>
        <AddProductForm file={file} product={product} addContent={addContent} setFile={event => onFileChange(event) } setProduct={event => handleOnChange(event)}></AddProductForm>
      </div>
      <div className='columns-1 conten-center'>{renderContent()}</div>
    </div>
  )
}

export default Home;