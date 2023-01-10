import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai"
import { FaFileUpload } from "react-icons/fa"
import {PasswordAndConfirmPasswordValidation} from "../components"
import "./styles/Modal.css";

export default function Modal({
    handleModal,
    title,
    type,
    widthBtn,
    heightBtn,
    fontBtn,
    BgColorBtn,
    BgImgBtn,
    paddingBtn,
    displayBtn,
    borderRadBtn,
    element,
    ModalCallback,
    DelUsModalCallback,
    ChangeUsModalCallback,
    NewProdModalCallback,
    ModProdModalCallback
    
}) {
  const [modal, setModal] = useState(false);
  const [TypeModal,setTypeModal]=useState();
  const [PrevImgNewProd,setPrevImgNewProd]=useState('');

  const state = {
        example: '👋'
  }

  const handleCallback = () => callback(state)



  const toggleModal = (event) => {
    setModal(!modal);
  };

  const eraseToggleModal=(el)=>{
    console.log("diste click para borrar: ",el)
  }

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  const handleNewProdImg=(el)=>{
    console.log(el.target.files[0])
    var file = el.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    setPrevImgNewProd(URL.createObjectURL(el.target.files[0]))
    console.log(PrevImgNewProd)

  }
  return (
    <>
        <button className="newProdBtn" 
        style={{
            fontSize:fontBtn,
            width:widthBtn,
            height:heightBtn,
            backgroundColor:BgColorBtn,
            padding:paddingBtn,
            display:displayBtn,
            borderRadius:borderRadBtn,
            backgroundImage: `url("${BgImgBtn}")`,
            backgroundPosition:"center",
            backgroundSize:"contain",
            backgroundRepeat:"no-repeat",
            
        }}
        onClick={(event)=>{
            toggleModal();
            setPrevImgNewProd('');
        }}>
        {/* <GrFormAdd size={50} /> */}
        {title}</button>        
                            
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <button className="close-modal" onClick={toggleModal}>
              <AiOutlineClose size={20}/>
            </button>


            
            <h2>{title}</h2>
            <div>

                {type=="NewUser"&&
                <form       // onSubmit={register}
                            onSubmit={(el)=>{
                                // alert("listo paa");
                                el.preventDefault();
                                console.log(el)
                                ModalCallback(el)
                                // handleClick(el, 100)
                            }}
                            // onSubmit={event => handleClick(event, 100)}
                            >
       
       

                                <label htmlFor="UsNameInp" style={{
                                    textAlign:"left",
                                    display:"block",
                                    marginTop:"20px"
                                }}>
                                    <p style={{
                                        fontWeight:"bold",
                                        marginBottom:"5px"
                                    }}>Nombre del usuario</p>
                                    <input type="text" id="UsNameInp" name="username" required style={{
                                        border:"2px solid black",
                                        borderRadius:"0.3rem",
                                        outline:"none",
                                        width:"100%",
                                        padding:"5px"
                                    }}/>
                                </label>

                                
                                <label htmlFor="UsTypeInp" style={{
                                    textAlign:"left",
                                    display:"block",
                                    marginTop:"20px"
                                }}>
                                    <p style={{
                                        fontWeight:"bold",
                                        marginBottom:"5px"
                                    }}>Tipo</p>
                                    <select name="usType" id="UsTypeInp" style={{
                                        border:"2px solid black",
                                        borderRadius:"0.3rem",
                                        outline:"none",
                                        width:"100%",
                                        padding:"5px"
                                    }} onChange={(e)=>{
                                        // setCreateUserRole(e.target.value);
                                    }}>
                                        <option value="Seller">Vendedor</option>
                                        <option value="Admin">Admin</option>
                                        <option value="deliver">Repartidor</option>
                                        <option value="store">Almacén</option>
                                    </select>
                                </label>





                                <label htmlFor="UsNameInp" style={{
                                    textAlign:"left",
                                    display:"block",
                                    marginTop:"20px"
                                }}>
                                    <p style={{
                                        fontWeight:"bold",
                                        marginBottom:"5px"
                                    }}>Email</p>
                                    <input type="email" id="UsNameInp" name="email" required onChange={(e)=>{
                                    // setCreateUserEmail(e.target.value);
                                    }} style={{
                                        border:"2px solid black",
                                        borderRadius:"0.3rem",
                                        outline:"none",
                                        width:"100%",
                                        padding:"5px"
                                    }}/>
                                </label>
                                
                        <label htmlFor="UsNumberInp" style={{
                            textAlign:"left",
                            display:"block",
                            marginTop:"20px"
                        }}>
                            <p style={{
                                fontWeight:"bold",
                                marginBottom:"5px"
                            }}>Teléfono</p>
                            <input type="tel" name="tel" pattern="[0-9]{10}" id="UsNumberInp" required style={{
                                border:"2px solid black",
                                borderRadius:"0.3rem",
                                outline:"none",
                                width:"100%",
                                padding:"5px"
                            }}/>
                        </label>
                        <label htmlFor="UsPassInp" style={{
                            textAlign:"left",
                            display:"block",
                            marginTop:"20px"
                        }}>
                            <p style={{
                                fontWeight:"bold",
                                marginBottom:"5px"
                            }}>Contraseña</p>
                            <input type="text" id="UsPassInp" name="pass" required style={{
                                border:"2px solid black",
                                borderRadius:"0.3rem",
                                outline:"none",
                                width:"100%",
                                padding:"5px"
                            }}/>
                        </label>
                        <br />
                        <button 
                        style={{
                            background:"#C4F0C6",
                            padding:"10px",
                            fontSize:"1.5vw",
                            fontWeight:"bold"
                        }} >Guardar usuario</button>
                    </form>
                }

            {type=="ModUser"&&
                            <form 
                            // onSubmit={register}
                            onSubmit={(el)=>{
                                el.preventDefault();
                                ChangeUsModalCallback(el);
                                // DelUsModalCallback(el);
                            }}
                            >

                                <label htmlFor="UsNameInp" style={{
                                    textAlign:"left",
                                    display:"block",
                                    marginTop:"20px"
                                }}>
                                    <p style={{
                                        fontWeight:"bold",
                                        marginBottom:"5px"
                                    }}>Nombre del usuario</p>
                                    <input type="text" id="UsNameInp" placeholder={element.name} name="username" required style={{
                                        border:"2px solid black",
                                        borderRadius:"0.3rem",
                                        outline:"none",
                                        width:"100%",
                                        padding:"5px"
                                    }}/>
                                </label>

                                
                                <label htmlFor="UsTypeInp" style={{
                                    textAlign:"left",
                                    display:"block",
                                    marginTop:"20px"
                                }}>
                                    <p style={{
                                        fontWeight:"bold",
                                        marginBottom:"5px"
                                    }}>Tipo</p>
                                    <select name="usType" id="UsTypeInp"
                                    style={{
                                        border:"2px solid black",
                                        borderRadius:"0.3rem",
                                        outline:"none",
                                        width:"100%",
                                        padding:"5px"
                                    }} onChange={(e)=>{
                                        // setCreateUserRole(e.target.value);
                                    }}>
                                        <option value={element.role} selected disabled hidden>{element.role}</option>
                                        <option value="Seller">Vendedor</option>
                                        <option value="Admin">Admin</option>
                                        <option value="deliver">Repartidor</option>
                                        <option value="store">Almacén</option>
                                    </select>
                                </label>





                                <label htmlFor="UsNameInp" style={{
                                    textAlign:"left",
                                    display:"block",
                                    marginTop:"20px"
                                }}>
                                    <p style={{
                                        fontWeight:"bold",
                                        marginBottom:"5px"
                                    }}>Email</p>
                                    <input type="email" id="UsNameInp" placeholder={element.email} name="email" required onChange={(e)=>{
                                    // setCreateUserEmail(e.target.value);
                                    }} style={{
                                        border:"2px solid black",
                                        borderRadius:"0.3rem",
                                        outline:"none",
                                        width:"100%",
                                        padding:"5px"
                                    }}/>
                                </label>
                                
                        <label htmlFor="UsNumberInp" style={{
                            textAlign:"left",
                            display:"block",
                            marginTop:"20px"
                        }}>
                            <p style={{
                                fontWeight:"bold",
                                marginBottom:"5px"
                            }}>Teléfono</p>
                            <input type="tel" pattern="[0-9]{10}" id="UsNumberInp" name="tel" placeholder={element.tel} required style={{
                                border:"2px solid black",
                                borderRadius:"0.3rem",
                                outline:"none",
                                width:"100%",
                                padding:"5px"
                            }}/>
                        </label>
                        <label htmlFor="UsPassInp" style={{
                            textAlign:"left",
                            display:"block",
                            marginTop:"20px"
                        }}>
                            <p style={{
                                fontWeight:"bold",
                                marginBottom:"5px"
                            }}>Contraseña</p>
                            <input type="text" id="UsPassInp" required placeholder={element.pass} name="pass" style={{
                                border:"2px solid black",
                                borderRadius:"0.3rem",
                                outline:"none",
                                width:"100%",
                                padding:"5px"
                            }}/>
                        </label>
                        <br />
                        <div style={{
                            display:"flex",
                            justifyContent:"space-evenly"
                        }}>
                        <button name="delUser" 
                        type="button"
                        id="delUser"
                        onClick={()=>{
                            DelUsModalCallback(element);
                            // alert("diste click para elimiar el user");
                        }}
                        style={{
                            background:"#F0C7C4",
                            padding:"10px",
                            fontSize:"1.5vw",
                            fontWeight:"bold"
                        }} >Eliminar usuario</button>

                        <button name="saveChg" id="saveChg" 
                        type="submit"
                        style={{
                            background:"#C4F0C6",
                            padding:"10px",
                            fontSize:"1.5vw",
                            fontWeight:"bold"
                        }} >Guardar cambios</button>
                        </div>
                        {/* <PasswordAndConfirmPasswordValidation 
                         handlePass={handlePass}
                        /> */}
                    </form>
                }
            
                {type=="NewProd"&&
                <form onSubmit={(el)=>{
                    el.preventDefault();
                    NewProdModalCallback(el)
                }}>
                    <label htmlFor="prodFileInp" style={{
                        textAlign:"left"
                    }}>
                        <p style={{
                            fontWeight:"bold",
                            marginBottom:"5px"
                        }}>Imagen del producto</p>
                        <img src={PrevImgNewProd} alt="" width={100} style={{
                            margin:"auto"
                        }}/>
                        <div style={{
                            display:"flex",
                            // margin:"auto",
                            alignItems:"center",
                            background:"black",
                            color:"white",
                            width:"100%",
                            borderRadius:"0.5rem",
                            justifyContent:"space-around",
                            padding:"10px",
                            cursor:"pointer",
                            textAlign:"left"
                        }}><FaFileUpload/> Selecionar archivo</div>
                        <input type="file" required id="prodFileInp" name="img" accept="image/*" onChange={handleNewProdImg} style={{
                        display:"none"
                        }}/>
                    </label>



                    <label htmlFor="prodNameInp" style={{
                        textAlign:"left",
                        display:"block",
                        marginTop:"20px"
                    }}>
                        <p style={{
                            fontWeight:"bold",
                            marginBottom:"5px"
                        }}>Nombre del producto</p>
                        <input type="text" id="prodNameInp" name="name" required style={{
                            border:"2px solid black",
                            borderRadius:"0.3rem",
                            outline:"none",
                            width:"100%",
                            padding:"5px"
                        }}/>
                    </label>
                    <label htmlFor="prodPriceInp" style={{
                        textAlign:"left",
                        display:"block",
                        marginTop:"20px"
                    }}>
                        <p style={{
                            fontWeight:"bold",
                            marginBottom:"5px"
                        }}>Precio de venta</p>
                        <div style={{
                            display:"flex",
                            border:"2px solid black",
                            borderRadius:"0.3rem",
                            background:"white",
                            paddingLeft:"10px",
                            paddingTop:"2px",
                            paddingBottom:"2px",
                            padding:"5px"
                        }}>
                            <strong>$</strong>
                            <input type="number" step=".01" id="prodPriceInp" name="price" min="0" required style={{
                                marginLeft:"5px",
                                outline:"none",
                                width:"100%"
                            }}/>
                        </div>
                    </label>
                    <label htmlFor="prodDesInp" style={{
                        textAlign:"left",
                        display:"block",
                        marginTop:"20px"
                    }}>
                        <p style={{
                            fontWeight:"bold",
                            marginBottom:"5px"
                        }}>Descripción</p>
                        <textarea name="desc" id="prodDesInp" cols="30" rows="10" maxLength="500" required  style={{
                            border:"2px solid black",
                            borderRadius:"0.3rem",
                            outline:"none",
                            width:"100%",
                            height:"150px",
                            padding:"10px",
                            resize:"none"
                        }}></textarea>
                    </label>
                    <br />
                    <button style={{
                        background:"#C4F0C6",
                        padding:"10px",
                        fontSize:"1.5vw",
                        fontWeight:"bold"
                    }} >Guardar producto</button>
                </form>
                }


                {type=="ModProd"&&
                <form onSubmit={(el)=>{
                    el.preventDefault();
                    ModProdModalCallback(el)
                    // NewProdModalCallback(el)
                }}>
                    <label htmlFor="prodFileInp" style={{
                        textAlign:"left"
                    }}>
                        <p style={{
                            fontWeight:"bold",
                            marginBottom:"5px"
                        }}>Imagen del producto</p>
                        <img src={PrevImgNewProd} alt="" width={100} style={{
                            margin:"auto"
                        }}/>
                        <div style={{
                            display:"flex",
                            // margin:"auto",
                            alignItems:"center",
                            background:"black",
                            color:"white",
                            width:"100%",
                            borderRadius:"0.5rem",
                            justifyContent:"space-around",
                            padding:"10px",
                            cursor:"pointer",
                            textAlign:"left"
                        }}><FaFileUpload/> Selecionar archivo</div>
                        <input type="file" id="prodFileInp" name="img" accept="image/*" onChange={handleNewProdImg} style={{
                        display:"none"
                        }}/>
                    </label>



                    <label htmlFor="prodNameInp" style={{
                        textAlign:"left",
                        display:"block",
                        marginTop:"20px"
                    }}>
                        <p style={{
                            fontWeight:"bold",
                            marginBottom:"5px"
                        }}>Nombre del producto</p>
                        <input type="text" id="prodNameInp" name="name"  placeholder={element.name} style={{
                            border:"2px solid black",
                            borderRadius:"0.3rem",
                            outline:"none",
                            width:"100%",
                            padding:"5px"
                        }}/>
                    </label>
                    <label htmlFor="prodPriceInp" style={{
                        textAlign:"left",
                        display:"block",
                        marginTop:"20px"
                    }}>
                        <p style={{
                            fontWeight:"bold",
                            marginBottom:"5px"
                        }}>Precio de venta</p>
                        <div style={{
                            display:"flex",
                            border:"2px solid black",
                            borderRadius:"0.3rem",
                            background:"white",
                            paddingLeft:"10px",
                            paddingTop:"2px",
                            paddingBottom:"2px",
                            padding:"5px"
                        }}>
                            <strong>$</strong>
                            <input type="number" step=".01" placeholder={element.price} id="prodPriceInp" name="price" min="0"  style={{
                                marginLeft:"5px",
                                outline:"none",
                                width:"100%"
                            }}/>
                        </div>
                    </label>
                    <label htmlFor="prodDesInp" style={{
                        textAlign:"left",
                        display:"block",
                        marginTop:"20px"
                    }}>
                        <p style={{
                            fontWeight:"bold",
                            marginBottom:"5px"
                        }}>Descripción</p>
                        <textarea name="desc" placeholder={element.desc} id="prodDesInp" cols="30" rows="10" maxLength="500"   style={{
                            border:"2px solid black",
                            borderRadius:"0.3rem",
                            outline:"none",
                            width:"100%",
                            height:"150px",
                            padding:"10px",
                            resize:"none"
                        }}></textarea>
                    </label>
                    <br />
                    <div style={{
                            display:"flex",
                            justifyContent:"space-evenly"
                        }}>
                        <button name="delUser" 
                        type="button"
                        id="delUser"
                        // onClick={()=>{
                        //     DelUsModalCallback(element);
                        //     // alert("diste click para elimiar el user");
                        // }}
                        style={{
                            background:"#F0C7C4",
                            padding:"10px",
                            fontSize:"1.5vw",
                            fontWeight:"bold"
                        }} >Eliminar producto</button>

                        <button name="saveChg" id="saveChg" 
                        type="submit"
                        style={{
                            background:"#C4F0C6",
                            padding:"10px",
                            fontSize:"1.5vw",
                            fontWeight:"bold"
                        }} >Guardar cambios</button>
                        </div>
                </form>
                }
            </div>
          </div>
        </div>
      )}
    </>
  );
}