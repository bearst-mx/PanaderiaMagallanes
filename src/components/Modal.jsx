import React, { useState ,useEffect} from "react";
import { AiOutlineClose } from "react-icons/ai"
import { FaFileUpload } from "react-icons/fa"
import {PasswordAndConfirmPasswordValidation} from "../components"
import { AiOutlineLeft,AiOutlineRight } from "react-icons/ai"
import { GiSmartphone } from "react-icons/gi"
import { BsTrashFill ,BsPersonFill} from "react-icons/bs"

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
    ModProdModalCallback,
    ModSellSubModalCallback,
    ModRegPedModalCallback
    
}) {
  const [modal, setModal] = useState(false);
  const [TypeModal,setTypeModal]=useState();
  const [PrevImgNewProd,setPrevImgNewProd]=useState('');
  const [NumberProd,setNumberProd]=useState(1);
  const [SelectProdItems,setSelectProdItems]=useState([]);
  const [ProdAddInputValue, setProdAddInputValue] = useState('');
  const [SaleBill,setSaleBill]=useState(0)
  const [TotalBill,setTotalBill]=useState(0);
  const [ProdReceivedValue,setProdReceiveValue]=useState(0)

  const state = {
        example: '👋'
  }

  const handleCallback = () => callback(state)

  const toggleModal = (event) => {
    setModal(!modal);
    setSelectProdItems([])
  };
  const handleAddProdButtonClick=(el)=>{
    console.log(ProdAddInputValue.target.value)
    var name=ProdAddInputValue.target.value;
    var price=ProdAddInputValue.target.options[ProdAddInputValue.target.selectedIndex].dataset.price;
    console.log(price)
    const newItem = {
      item: name,
      complete: false,
      quantity:1,
      price:price,
      total:0
    };
    if (name) {
      setSelectProdItems([...SelectProdItems, newItem]);
      setProdAddInputValue("");  
  };
    console.log(SelectProdItems)
  }


  function Total(){
    let total=0;
    // const [UlTotal,setUlTotal]=useState(0)
    SelectProdItems.forEach(el=>{
        console.log("el total con el modal: ",el.total);
        total=total+el.total
        // setUlTotal(UlTotal+el.total)
    })
    console.log(total)
    setTotalBill(total.toFixed(2))
    return total.toFixed(2)
    // return(total.toFixed(2))
}


  SelectProdItems.map(el=>{
    console.log(el.item)
    console.log(el.quantity)
    console.log(el.price)
    el.total=parseFloat(el.quantity)*parseFloat(el.price);
    var tBill=parseFloat(el.quantity)*parseFloat(el.price);
    console.log(tBill)
    console.log(el.total)
    // setTotalBill(el.total+TotalBill)
  })
  


  if(modal) {
    document.body.classList.add('active-modal')
    // console.log(SelectProdItems);
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
            outline:"none",
            fontWeight:"bold"
            
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
            <div className="ModalCont">

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
                                        <option value={element.role} selected={true} disabled hidden>{element.role}</option>
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
                            maxHeight:"150px",
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
                            maxHeight:"150px",
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
                
                {type=="RegSell"&&
                <form       // onSubmit={register}
                            onSubmit={(el)=>{
                                // alert("listo paa");
                                el.preventDefault();
                                console.log(el)
                                ModSellSubModalCallback(el,SelectProdItems,TotalBill,ProdReceivedValue)
                                // ModalCallback(el)
                                // handleClick(el, 100)
                            }}
                            // onSubmit={event => handleClick(event, 100)}
                            >
                                <div >
                                <p style={{
                                        fontWeight:"bold",
                                        marginBottom:"5px",
                                        textAlign:"left"
                                    }}>Lista de productos</p>
                                    
                                <div >
                                <label htmlFor="SelectProd" style={{
                                    display:"flex",
                                    justifyContent:"space-around",
                                    // border:"2px solid black",
                                    borderRadius:"0.3rem",
                                    outline:"none",
                                    // width:"70%",
                                    // padding:"2px",
                                    background:"#E6E6E6"

                                }}>
                                    <select name="selectProd" defaultValue={'DEFAULT'} onChange={(event) => setProdAddInputValue(event)}  id="SelectProd" required style={{
                                            // border:"2px solid black",
                                            // borderRadius:"0.3rem",
                                            // outline:"none",
                                            width:"90%",
                                            // padding:"5px"
                                            outline:"none",
                                            background:"transparent",
                                            fontWeight:"bold"
                                        }}>
                                        <option value="DEFAULT" disabled hidden>Productos</option>
                                        {
                                        element.map((el)=>(
                                            <option key={el.id} value={el.id} data-price={el.price} >{el.id} - ${el.price}</option>
                                            ))
                                        }
                                    </select>
                                    <button type="button" style={{
                                        outline:"none"
                                    }} onClick={()=>{
                                        handleAddProdButtonClick();
                                        // setNumberProd(NumberProd-1)
                                    }}>+</button>
                                </label>
                                
                   
                                <div className="prodIdCont">
                                    {SelectProdItems.map((item, index) =>(
                                    
                                    <div className='item-container' key={item.item} id={"item-container"+item.item} style={{
                                        display:"flex",
                                        justifyContent:"space-between",
                                        marginTop:"10px",
                                        background:"black",
                                        color:"white",
                                        borderRadius:"0.3rem",
                                        paddingLeft:"10px",
                                        padding:"5px"
                                    }}>
                                        <div className='item-name'>
                                        <span>{item.item} - ${(item.price*item.quantity).toFixed(2)}</span>
                                        </div>
                                        <div className='quantity' style={{
                                            display:"flex",
                                            justifyContent:"space-around",
                                            width:"30%"
                                        }}>
                                            {/* <button type="button">
                                                <AiOutlineLeft 
                                                onClick={() =>{
                                                    if(item.quantity>1){
                                                        item.quantity=item.quantity-1
                                                        document.getElementById(item.item).value=item.quantity
                                                    }
                                                }}
                                                />
                                            </button> */}
                                            <input type="number" min="1" id={item.item} placeholder={item.quantity} onChange={(el)=>{
                                                var inValue=parseFloat(el.target.value)
                                                item.quantity=inValue
                                                
                                                // setSaleBill(parseFloat(SaleBill)+inValue)
                                                var bill=0;
                                                if(inValue>=0){
                                                    console.log(inValue) 
                                                    setSaleBill(parseFloat(SaleBill)+inValue)
                                                    // console.log(SaleBill)
                                                    // console.log(SelectProdItems)
                                                    
                                                    SelectProdItems.forEach(el=>{
                                                        console.log(el.item)
                                                        if(el.item==item.item){
                                                            console.log(parseFloat(el.price))
                                                            console.log(parseFloat(inValue)*parseFloat(el.price))
                                                            bill=(bill+parseFloat(inValue)*parseFloat(el.price));
                                                        }
                                                        // bill+=parseFloat(el.price);
                                                    })
                                                    
                                                }
                                                console.log("esta es la cuenta",bill)
                                            }} style={{
                                                width:"40px",
                                                color:"black",
                                                borderRadius:"0.3rem",
                                                outline:"none"
                                            }}/>

                                            <button type="button" onClick={()=>{
                                                
                                                const index = SelectProdItems.indexOf(item);
                                                SelectProdItems.splice(index, 1);
                                                // delete SelectProdItems[index]
                                                console.log(index)
                                                console.log(SelectProdItems)
                                                document.getElementById("item-container"+item.item).style.display="none"
                                                console.log(document.getElementById("item-container"+item.item))
                                                var event = new Event('change');

                                                // document.getElementById("SelectProd").dispatchEvent(event);
                                                console.log(document.getElementById("SelectProd"))
                                                // setProdAddInputValue(ProdAddInputValue)

                                                Total();



                                            }}>
                                                <BsTrashFill size={20} style={{
                                                    color:"white"
                                                }}/>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                </div>
                                </div>
                                </div>

                                <label htmlFor="payTypeInp" style={{
                                    textAlign:"left",
                                    display:"block",
                                    marginTop:"20px"
                                }}>
                                    <p style={{
                                        fontWeight:"bold",
                                        marginBottom:"5px"
                                    }}>Método de pago</p>
                                    <select name="payType" id="payTypeInp" required style={{
                                        // border:"2px solid black",
                                        borderRadius:"0.3rem",
                                        outline:"none",
                                        width:"100%",
                                        padding:"5px",
                                        background:"#E6E6E6",
                                        fontWeight:"bold",
                                    }} onChange={(e)=>{
                                        // setCreateUserRole(e.target.value);
                                    }}>
                                        <option value="Card">Tarjeta</option>
                                        <option value="Cash">Efectivo</option>
                                    </select>
                                </label>






                            <label htmlFor="prodCommentsInp" style={{
                                textAlign:"left",
                                display:"block",
                                marginTop:"20px"
                            }}>
                                <p style={{
                                    fontWeight:"bold",
                                    marginBottom:"5px"
                                }}>Comentarios</p>
                                <textarea name="comments" id="prodCommentsInp" cols="30" rows="10" maxLength="500"   style={{
                                    // border:"2px solid black",
                                    borderTopLeftRadius:"0.3rem",
                                    borderTopRightRadius:"0.3rem",
                                    outline:"none",
                                    width:"100%",
                                    maxHeight:"80px",
                                    padding:"10px",
                                    resize:"none",
                                    background:"#E6E6E6",
                                    fontWeight:"bold",
                                }}></textarea>
                            </label>

                            <label htmlFor="prodReceiveInp" style={{
                                textAlign:"left",
                                display:"block",
                                marginTop:"20px"
                            }}>
                                <p style={{
                                    fontWeight:"bold",
                                    marginBottom:"5px"
                                }}>Cantidad recibida</p>
                                <div style={{
                                    borderRadius:"0.3rem",
                                    outline:"none",
                                    width:"100%",
                                    padding:"5px",
                                    background:"#E6E6E6",
                                    fontWeight:"bold",
                                    display:"flex"
                                }}>
                                <p>$</p>
                                <input type="number" name="" min="0" id="prodReceiveInp" onChange={(el)=>setClientNum(el.target.value)} style={{
                                    background:"transparent",
                                    width:"100%",
                                    outline:"none",
                                    fontWeight:"bold"
                                }} />
                                </div>
                            </label>


                            <p style={{
                                textAlign:"left",
                                background:"#D0C4F0",
                                borderRadius:"0.3rem",
                                padding:"5px",
                                fontWeight:"bold",
                                position:"absolute",
                                bottom:"70px",
                                left:"30px",
                            }}>Total: $<Total/></p>
                            <br />
                            <p style={{
                                textAlign:"left",
                                background:"#ff9494",
                                borderRadius:"0.3rem",
                                padding:"5px",
                                fontWeight:"bold",
                                position:"absolute",
                                right:"30px",
                                bottom:"70px"
                            }}>Cambio: ${(ProdReceivedValue-TotalBill).toFixed(2)}</p>
                            <br />
                            
                            <button 
                            style={{
                                background:"#9CEF94",
                                padding:"10px",
                                fontSize:"1.5vw",
                                fontWeight:"bold",
                                position:"absolute",
                                right:"10%",
                                left:"10%",
                                borderRadius:"0.5rem",
                                bottom:"10px"
                            }} >Guardar e imprimir ticket</button>
                        
                    </form>
                }
                {type=="RegOrder"&&
                        <form       // onSubmit={register}
                            onSubmit={(el)=>{
                                // alert("listo paa");
                                el.preventDefault();
                                console.log(el)
                                ModRegPedModalCallback(el,SelectProdItems,TotalBill,ProdReceivedValue)
                                // ModSellSubModalCallback(el,SelectProdItems,TotalBill,ProdReceivedValue)
                                // ModalCallback(el)
                                // handleClick(el, 100)
                            }}
                            // onSubmit={event => handleClick(event, 100)}
                            >   

                                <label htmlFor="NameClient" style={{
                                textAlign:"left",
                                display:"block",
                                marginTop:"20px"
                            }}>

                                <p style={{
                                    fontWeight:"bold",
                                    marginBottom:"5px"
                                }}>Nombre del cliente</p>
                                <div style={{
                                    borderRadius:"0.3rem",
                                    outline:"none",
                                    width:"100%",
                                    padding:"5px",
                                    background:"#E6E6E6",
                                    fontWeight:"bold",
                                    display:"flex"
                                }}>
                                    <BsPersonFill size={20} style={{
                                        margin:"auto"
                                    }}/>
                                    <input type="text" required name="tel" min="0" id="NameClient"  style={{
                                        background:"transparent",
                                    width:"100%",
                                    outline:"none",
                                    fontWeight:"bold",
                                    marginLeft:"5px"
                                }} />
                                </div>
                            </label>
                            <br />
                                <div >
                                <p style={{
                                        fontWeight:"bold",
                                        marginBottom:"5px",
                                        textAlign:"left"
                                    }}>Lista de productos</p>
                                    
                                <div >
                                <label htmlFor="SelectProd" style={{
                                    display:"flex",
                                    justifyContent:"space-around",
                                    // border:"2px solid black",
                                    borderRadius:"0.3rem",
                                    outline:"none",
                                    // width:"70%",
                                    // padding:"2px",
                                    background:"#E6E6E6"

                                }}>
                                    <select name="selectProd" defaultValue={'DEFAULT'} onChange={(event) => setProdAddInputValue(event)}  id="SelectProd" required style={{
                                            // border:"2px solid black",
                                            // borderRadius:"0.3rem",
                                            // outline:"none",
                                            width:"90%",
                                            // padding:"5px"
                                            outline:"none",
                                            background:"transparent",
                                            fontWeight:"bold"
                                        }}>
                                        <option value="DEFAULT" disabled hidden>Productos</option>
                                        {
                                        element.map((el)=>(
                                            <option key={el.id} value={el.id} data-price={el.price} >{el.id} - ${el.price}</option>
                                            ))
                                        }
                                    </select>
                                    <button type="button" style={{
                                        outline:"none"
                                    }} onClick={()=>{
                                        handleAddProdButtonClick();
                                        // setNumberProd(NumberProd-1)
                                    }}>+</button>
                                </label>
                                
                   
                                <div className="prodIdCont">
                                    {SelectProdItems.map((item, index) =>(
                                    
                                    <div className='item-container' key={item.item} id={"item-container"+item.item} style={{
                                        display:"flex",
                                        justifyContent:"space-between",
                                        marginTop:"10px",
                                        background:"black",
                                        color:"white",
                                        borderRadius:"0.3rem",
                                        paddingLeft:"10px",
                                        padding:"5px"
                                    }}>
                                        <div className='item-name'>
                                        <span>{item.item} - ${(item.price*item.quantity).toFixed(2)}</span>
                                        </div>
                                        <div className='quantity' style={{
                                            display:"flex",
                                            justifyContent:"space-around",
                                            width:"30%"
                                        }}>
                                            {/* <button type="button">
                                                <AiOutlineLeft 
                                                onClick={() =>{
                                                    if(item.quantity>1){
                                                        item.quantity=item.quantity-1
                                                        document.getElementById(item.item).value=item.quantity
                                                    }
                                                }}
                                                />
                                            </button> */}
                                            <input type="number" min="1" id={item.item} placeholder={item.quantity} onChange={(el)=>{
                                                var inValue=parseFloat(el.target.value)
                                                item.quantity=inValue
                                                
                                                // setSaleBill(parseFloat(SaleBill)+inValue)
                                                var bill=0;
                                                if(inValue>=0){
                                                    console.log(inValue) 
                                                    setSaleBill(parseFloat(SaleBill)+inValue)
                                                    // console.log(SaleBill)
                                                    // console.log(SelectProdItems)
                                                    
                                                    SelectProdItems.forEach(el=>{
                                                        console.log(el.item)
                                                        if(el.item==item.item){
                                                            console.log(parseFloat(el.price))
                                                            console.log(parseFloat(inValue)*parseFloat(el.price))
                                                            bill=(bill+parseFloat(inValue)*parseFloat(el.price));
                                                        }
                                                        // bill+=parseFloat(el.price);
                                                    })
                                                    
                                                }
                                                console.log("esta es la cuenta",bill)
                                            }} style={{
                                                width:"40px",
                                                color:"black",
                                                borderRadius:"0.3rem",
                                                outline:"none"
                                            }}/>

                                            <button type="button" onClick={()=>{
                                                
                                                const index = SelectProdItems.indexOf(item);
                                                SelectProdItems.splice(index, 1);
                                                // delete SelectProdItems[index]
                                                console.log(index)
                                                console.log(SelectProdItems)
                                                document.getElementById("item-container"+item.item).style.display="none"
                                                console.log(document.getElementById("item-container"+item.item))
                                                var event = new Event('change');

                                                // document.getElementById("SelectProd").dispatchEvent(event);
                                                console.log(document.getElementById("SelectProd"))
                                                // setProdAddInputValue(ProdAddInputValue)

                                                Total();



                                            }}>
                                                <BsTrashFill size={20} style={{
                                                    color:"white"
                                                }}/>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                </div>
                                </div>
                                </div>

                                <label htmlFor="payTypeInp" style={{
                                    textAlign:"left",
                                    display:"block",
                                    marginTop:"20px"
                                }}>
                                    <p style={{
                                        fontWeight:"bold",
                                        marginBottom:"5px"
                                    }}>Método de pago</p>
                                    <select name="payType" id="payTypeInp" required style={{
                                        // border:"2px solid black",
                                        borderRadius:"0.3rem",
                                        outline:"none",
                                        width:"100%",
                                        padding:"5px",
                                        background:"#E6E6E6",
                                        fontWeight:"bold",
                                    }} onChange={(e)=>{
                                        // setCreateUserRole(e.target.value);
                                    }}>
                                        <option value="Card">Tarjeta</option>
                                        <option value="Cash">Efectivo</option>
                                    </select>
                                </label>





                            <label htmlFor="prodDate" style={{
                                textAlign:"left",
                                display:"block",
                                marginTop:"20px"
                            }}>
                                <p style={{
                                    fontWeight:"bold",
                                    marginBottom:"5px"
                                }}>Fecha de entrega</p>
                                <input type="datetime-local" required name="prodDate" id="" style={{
                                        // border:"2px solid black",
                                        borderRadius:"0.3rem",
                                        outline:"none",
                                        width:"100%",
                                        padding:"5px",
                                        background:"#E6E6E6",
                                        fontWeight:"bold",
                                    }}/>
                            </label>
                            <label htmlFor="telClient" style={{
                                textAlign:"left",
                                display:"block",
                                marginTop:"20px"
                            }}>

                                <p style={{
                                    fontWeight:"bold",
                                    marginBottom:"5px"
                                }}>Número de contacto</p>
                                <div style={{
                                    borderRadius:"0.3rem",
                                    outline:"none",
                                    width:"100%",
                                    padding:"5px",
                                    background:"#E6E6E6",
                                    fontWeight:"bold",
                                    display:"flex"
                                }}>
                                    <GiSmartphone size={20} style={{
                                        margin:"auto"
                                    }}/>
                                    <input type="tel" required name="telClient" min="0" id="telClient" style={{
                                    background:"transparent",
                                    width:"100%",
                                    outline:"none",
                                    fontWeight:"bold"
                                }} />
                                </div>
                            </label>

                            <label htmlFor="prodCommentsInp" style={{
                                textAlign:"left",
                                display:"block",
                                marginTop:"20px"
                            }}>
                                <p style={{
                                    fontWeight:"bold",
                                    marginBottom:"5px"
                                }}>Comentarios</p>
                                <textarea name="comments" id="prodCommentsInp" cols="30" rows="10" maxLength="500"   style={{
                                    // border:"2px solid black",
                                    borderTopLeftRadius:"0.3rem",
                                    borderTopRightRadius:"0.3rem",
                                    outline:"none",
                                    width:"100%",
                                    maxHeight:"80px",
                                    padding:"10px",
                                    resize:"none",
                                    background:"#E6E6E6",
                                    fontWeight:"bold",
                                }}></textarea>
                            </label>

                            <label htmlFor="prodReceiveInp" style={{
                                textAlign:"left",
                                display:"block",
                                marginTop:"20px"
                            }}>
                                <p style={{
                                    fontWeight:"bold",
                                    marginBottom:"5px"
                                }}>Cantidad recibida</p>
                                <div style={{
                                    borderRadius:"0.3rem",
                                    outline:"none",
                                    width:"100%",
                                    padding:"5px",
                                    background:"#E6E6E6",
                                    fontWeight:"bold",
                                    display:"flex"
                                }}>
                                <p>$</p>
                                <input type="number" step=".01" name="" min="0" id="prodReceiveInp" onChange={(el)=>setProdReceiveValue(el.target.value)} style={{
                                    background:"transparent",
                                    width:"100%",
                                    outline:"none",
                                    fontWeight:"bold"
                                }} />
                                </div>
                            </label>
                            <p style={{
                                textAlign:"left",
                                background:"#D0C4F0",
                                borderRadius:"0.3rem",
                                padding:"5px",
                                fontWeight:"bold",
                                position:"absolute",
                                bottom:"70px",
                                left:"30px",
                            }}>Total: $<Total/></p>
                            <br />
                            <p style={{
                                textAlign:"left",
                                background:"#ff9494",
                                borderRadius:"0.3rem",
                                padding:"5px",
                                fontWeight:"bold",
                                position:"absolute",
                                right:"30px",
                                bottom:"70px"
                            }}>Cambio: ${(ProdReceivedValue-TotalBill).toFixed(2)}</p>
                            <br />
                            
                            <button 
                            style={{
                                background:"#9CEF94",
                                padding:"10px",
                                fontSize:"1.5vw",
                                fontWeight:"bold",
                                position:"absolute",
                                right:"10%",
                                left:"10%",
                                borderRadius:"0.5rem",
                                bottom:"10px"
                            }} >Generar pedido</button>
                    </form>
                }
            </div>
          </div>
        </div>
      )}
    </>
  );
}