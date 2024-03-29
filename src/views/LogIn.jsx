import React,{useState,useEffect} from "react";
import {createUserWithEmailAndPassword,onAuthStateChanged,signOut,getIdToken,signInWithEmailAndPassword, getIdTokenResult,deleteUser, sendEmailVerification} from "firebase/auth"
import { Layout} from "../components";
import { Notifications, Modal} from "../components"
import { auth,db,storage } from "../firebase/firebaseConfig";
import { doc, collection, setDoc ,getDoc,getDocs,deleteDoc,onSnapshot,addDoc, updateDoc, increment,query,orderBy } from "firebase/firestore";
import { ref, uploadBytes,getDownloadURL} from "firebase/storage";
import {updatePassword,updateProfile} from "firebase/auth"
import { Calendar } from "../components/calendar/App";
import {Loader,PasswordAndConfirmPasswordValidation,CompAlert} from "../components"
import {SellersComp} from "../components";
import { FaSignOutAlt,FaUserAlt,FaTicketAlt,FaSearch,FaMoneyBillAlt} from "react-icons/fa"
import { RiFilePaper2Fill } from "react-icons/ri"
import { IoIosSettings } from "react-icons/io"
import { BsFillInboxesFill } from "react-icons/bs"
import { GiSuitcase } from "react-icons/gi"
import { GrFormAdd } from "react-icons/gr"
// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Modal from "react-bootstrap/Modal"


import { jsPDF } from "jspdf";


import "../components/styles/login.css"

import PanImg from "../assets/img/pan.jpg"
// import { Alert } from "bootstrap";

function LogIn(){




    // const locales = {
    // "en-US": require("date-fns/locale/en-US"),
    // };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);




    const [Email,setEmail]=useState('');
    const [CurrentUserRole,SetCurrentUserRole]=useState('');
    const [DashboardPage,setDashboardPage]=useState('Dash');
    const [Password,setPassword]=useState('');
    const [user,SetUser]=useState({});
    const [TotalIncomes,setTotalIncomes]=useState('');
    

    const[Sellers,setSellers]=useState({});
    const[UsSellers,SetUsSellers]=useState([]);

    const [CreateUserEmail,setCreateUserEmail]=useState('')
    const [CreateUserPassword,setCreateUserPassword]=useState('')
    const [CreateUserRole,setCreateUserRole]=useState('Seller');
    const [CreateUserName,setCreateUserName]=useState('');
    const [CreateUserTel,setCreateUserTel]=useState('');


    const [SellClName,setSellClName]=useState('');
    const [SellProd,setSellProd]=useState('');
    const [SellEnDate,setSellEnDate]=useState('');
    const [SellContNumber,setSellContNumber]=useState('');
    const [SellComments,setSellComments]=useState('');

    const [RegSellProd,setRegSellProd]=useState('');
    const [RegSellBill,setRegSellBill]=useState('');
    const [RegSellComments,setRegSellComments]=useState('');
    const [TicketUrl,setTicketUrl]=useState('')

    const [Sales,setSales]=useState([]);
    const [FilterSales,setFilterSales]=useState([]);

    const [AllUsers,setAllUsers]=useState([]);
    const [AllProd,setAllProd]=useState([])
    const [FilterUser,setFilterUser]=useState([]);
//    const localizer = momentLocalizer(moment) // or globalizeLocalizer
    // var UsSellers=[];

    const [Orders,setOrders]=useState([]);
    const [resetTimestamp,setResetTimestamp]=useState('')
    
    // const handlePass=(pass)=>{
    //     setCreateUserPassword(pass.password);
    // }

    const [ModalType, setModalType] = useState('');

    const [ModalCallbackState,setModalCallbackState]=useState('');


const handleSearchInputChange = (e) => {
  e.preventDefault();
  const filterUser= AllUsers.filter((user)=>{
        return user.name.match(e.target.value)
    })
    setFilterUser(filterUser);
};

const handleSearchInputSellsChange=(e)=>{
    e.preventDefault();
    console.log(e.target.value)
    const FSales= Sales.filter((sale)=>{
        return sale.date.toDate().toLocaleDateString('sp-MX',{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}).match(e.target.value)
    })
    setFilterSales(FSales);
}   


const handleTicket=(prod,bill,comments)=>{
// Landscape export, 2×4 inches
const doc = new jsPDF({
  orientation: "landscape",
  unit: "in",
  format: [3.15, 3.15]
});
// doc.text(prod, 1, 1);
console.log("esto es lo que recibio el ticket: ",prod)
doc.text(bill, 1, 2);
doc.text(comments, 1, 3);
// doc.save("tikcet.pdf");
return doc
}





    const ModalCallback=el=>{
        setModalCallbackState(el);
        console.log("username:",el.target.username.value)
        let userName=el.target.username.value;
        console.log("usType:",el.target.usType.value)
        let usType=el.target.usType.value
        console.log("email:",el.target.email.value)
        let email=el.target.email.value
        console.log("tel:",el.target.tel.value)
        let tel=el.target.tel.value
        console.log("pass:",el.target.pass.value)
        let pass=el.target.pass.value
        if(confirm("La información es correcta?")){
            console.log("Correcta")
            register(userName,usType,email,tel,pass);
        }else{
            console.log("Incorrecta")
        }
    }

    const NewProdModalCallback=el=>{
        let proImg=el.target.img.files[0]
        let proName=el.target.name.value
        let proPrice=el.target.price.value
        let prodDesc=el.target.desc.value
        console.log(proName,proPrice,prodDesc,proImg)
        const docuRef = doc(db, `products/${proName}`);
        const storageRef = ref(storage, `products/${proName}`);
            uploadBytes(storageRef, proImg).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                getDownloadURL(snapshot.ref).then(function(downloadURL) {
                    console.log("File available at", downloadURL);
                        setDoc(docuRef, { 
                            url:downloadURL,
                            name:proName,
                            price:proPrice,
                            desc:prodDesc
                        }).then(()=>{
                            alert("produdcto agregado correctamente");
                        }).catch(err=>{
                            console.log(err)
                        })
                });

            });
    }

    const ModProdModalCallback=el=>{
        let proImg=el.target.img.files[0]
        let proName=el.target.name.value
        let proPrice=el.target.price.value
        let prodDesc=el.target.desc.value
        console.log(proName,proPrice,prodDesc,proImg)
    }


    const ChangeUsModalCallback=el=>{
        // alert("guardando cambios");
        // console.log(el.target)
        // console.log("diste click a:", el.target.saveChg.value)
        console.log("username:",el.target.username.value)
        let userName=el.target.username.value;
        console.log("usType:",el.target.usType.value)
        let usType=el.target.usType.value
        console.log("email:",el.target.email.value)
        let email=el.target.email.value
        console.log("tel:",el.target.tel.value)
        let tel=el.target.tel.value
        console.log("pass:",el.target.pass.value)
        let pass=el.target.pass.value
        if(confirm("La información es correcta?")){
            console.log("Correcta")
            // register(userName,usType,email,tel,pass);
        }else{
            console.log("Incorrecta")
        }
    }
    const DelUsModalCallback=async(el)=>{
        let uid=el.id;
        console.log("username:",el.name)
        let userName=el.name;
        console.log("usType:",el.role)
        let usType=el.role
        console.log("email:",el.email)
        let email=el.email
        console.log("tel:",el.tel)
        let tel=el.tel
        console.log("pass:",el.pass)
        let pass=el.pass
        if(confirm(`Quieres borrar a ${userName} ?`)){
            console.log("Correcta")
            console.log(el)

        }else{
            console.log("Incorrecta")
        }
    }








    const HandleChangeStatus=(el)=>{
        
        const docuRef = doc(db, `orders/${el.SubDate}`);
        if((el.status).toLowerCase()=="por hacer"){
            setDoc(docuRef, { 
            SubDate: el.SubDate, 
            client: el.client,
            comments: el.comments,
            contact: el.contact,
            deliver: el.deliver,
            prod: el.prod,
            status:"en proceso" 
        });
        }
        if((el.status).toLowerCase()=="en proceso"){
            setDoc(docuRef, { 
            SubDate: el.SubDate, 
            client: el.client,
            comments: el.comments,
            contact: el.contact,
            deliver: el.deliver,
            prod: el.prod,
            status:"entregado" 
        });
        }
        if((el.status).toLowerCase()=="entregado"){
            setDoc(docuRef, { 
            SubDate: el.SubDate, 
            client: el.client,
            comments: el.comments,
            contact: el.contact,
            deliver: el.deliver,
            prod: el.prod,
            status:"por hacer" 
        });
        }
        alert("cambio de status realizado, refresque la ventana para ver cambios");
      }
            const getUsers= async()=>{

                const citiesRef = collection(db,'usuarios');
                const snapshot = await getDocs(citiesRef);
                
                snapshot.forEach(doc => {
                    if((doc.data().role).toLowerCase()=="seller"){
                        SetUsSellers(oldArray => [...oldArray, doc.data()]);
                    }
                });
            }

            const getOrders=async()=>{
                const OrdersRef=collection(db,"orders");
                const OrderSnapshot= await getDocs(OrdersRef);
                if(Orders.length<=0){
                 OrderSnapshot.forEach(doc=>{
                    console.log("El documento recuperado es:",doc.data());
                    setOrders(oldArray => [...oldArray, doc.data()]);

                })
                console.log("Las ordenes son estas: ",Orders);
                Orders.sort((a, b) => a.deliver > b.deliver)
                }
                else{
                    console.log("Las ordenes son estas: ",Orders);

                }
            }
        
            const getSales= async()=>{
                setSales([]);
                const docRef = doc(db, `incomes/week`);
                // const docSnap = await getDoc(query(docRef, orderBy('timestamp')));
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                // SetCurrentUserRole((docSnap.data().role).toLowerCase());
                    console.log("los sales son: ",docSnap.data().sells)
                    // setSales(docSnap.data().sells)
                    if(docSnap.data().sells){
                        Object.keys(docSnap.data().sells).forEach((key) =>{
                        console.log(key);
                        console.log(docSnap.data().sells[key]);
                        console.log(docSnap.data().sells[key].date);
                        console.log(((docSnap.data().sells[key].date).toDate()));
                        
                        setSales(current => [...current, docSnap.data().sells[key]]);
                    })
                    console.log(Sales)
                    }
                } else {
                console.log("No such document!");
                }

            }
            const getAllUsers= async()=>{
                await getDocs(collection(db, "usuarios"))
                .then((querySnapshot)=>{               
                    const newData = querySnapshot.docs
                        .map((doc) => ({...doc.data(), id:doc.id }));
                    setAllUsers(newData);                
                    console.log("Los valores obtenidos de los user son: ",AllUsers, newData);
                })
            }
            const getAllProd= async()=>{
                await getDocs(collection(db, "products")).then((snapshot)=>{
                    const newData = snapshot.docs
                        .map((doc) => ({...doc.data(), id:doc.id }));
                        // setAllProd(newData);
                    // setAllUsers(newData);
                    // newData.sort();
                    newData.sort((a, b) => a.id.localeCompare(b.id))
                    setAllProd(newData);
                    // setAllUsers(newData);
                    console.log("Los valores obtenidos de los products son: ",AllProd ,newData);
                })
                // AllProd.sort();
            }
            
      useEffect(() => {

        setTimeout(() => {
            document.getElementById("NavIcon").style.filter="invert(100%)"
            document.getElementById("menContainer").style.display="none"
            document.getElementById("social").style.display="none"
        }, 2000);   


        // Actualiza el título del documento usando la API del navegador
            onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            
            SetUser(currentUser);
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = currentUser.email;
            console.log(uid)
            console.log(currentUser)
            
            currentUser.getIdTokenResult().then(tIdTokenResult=>{
                console.log(tIdTokenResult.claims)
            })

            const getInfoUser= async()=>{
                const docRef = doc(db, `usuarios/${uid}`);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                SetCurrentUserRole((docSnap.data().role).toLowerCase());
                } else {
                console.log("No such document!");
                }
            }
            getInfoUser();
            const getTotalIncomes= async()=>{
                const docRef = doc(db, `incomes/week`);
                const docSnap = onSnapshot(docRef, (doc) => {
                    console.log("Current data: ", doc.data());
                    console.log("Current data: ", (doc.data().resetDay).toDate());
                    var timestamp=(doc.data().resetDay).toDate()
                    let day = timestamp.getDate();
                    // console.log(day);
                    let month = timestamp.getMonth();
                    // console.log(month + 1);
                    let year = timestamp.getFullYear();
                    // console.log(year);
                    let format2 = day + "/" + month + "/" + year;
                    // console.log(format2)
                    console.log("Reset Day Date: ",timestamp.getDate())
                    console.log("Reset Month Date: ",timestamp.getMonth())
                    setResetTimestamp(timestamp)
                    setTotalIncomes(doc.data().income);
                });
            }
            getTotalIncomes();


            // ...
        } else {
            // User is signed out
            // ...
            SetUser();
            console.log("user sign out")
        }
        });

      },[]);
  


    const register= async(userName,usType,email,tel,pass)=>{
        // e.preventDefault();
        console.log(email, pass, usType);
        
        try{
            // const userCredential= await createUserWithEmailAndPassword(auth,email,pass);
            // const user = userCredential.user;
            const docuRef = doc(db, `usuarios/${email.toLowerCase()}`);
            setDoc(docuRef, { 
                name: userName,
                role: usType,
                email: email, 
                tel: tel,
                pass: pass
            }).then(async()=>{
                await createUserWithEmailAndPassword(auth,email,pass);
                updateProfile(auth.currentUser,{
                    displayName:userName,
                    // phoneNumber:tel
                }).then(async() => {
                    console.log("Profile updated")
                        await sendEmailVerification(auth.currentUser).then(el=>{
                            console.log("correo de verificación enviado")
                            setInterval(() => {
                                location.reload();
                            }, 1000);
                        }).catch(err=>{
                            console.log(err.message)
                        })
                }).catch((error) => {
                    console.log(error.message)
                });
                
            }).catch(err=>{
                console.log(err.message)
            })
            
        }
        catch(error){
            console.log(error.message)
            alert(error.message)
        }
        
        
    }
    
    const login= async (e)=>{
        e.preventDefault();
        try{
            const userCredential= await signInWithEmailAndPassword(auth,Email,Password);
            const user = userCredential.user;
        }
        catch(error){
            console.log(error.message)
            alert(error.message)
        }
    }
    const logout= async ()=>{
    await signOut(auth);
    }


    const ModRegPedModalCallback= async(el,SelectProdItems,TotalBill,ProdReceivedValue)=>{
        console.log(el.target)
        const name=el.target.NameClient.value;
        const prod=el.target.selectProd.value;
        const payType=el.target.payType.value;
        const prodDate=el.target.prodDate.value;
        const tel=el.target.telClient.value;
        const comments=el.target.comments.value;
        const Total=TotalBill;
        const Received=ProdReceivedValue;
        console.log("El name del cliente es:",name)
        console.log("El prod del cliente es:",prod)
        console.log("El pay del cliente es:",payType)
        console.log("El date del cliente es:",prodDate)
        console.log("El tel del cliente es:",tel)
        console.log("El comments del cliente es:",comments)

        // console.log(SelectProdItems)
        // console.log(TotalBill)
        // console.log(ProdReceivedValue)
        var Dt=new Date();
        var fecha = Dt.getDate() + '-' + ( Dt.getMonth() + 1 ) + '-' + Dt.getFullYear()+'('+Dt.getHours() +':'+ Dt.getMinutes() + ':' + Dt.getSeconds()+')';
        // el.preventDefault();
        try{
            const docuRef = doc(db, `orders/${fecha}`);
            setDoc(docuRef, { 
                client: name, 
                prod:prod,
                deliver:prodDate,
                contact:tel,
                comments:comments,
                status:"por hacer",
                SubDate:fecha,
                payType:payType,
                total:Total,
                received:Received
            });
            alert("pedido generado");
        }
        catch(error){
            console.log(error.message)
        }

    }
    // const RegPed=async(el)=>{
    //     var Dt=new Date();
    //     var fecha = Dt.getDate() + '-' + ( Dt.getMonth() + 1 ) + '-' + Dt.getFullYear()+'('+Dt.getHours() +':'+ Dt.getMinutes() + ':' + Dt.getSeconds()+')';
    //     el.preventDefault();
    //     try{
    //         const docuRef = doc(db, `orders/${fecha}`);
    //         setDoc(docuRef, { 
    //             client: SellClName, 
    //             prod:SellProd,
    //             deliver:SellEnDate,
    //             contact:SellContNumber,
    //             comments:SellComments,
    //             status:"por hacer",
    //             SubDate:fecha
    //         });
    //         alert("pedido generado");
    //     }
    //     catch(error){
    //         console.log(error.message)
    //     }
    // }


    // const ModSellSubModalCallback=(el,items)=>{
    //     var payType=el.target.payType.value
    //     var bill=el.target.bill.value
    //     var comments=el.target.comments.value
    //     console.log(payType,bill,comments,items)
    // }

    const ModSellSubModalCallback=async(el,items,TotalBill,ProdReceivedValue)=>{
        //  el.preventDefault();
         let received=ProdReceivedValue;
         let prod=items;
         let bill=TotalBill;
         let comments=el.target.comments.value;
         let payType=el.target.payType.value;

        if(bill>received){
            alert("debes recibir el total de la cuenta");
        }
        else{
            
         console.log(prod,bill,comments)
         console.log(handleTicket(prod,bill,comments).output('blob'))
         let blobTicket=handleTicket(prod,bill,comments).output('blob')
        var Dt=new Date();
        var fecha = Dt.getDate() + '-' + ( Dt.getMonth() + 1 ) + '-' + Dt.getFullYear()+'('+Dt.getHours() +':'+ Dt.getMinutes() + ':' + Dt.getSeconds()+')';
        const storageRef = ref(storage, `sells/${fecha}`);
        // const docuRef = doc(db, `tikcets/${fecha}`);
        const docuRef = doc(db, `sales/${fecha}`);
        const incomeRef = doc(db, `incomes/week`);
        const incomeRefProd = doc(db, `incomes/week/${fecha}/${bill}`);
        const docSnap = await getDoc(incomeRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data().income);
            setDoc(incomeRef,{
                income:parseFloat(docSnap.data().income)+parseFloat(bill)
            }
            ,
            {merge:true}
            )
            uploadBytes(storageRef, blobTicket).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                // var ticketUrl;
                getDownloadURL(snapshot.ref).then(function(downloadURL) {
                    console.log("File available at", downloadURL);
                    // setTicketUrl(downloadURL);
                    // ticketUrl=downloadURL;
                    // setDoc(docRef)
                        // setDoc(docuRef, { 
                        //     url:downloadURL,
                        //     name:proName,
                        //     price:proPrice,
                        //     desc:prodDesc
                        // }).then(()=>{
                        //     alert("produdcto agregado correctamente");
                        // }).catch(err=>{
                        //     console.log(err)
                        // })
 
                        try{
                            setDoc(docuRef, { 
                                prod: prod, 
                                bill: bill,
                                comments: comments,
                                user: user.email,
                                date: Dt,
                                payMethod:payType,
                                ticket:downloadURL,
                                received:received
                            });
                            let dir=`incomes/week/12`
                            const dbRef = doc(db,"incomes/week");
                            const sells={}
                            sells[Dt]={
                                prod: prod, 
                                bill: bill,
                                comments: comments,
                                user: user.email,
                                ticket:downloadURL,
                                date: Dt,
                                payMethod:payType,
                                received:received
                            }
                            setDoc(dbRef,{
                                sells
                            },
                            {merge:true}
                            )
                            alert("venta generada");
                        }
                        catch(error){
                            console.log(error.message)
                        }
                });
                console.log("File available at this:", TicketUrl);
        });
        } else{
            console.log("No such document!");
            }
        }
    }



    
    if(user){
        if(user.emailVerified){
        if(CurrentUserRole=="admin"){
            return(
        <Layout>
            <section
            style={{
                width:"99.3vw",
                // background:"rgba(0,0,0,0.5)",
                background:"white"
            }}
            className="h-screen flex items-center justify-center text-center " data-scroll-section
            >

            {/* <Loader/> */}


                <div style={{
                    display:"flex",
                    height:"80vh",
                    marginTop:"10vh"
                }}>
                    <div style={{
                        
                        // background:"rgba(255,255,255,0.1)",
                        background:"white",
                        // padding:"10px",
                        color:"black",
                        width:"20vw",
                        textAlign:"center"
                        
                    }}>

                    <br />
                    <br />
                    <ul style={{
                        listStyle:"none",
                        padding:"0",
                        margin:"0",
                        height:"80%",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"space-between",
                        // textAlign:"left"
                    }}>
                        <li className="MenEl"><button onClick={()=>{
                            setDashboardPage("Dash")
                            
                        }}><GiSuitcase/>Dashboard</button></li>
                        <li className="MenEl"><button onClick={()=>{
                            setDashboardPage("Users")
                            getAllUsers();
                        }}> <FaUserAlt/> Usuarios</button></li>
                        <li className="MenEl"><button onClick={()=>{
                            setDashboardPage("Prod")
                            getAllProd();
                        }}><FaTicketAlt/> Productos</button></li>
                        <li className="MenEl"><button onClick={()=>{
                            setDashboardPage("Store")
                        }}><BsFillInboxesFill/> Almacén</button></li>
                        <li className="MenEl"><button onClick={()=>{
                            setDashboardPage("Sellers")
                            UsSellers.length<=0&&getUsers()
                            
                        }}>Vendedores</button></li>
                        <li className="MenEl"><button onClick={()=>{
                            setDashboardPage("Returns")
                        }}>Devoluciones</button></li>
                        <li>
                            <div>
                                <FaUserAlt style={{
                                        background:"black",
                                        color:"white",
                                        width:"50px",
                                        height:"50px",
                                        padding:"10px",
                                        borderRadius:"10rem",
                                        margin:"auto"
                                        // position:"absolute"
                                }}/>
                                
                                {user.displayName?<strong>{user.displayName}</strong>:<strong>username</strong>}
                                <p>{user.email}</p>
                                <div style={{
                                    display:"flex",
                                    justifyContent:"space-around",

                                }}>
                                    <button 
                                    style={{
                                    // background:"rgb(191, 30, 30)",
                                    fontSize:"80%",
                                    padding:"5px",
                                    borderRadius:"0.3rem",
                                    outline:"none",
                                    color:"black",
                                    textAlign:"center !important",
                                    border:"1px solid black"
                                    }}> <IoIosSettings size={20}/> </button>
                                    <button 
                                    onClick={logout} style={{
                                    // background:"rgb(191, 30, 30)",
                                    fontSize:"80%",
                                    padding:"5px",
                                    borderRadius:"0.3rem",
                                    outline:"none",
                                    color:"black",
                                    textAlign:"center !important",
                                    border:"1px solid black"
                                    }}> <FaSignOutAlt size={20}/> </button>
                                </div>

                            </div>
                        </li>
                    </ul>
                    
                    </div>
                    <div style={{
                        background:"rgba(255,255,255,0.3)",
                        width:"78vw",
                        color:"black"
                    }}>
                        {/* AQUI SE PONDRA DEPENDIENDO DEL BOTON CLICADO*/}
                        {
                         DashboardPage=="Dash" && 
                         <div>
                            <div>
                            <div className="IngDashMain">
                                <button className="IngDash" onClick={()=>{
                                    // alert("diste click");
                                    setDashboardPage("Incomes")
                                    getAllProd();
                                    getSales();
                                }}>
                                    <strong style={{
                                        fontSize:"2vw"
                                    }}>Ingresos</strong>
                                    <br />
                                    <strong style={{
                                        fontSize:"3vw",
                                        letterSpacing:"5px"
                                    }}>$ <span>{TotalIncomes}</span></strong>
                                    <p style={{
                                        opacity:"50%",
                                        fontSize:"1.5vw",
                                    }}><span>{resetTimestamp.getDate()} - {(resetTimestamp.getDate())+7}</span> de <span>{Intl.DateTimeFormat('sp', { month: 'long' }).format(new Date(resetTimestamp))}</span></p>
                                </button>
                            </div>

                            </div>
                         </div>
                        }
                        {/* AQUI SE PONDRA DEPENDIENDO DEL BOTON CLICADO*/}
                        {
                            DashboardPage=="Incomes"&&
                            <div>
                                <p style={{
                                    width:"80%",
                                    // border:"2px solid black",
                                    textAlign:"left",
                                    margin:"auto",
                                    marginBottom:"20px"
                                }}>Últimas ventas</p>
                                <table style={{
                                    width:"80%",
                                    border:"2px solid black",
                                    textAlign:"center",
                                    margin:"auto",
                                }}>
                                    <tbody>
                                    <tr>
                                            {/* <th>ID</th> */}
                                            <th>Fecha</th>
                                            <th>Ingreso</th>
                                            <th>Vendedor</th>
                                            <th>Método de pago</th>
                                            <th>Recibo</th>
                                    </tr>
                                        {
                                             Sales.sort((a, b) => a.date < b.date ? 1:-1)?.map((el)=>(
                                                <tr key={el.key}>
                                                    {/* <td>{el.prod}</td> */}
                                                    {/* <td>{el.date}</td> */}
                                                    <td>
                                                    {el.date.toDate().toLocaleTimeString('sp-MX',{hour12: false})} - {el.date.toDate().toLocaleDateString('sp-MX',{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
                                                    </td>
                                                    <td>{el.bill}</td>
                                                    <td>{el.user}</td>
                                                    <td>{el.payMethod}</td>
                                                    <td><button onClick={()=>{
                                                        if(el.ticket){
                                                            window.open(el.ticket)
                                                        }else{
                                                            alert("Ticket no disponible")
                                                        }
                                                        
                                                    }}>ver</button></td>
                                                </tr>
                                            )) 
                                        }
                                        </tbody>
                                </table>
                            </div>
                        }
                        {/* AQUI SE PONDRA DEPENDIENDO DEL BOTON CLICADO*/}
                        {DashboardPage=="Users"&&
                        <div>                   
                            <Modal 
                                title="Agregar nuevo usuario"
                                type="NewUser"
                                // callback={callback}
                                ModalCallback={ModalCallback}
                            />
                            <div>
                            
                            <label htmlFor="searchUser" style={{
                                display:"flex",
                                alignContent:"center",
                                width:"80%",
                                // cursor:"pointer",
                                margin:"auto",
                                alignItems:"center",
                                border:"2px solid black",
                                padding:"10px",
                                borderRadius:"0.5rem",
                                marginTop:"30px",
                                marginBottom:"30px"
                            }}>
                                <FaSearch/>
                                <input type="text" id="searchUser" placeholder="Buscar por nombre"
                                onChange={handleSearchInputChange}
                                // value={searchInput} 
                                 style={{
                                    outline:"none",
                                    paddingLeft:"10px",
                                    width:"100%"
                                }}/>
                            </label>


                            <table style={{
                                width:"80%",
                                // borderRadius:"0.5rem",
                                border:"2px solid black",
                                textAlign:"center",
                                margin:"auto",
                            }}>
                            <tbody>
                                <tr style={{
                                    borderBottom:"2px solid black"
                                }}>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Tipo</th>
                                        <th>Email</th>
                                        <th>Télefono</th>
                                        {/* <th> </th> */}
                                </tr>
                                    {   
                                        FilterUser.map((el,index)=>(
                                            <tr key={el.id}>
                                                <td>{el.id}</td>
                                                <td>{el.name}</td>
                                                <td>{el.role}</td>
                                                <td>{el.email}</td>
                                                <td>{el.tel}</td>
                                                <td>
                                                <Modal 
                                                    title="Modificar usuario"
                                                    type="ModUser"
                                                    fontBtn="15px"
                                                    BgColorBtn="#C4DBF0"
                                                    paddingBtn="0"
                                                    displayBtn="block"
                                                    widthBtn="100%"
                                                    borderRadBtn="0.2rem"
                                                    element={el}
                                                    DelUsModalCallback={DelUsModalCallback}
                                                    ChangeUsModalCallback={ChangeUsModalCallback}
                                                    />            
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            </div>
                        </div>
                        }
                        {DashboardPage=="Prod"&&
                        <div>
                            <div>
                            
                            <Modal 
                                title="Agregar nuevo producto"
                                type="NewProd"
                                NewProdModalCallback={NewProdModalCallback}
                            />
                            
                            </div>
                            <div className="prodList">
                                {
                                    AllProd.map((el)=>(
                                            <Modal 
                                                title={el.id}
                                                type="ModProd"
                                                fontBtn="2vw"
                                                heightBtn="200px"
                                                BgColorBtn="#C4DBF0"
                                                BgImgBtn={el.url}
                                                paddingBtn="0"
                                                displayBtn="block"
                                                widthBtn="100%"
                                                borderRadBtn="0.2rem"
                                                element={el}
                                                ModProdModalCallback={ModProdModalCallback}
                                            /> 
                                        ))
                                
                                }

                                {/* <button key={el.id} className="prodListEl" style={{
                                                backgroundImage: `url("${el.url}")` 
                                            }}>{el.id}</button> */
                                }

                                {/* <button className="prodListEl">hola</button>
                                <button className="prodListEl">ola</button>
                                <button className="prodListEl">hola</button>
                                <button className="prodListEl">ola</button>
                                <button className="prodListEl">hola</button>
                                <button className="prodListEl">ola</button> */}
                            </div>
                        </div>
                        }
                        {DashboardPage=="Store"&&<div>Store</div>}
                        {DashboardPage=="Sellers"&&
                        <div>
                            <h1 className="TitleClickDash">Sellers</h1>
                            {/* <SellersComp/> */}
                            {
                                <div>{UsSellers.map(userS =>
                                    <div key={userS.email} style={{
                                        display:"flex",
                                        justifyContent:"space-around",
                                        marginTop:"10px"
                                    }}>
                                        <p>{userS.email}</p>
                                        <p>{userS.role}</p>
                                        <button style={{
                                            background:"green",
                                            color:"white",
                                            fontSize:"1vw",
                                            padding:"4px",
                                            borderRadius:"0.2rem",
                                            cursor:"pointer",
                                            outline:"none"
                                        }}>Ver</button>
                                    </div>
                                    )}
                                </div>
                            }
                        </div>}
                        {DashboardPage=="Returns"&&<div>Returns</div>}
                        {/* AQUI SE PONDRA DEPENDIENDO DEL BOTON CLICADO*/}
                        <br/>
                    </div>
                </div>


            </section>
            
        </Layout>
        )
        }
        if(CurrentUserRole=="seller"){
            console.log("contenido solo disponible para admins");
            return(

                //SELLER DASHBOARD
        <Layout>
            <section
            style={{
                width:"99.3vw",
                // background:"rgba(0,0,0,0.5)",
            }}
            className="h-screen flex items-center justify-center text-center " data-scroll-section
            >

            {/* <Loader/> */}


                <div style={{
                    display:"flex",
                    height:"80vh",
                    marginTop:"10vh"
                }}>
                    <div style={{
                        
                        background:"rgba(255,255,255,0.1)",
                        // padding:"10px",
                        color:"black",
                        width:"20vw",
                        textAlign:"center"
                        
                    }}>
                    <br />
                    <br />
                    <ul style={{
                        listStyle:"none",
                        padding:"0",
                        margin:"0",
                        height:"80%",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"space-between",
                        // textAlign:"left"
                    }}>
                        <li className="MenEl"><button onClick={()=>{
                            setDashboardPage("RegSell");
                            getSales();
                            getAllProd();
                        }}><FaMoneyBillAlt/>Ventas</button></li>
                        <li className="MenEl"><button onClick={()=>{
                            
                            setDashboardPage("RegOrder")
                            getOrders();
                            
                        }}><RiFilePaper2Fill/>Pedidos</button></li>
                        {/* <li className="MenEl"><button onClick={()=>{
                            setDashboardPage("StatOrder")
                            getOrders();
                        }}>Status Pedido</button></li> */}
                        <li>
                        <div>
                                <FaUserAlt style={{
                                        background:"black",
                                        color:"white",
                                        width:"50px",
                                        height:"50px",
                                        padding:"10px",
                                        borderRadius:"10rem",
                                        margin:"auto"
                                        // position:"absolute"
                                }}/>
                                
                                {user.displayName?<strong>{user.displayName}</strong>:<strong>username</strong>}
                                <p>{user.email}</p>
                                <div style={{
                                    display:"flex",
                                    justifyContent:"space-around",

                                }}>
                                    <button 
                                    style={{
                                    // background:"rgb(191, 30, 30)",
                                    fontSize:"80%",
                                    padding:"5px",
                                    borderRadius:"0.3rem",
                                    outline:"none",
                                    color:"black",
                                    textAlign:"center !important",
                                    border:"1px solid black"
                                    }}> <IoIosSettings size={20}/> </button>
                                    <button 
                                    onClick={logout} style={{
                                    // background:"rgb(191, 30, 30)",
                                    fontSize:"80%",
                                    padding:"5px",
                                    borderRadius:"0.3rem",
                                    outline:"none",
                                    color:"black",
                                    textAlign:"center !important",
                                    border:"1px solid black"
                                    }}> <FaSignOutAlt size={20}/> </button>
                                </div>

                            </div>
                        </li>
                    </ul>
                    
                    </div>
                    <div style={{
                        background:"rgba(255,255,255,0.3)",
                        width:"78vw",
                        color:"black"
                    }}>
                        {/* AQUI SE PONDRA DEPENDIENDO DEL BOTON CLICADO*/}
                        {DashboardPage=="RegSell"&&
                        <div>
                            {/* <h1 className="TitleClickDash">Registrar Venta</h1> */}
                            <Modal
                                title="Vender"
                                type="RegSell"
                                element={AllProd}
                                ModSellSubModalCallback={ModSellSubModalCallback}
                                BgColorBtn="#D0C4F0"
                            />
                            <p style={{
                                marginTop:"30px",
                                textAlign:"left",
                                width:"80%",
                                margin:"auto"
                            }}>Últimas ventas</p>

                            <label htmlFor="searchUser" style={{
                                display:"flex",
                                alignContent:"center",
                                width:"80%",
                                // cursor:"pointer",
                                margin:"auto",
                                alignItems:"center",
                                border:"2px solid black",
                                padding:"10px",
                                borderRadius:"0.5rem",
                                // marginTop:"30px",
                                marginBottom:"30px"
                            }}>
                                <FaSearch/>
                                <input type="text" id="searchUser" placeholder="Buscar venta"
                                onChange={handleSearchInputSellsChange}
                                // value={searchInput} 
                                 style={{
                                    outline:"none",
                                    paddingLeft:"10px",
                                    width:"100%"
                                }}/>
                            </label>


                            <table style={{
                                    width:"80%",
                                    border:"2px solid black",
                                    textAlign:"center",
                                    margin:"auto",
                                }}>
                                <tbody>
                                    <tr>
                                            {/* <th>ID</th> */}
                                            <th>Fecha</th>
                                            <th>Ingreso</th>
                                            <th>Vendedor</th>
                                            <th>Método de pago</th>
                                            <th>Recibo</th>
                                    </tr>

                                        

                                        {
                                             FilterSales.sort((a, b) => a.date < b.date ? 1:-1)?.map((el)=>(
                                                <tr key={el.key}>
                                                    {/* <td>{el.prod}</td> */}
                                                    {/* <td>{(el.date).toString()}</td> */}
                                                    {/* <td>{(el.date).toDate().toString()}</td> */}
                                                    <td>
                                                    {el.date.toDate().toLocaleTimeString('sp-MX',{hour12: false})} - {el.date.toDate().toLocaleDateString('sp-MX',{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
                                                    </td>
                                                    <td>{el.bill}</td>
                                                    <td>{el.user}</td>
                                                    <td>{el.payMethod}</td>
                                                    <td><button onClick={()=>{
                                                        if(el.ticket){
                                                            window.open(el.ticket)
                                                        }else{
                                                            alert("Ticket no disponible")
                                                        }
                                                        
                                                    }}>ver</button></td>
                                                </tr>
                                            )) 
                                        }
                                    </tbody>
                                </table>
                            










                            {/* <form onSubmit={HandleSellSub}>
                                <input type="text" placeholder="Producto" name="prod" required onChange={(e)=>{
                                    // console.log(e.target.value);
                                    setRegSellProd(e.target.value);
                                }}/>
                                <br />
                                <input type="number" placeholder="Cuenta"  name="bill" required onChange={(e)=>{
                                    setRegSellBill(e.target.value);
                                    }}/>
                                <br />
                                <textarea name="comments" id="" cols="30" rows="10" placeholder="Comentarios" required onChange={(e)=>{ 
                                    setRegSellComments(e.target.value);
                                                                    
                                }}></textarea>
                                <br />
                                <input type="submit" value="Enviar" />
                                <button type="button" onClick={handleTicket}>recibo</button>
                            </form> */}
                        </div>
                        }
                        {DashboardPage=="RegOrder"&&
                        <div>
                            <Modal
                                title="Realizar nuevo pedido"
                                type="RegOrder"
                                element={AllProd}
                                ModRegPedModalCallback={ModRegPedModalCallback}
                                BgColorBtn="#F0C4E4"
                            />
                            
                         <div>
                            <Calendar
                                EventOrders={Orders}
                            />
                         </div>




{/* 


                            <form action="" onSubmit={RegPed}>
                                <input type="text" name="NameClient" id="" placeholder="Nombre del Cliente"  required onChange={(el)=>{
                                    console.log(el.target.value)
                                    setSellClName(el.target.value);
                                }}/>
                                <br />
                                <input type="text" name="Product" id="" placeholder="Producto" required onChange={(el)=>{
                                    console.log(el.target.value)
                                    setSellProd(el.target.value);
                                }}/>
                                <br />
                                <label htmlFor="Date" style={{
                                    display:"flex",
                                    justifyContent:"center",
                                    background:"white"
                                }}>
                                    <p>Fecha de entrega:</p>
                                    <input type="datetime-local" name="Date" id="Date" required onChange={(el)=>{
                                        console.log(el.target.value)
                                        setSellEnDate(el.target.value);
                                    }}/>
                                </label>
                                
                                <br />
                                <input type="tel" name="Contact" id="" placeholder="Número de contacto" required onChange={(el)=>{
                                    console.log(el.target.value)
                                    setSellContNumber(el.target.value);
                                }}/>
                                <br />
                                <textarea name="Comments" id="" cols="30" rows="10" placeholder="Comentarios" required onChange={(el)=>{
                                    console.log(el.target.value)
                                    setSellComments(el.target.value);
                                }}></textarea>
                                <br />
                                <input type="submit" value="Registrar" />
                            </form> */}
                        </div>}
                        {/* {DashboardPage=="StatOrder"&&
                        <div>
                         <div>
                            <Calendar
                                EventOrders={Orders}
                            />
                         </div>

                        </div>} */}
                        {/* AQUI SE PONDRA DEPENDIENDO DEL BOTON CLICADO*/}
                        <br/>
                    </div>
                </div>
            </section>
        </Layout>
        )
        }
        if(CurrentUserRole=="store"){
            console.log("contenido solo disponible para admins");
            return(

                //SELLER DASHBOARD
        <Layout>
            <section
            style={{
                width:"99.3vw",
                background:"rgba(0,0,0,0.5)",
            }}
            className="h-screen flex items-center justify-center text-center " data-scroll-section
            >

            {/* <Loader/> */}


                <div style={{
                    display:"flex",
                    height:"80vh",
                    marginTop:"10vh"
                }}>
                    <div style={{
                        
                        background:"rgba(255,255,255,0.1)",
                        // padding:"10px",
                        color:"black",
                        width:"20vw",
                        textAlign:"center"
                        
                    }}>
                    <p style={{
                        overflow:"hidden",
                    }}>{user.email}</p>
                    <hr />
                    <br />
                    <br />
                    <ul style={{
                        listStyle:"none",
                        padding:"0",
                        margin:"0",
                        height:"80%",
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"space-between",
                        // textAlign:"left"
                    }}>
                        <li className="MenEl"><button onClick={()=>{
                            setDashboardPage("ChSells")
                        }}>Revisar Ventas</button></li>
                        <li className="MenEl"><button onClick={()=>{
                            setDashboardPage("CRUDStore")
                            
                        }}>CRUD Almacén</button></li>
                        <li className="MenEl"><button onClick={()=>{
                            setDashboardPage("RegDev")
                        }}>Devolución</button></li>
                        <li>
                            <button 
                            onClick={logout} style={{
                            background:"rgb(191, 30, 30)",
                            fontSize:"80%",
                            padding:"5px",
                            borderRadius:"0.3rem",
                            outline:"none",
                            color:"white",
                            textAlign:"center !important"
                            }}>LogOut</button>
                        </li>
                    </ul>
                    
                    </div>
                    <div style={{
                        background:"rgba(255,255,255,0.3)",
                        width:"78vw",
                        color:"black"
                    }}>
                        <h1 style={{
                            fontSize:"30px",
                            fontWeight:"bold",
                            textAlign:"left",
                            padding:"2vw",
                            borderBottom:"solid 2px black"
                        }}>Stores Dashboard</h1>
                        {/* AQUI SE PONDRA DEPENDIENDO DEL BOTON CLICADO*/}
                        {DashboardPage=="ChSells"&&
                        <div>
                            <h1>ChSells</h1>
                        </div>
                        }
                        {DashboardPage=="CRUDStore"&&<div>CRUDStore</div>}
                        {DashboardPage=="RegDev"&&<div>RegDev</div>}
                        {/* AQUI SE PONDRA DEPENDIENDO DEL BOTON CLICADO*/}
                        <br/>
                    </div>
                </div>
            </section>
        </Layout>
        )
        }
    }else{
        return(
            <Layout>
            <section
            style={{
                width:"99.3vw",
            }}
            className="h-screen flex items-center justify-center text-center " data-scroll-section
            >
                <div>
                    <h2 style={{
                        color:"black",
                        fontWeight:"bold",
                        fontSize:"5vh"
                    }}>Verifica tu correo para continuar</h2>
                    <button onClick={async function(){
                        await sendEmailVerification(auth.currentUser).then(el=>{
                            console.log("correo de verificación enviado")
                            alert("correo enviado");
                        }).catch(err=>{
                            console.log(err.message)
                            alert(err.message)
                        })
                    }} style={{
                        color:"black",
                        background:"yellow",
                        padding:"10px",
                        borderRadius:"0.3rem",
                        fontWeight:"bold",
                        outline:"none"
                    }}>Enviar correo</button>
                </div>
            </section>
        </Layout>
        )
    }
    
    }
    else{
    return(
    <Layout>
        
        <section 
            style={{
            // width:"99.3vw",
            display:"flex",
            color:"black",
            justifyContent:"space-evenly"
        }}
        // className="h-screen flex items-center justify-center text-center sect" data-scroll-section
        >
        <div style={{
            // background:"red",
            width:"50%",
            textAlign:"center",
            height:"100vh"
        }}
        >


        <form onSubmit={login} style={{
                color:"black",
                marginTop:"30vh"
            }}>
                <h1 style={{
                fontSize:"5vw",
                fontWeight:"bold"
                }}>Bienvenido</h1>


                <input type="text" required placeholder="Ingresa tu email" onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                 style={{
                    borderRadius:"0.2rem",
                    outline:"none",
                    padding:"5px",
                    fontWeight:"bold",
                    border:"2px solid black",
                    width:"25vw"
                }}/>
                <br/>
                <br/>
                <input type="password" required placeholder="・・・・・・"  onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                style={{
                    borderRadius:"0.2rem",
                    outline:"none",
                    padding:"5px",
                    fontWeight:"bold",
                    border:"2px solid black",
                    width:"25vw",
                    color:"black"
                }}/>
                <br/>
                <br/>
                <input type="submit"  value="Ingresar" style={{
                    color:"white",
                    background:"black",
                    padding:"10px",
                    width:"25vw",
                    borderRadius:"0.3rem",
                    cursor:"pointer"
                }}/>
            </form>





        </div>
        <div style={{

            backgroundImage: `url(${PanImg})`,
            width:"50%",
            textAlign:"center",
            height:"100vh",
            backgroundPosition:"center",
            backgroundRepeat:"no-repeat",
            backgroundSize:"cover",
            // filter: "grayscale(1)"
        }}>
        </div>


        <div style={{
            position:"absolute",
            left:"10px",
            bottom:"10px",
            fontWeight:"bold"
        }}>
            <p>© Panaderia Magallanes 2023</p>
        </div>

        </section>
    </Layout>
    )
    }
}
export default LogIn