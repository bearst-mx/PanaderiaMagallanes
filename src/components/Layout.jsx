import React, { useEffect } from "react";
import "../components/styles/layout.css"
import {GiHamburgerMenu} from"react-icons/gi"
import {MdClose} from"react-icons/md"
import {BsInstagram,BsFacebook} from "react-icons/bs"
import {AiOutlineWhatsApp} from "react-icons/ai"
import {BiMoney} from "react-icons/bi"
import {HiOutlineMenuAlt4 ,HiOutlineArrowNarrowRight} from "react-icons/hi"
import {TbArrowNarrowUp} from "react-icons/tb"
import {useState} from"react"
import LogoImg from "../assets/img/logo/magallanesWhite.png"
import LogoImgBlack from "../assets/img/logo/magallanesBlack.png"
import {IoCompass} from "react-icons/io5"
import {Loader} from "../components"


function Layaout({ children }){
    const [open,setOpen]=useState(false);
    const HamburgerIcon=<HiOutlineMenuAlt4 className="MenuBtnIconOpen" size={40} 
    style={{
            
            margin:"auto"
    }}/>
    const CloseHamburgerIcon=<MdClose className="MenuBtnIconClose" size={40} 
    style={{
            
            margin:"auto"
    }}/>

    if(open){
        document.querySelector(".menContainer").style.left="0";
        document.querySelector(".menContainer").style.backgroundColor="#BBCDE5"
        document.querySelector(".createdBy").style.display="block"
    }else{
        setTimeout(() => {
            document.querySelector(".menContainer").style.left="91vw";
            document.querySelector(".menContainer").style.background="transparent"
            document.querySelector(".createdBy").style.display="none"
        }, 100);
    }

    return(
        <div>
        {/* <div className="charge">
            <img src={LogoImg} alt="panaderia magallanes logo" width="100%"/>
        </div> */}

        <Loader/>




        {/* <div className="cursor"></div> */}
        <nav className="nav">
                 <ul>
                    <li>
                        <a href="/">
                            <img src={LogoImg} id="NavIcon" className="NavIcon" alt="panaderia magallanes" width="100%" style={{
                                width:"13vw",
                                
                            }}/>
                        </a>
                    </li>

                </ul>
                <div className="menContainer" id="menContainer">
                            <ul>
                                <li>
                                {/* <HiOutlineArrowNarrowRight className="arrow arrowOne"/> */}
                                <a 
                                // onMouseOver={()=>{
                                //     document.querySelector(".arrowOne").style.display="block"
                                // }} 
                                // onMouseOut={()=>{
                                //     document.querySelector(".arrowOne").style.display="none"
                                // }}
                                href="/history">Nuestra historia</a></li>
                                <li>
                                {/* <HiOutlineArrowNarrowRight className="arrow arrowTwo"/> */}
                                <a 
                                // onMouseOver={()=>{
                                //     document.querySelector(".arrowTwo").style.display="block"
                                // }}
                                // onMouseOut={()=>{
                                //     document.querySelector(".arrowTwo").style.display="none"
                                // }}
                                href="/panaderia">Panadería</a></li>
                                <li>
                                {/* <HiOutlineArrowNarrowRight className="arrow arrowThree"/> */}
                                <a 
                                // onMouseOver={()=>{
                                //     document.querySelector(".arrowThree").style.display="block"
                                // }}
                                // onMouseOut={()=>{
                                //     document.querySelector(".arrowThree").style.display="none"
                                // }}
                                href="#footer"
                                onClick={()=>{
                                    // alert(window.location.origin+"#footer")
                                    // window.open(window.location.origin+"#footer","_self")
                                    setTimeout(() => {
                                        location.reload();
                                    }, 100);
                                }}>Contacto</a></li>
                            </ul>
                            <p className="createdBy" style={{
                                // textAlign:"right",
                                // width:"92%",
                                // marginTop:"80px",
                                // fontWeight:"normal",
                                // bottom:"10px"
                                position:"absolute",
                                right:"80px",
                                bottom:"20px",
                                fontFamily:"Mont-ExtraLight"

                            }}>created by <a href="https://bearst.com.mx" target="_blank"><strong>bearst.com.mx</strong></a></p>
                </div>
                <div className="social" id="social">
                        <a className="menuIcon" 
                        onClick={()=>{
                            setOpen(!open)
                        }}
                        >
                        {open ? CloseHamburgerIcon:HamburgerIcon}
                        </a>
                        <ul>
                            <li><a href="#" className="SocialIconB"><BsInstagram size={40}/></a></li>
                            <li><a href="#" className="SocialIconB"><BsFacebook size={40}/></a></li>
                            <li><a href="#" className="SocialIconB"><AiOutlineWhatsApp size={40}/></a></li>
                        </ul>
                </div>

            {/* {open ? CloseHamburgerIcon:HamburgerIcon}
            {open &&
                <ul>
                    <li><a href="/" onClick={CloseHamburgerMenu}>Principal</a></li>
                    <li><a href="/Galery" onClick={CloseHamburgerMenu}>Galeria</a></li>
                    <li><a href="/About" onClick={CloseHamburgerMenu}>About</a> </li>
                </ul>
            } */}

        </nav>
        <p id="up"></p>
        <main id="main-container">
        {children}
        </main>


        <div className="mapSec h-screen text-center" data-scroll-section
        style={{
            display:"flex"
        }}
        >
            <div className="dir">
                <h2>
                <span>Estamos en</span>
                <br/>
                Manuel Azpiroz 
                <br/>
                #1940
                <br/>
                <span>Guadalajara,jal</span>
                </h2>
                <a href="https://goo.gl/maps/Y8296roaWRAkeQ1R9" target="_blank">Visitanos</a>
            </div>
            <IoCompass className="compassImg" size={350} style={{
                margin:"auto"
            }}/>
        </div>

        <footer id="footer" className="h-screen text-center" data-scroll-section>

                <img src={LogoImgBlack}/>
                <div>
                    <h3>
                    Llámanos al
                    <br/>
                    <span ><a href="Tel:33-38-25-84-71" target="_blank" style={{
                        fontWeight:"normal"
                    }}>33-38-25-84-71</a></span>
                    
                    </h3>
                    <p className="msg">Ó mandanos un e-mail a <strong><a href="mailto:Imaganesorozco@yahoo.com" target="_blank" style={{
                        textDecoration:"underline"
                    }}>Imaganesorozco@yahoo.com</a></strong></p>
                </div>
                <div style={{
                    display:"flex",
                    justifyContent:"space-around",
                    marginTop:"10vh"
                }}>
                    <p>©2022 Panadería Magallanes</p>
                    <p>Created by <strong><a href="https://bearst.com.mx" target="_blank">bearst.com.mx</a></strong></p>
                </div>
                <a onClick={()=>
                    window.open(location.href,"_self")
                    } className="UpBtn"><TbArrowNarrowUp size={40}/></a>
        </footer>
        </div>
    )
}
export default Layaout;