import React, { useState, useEffect} from 'react'
import { navigate, useNavigate } from 'react-router-dom'


function AddProductForm(props) {
  const [showModal, setShowModal] = useState(false);

  const onSubmit = () => {
    props.addContent()
    setShowModal(false)
  }

  return (
    <>
      <button
        className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add Produk
      </button>
      {showModal ? (
        <>
        <form onSubmit={() => onSubmit()}>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Add Produk</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                <div className="space-y-6 flex flex-col">
                <div>
                <img id="imagepreview" width="200px" height="200px" />
               </div>
                <input
            className=" my-10"
            type="file"
            id="file"
            onChange={(event) => {
              props.setFile(event);
            }}
          />            
                  <label >Nama Produk</label>
                  <input value={props.product.nama_produk} name="nama_produk" onChange={e => props.setProduct(e)} type="text" className="rounded  "/> 
                  <label>Harga Beli</label>
                  <input value={props.product.harga_beli} name="harga_beli" onChange={e => props.setProduct(e)} type="text" className="rounded  "/>  
                  <label>Harga Jual</label>
                  <input value={props.product.harga_jual} name="harga_jual" onChange={e => props.setProduct(e)} type="text" className="rounded  "/>  
                  <label >Stok</label>
                  <input value={props.product.stok} name="stok" onChange={e => props.setProduct(e)} type="text" className="rounded "/>        
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          </form>
        </>
      ) : null}
    </>
  );
}

export default AddProductForm