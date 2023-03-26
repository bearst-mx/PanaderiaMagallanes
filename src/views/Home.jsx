import React, { useEffect } from "react";
import { Layout } from "../components/";
import "../components/styles/home.css";
import gsap from "gsap";
import useLocoScroll from "../hooks/useLocoScroll";
import {AiOutlineDown} from"react-icons/ai"
import {HiOutlineMenuAlt4} from"react-icons/hi"
import {BsArrowDown} from "react-icons/bs"
import ImgCircle from "../assets/img/pan3.jpg"
function Home(){
    useLocoScroll();
    // useEffect(()=>{
    //     const split =(".Title")
    //     gsap.to(split,{
    //         duration:1,
    //         y:0,
    //         opacity:1,
    //         stagger:0.1,
    //         ease:"power2",
    //     })

    // });
        
    return(
        <Layout>
            <div>
            <div >
            <section id="intro" className="h-screen flex items-center justify-center text-center sect" data-scroll-section>
                     <div className="sect1">
                        <h1
                        style={{
                        
                        }}
                        >Tradición que llega al corazón.
                        </h1>
                        <BsArrowDown className="downSvg" size={30}/>
                </div>
            </section>

            <section id="section2"  data-scroll-section>
                <div className="container" >
                <div id="about" className="lg:grid grid-cols-2 gap-4 items-start" style={{
                height:"200vh"
                
            }}>
                    <div className="font-extrabold" data-scroll data-scroll-sticky data-scroll-target="#about">
                        
                        <div className="sect2" style={{
                            
                        }}>
                            <h1
                            style={{
                            
                            }}
                            >Tradición familiar desde <span style={{
                                borderBottom:"3px solid white"
                            }}>1964.</span>
                            </h1>
                            <BsArrowDown className="downSvg" size={30}/>
                        </div>
                    </div>
                </div>
                </div>
            </section>



            <section id="section3"  data-scroll-section>
                <div className="container" >
                <div id="sect3" className="lg:grid grid-cols-2 gap-4 items-start" style={{
                height:"200vh"
                
            }}>
                    <div className="text-5xl" data-scroll data-scroll-sticky data-scroll-target="#sect3">
                        
                        <div className="sect3" style={{
                            
                        }}>
                        <h1
                            style={{
                            
                            }}
                            >Conoce nuestra <span >historia.</span>
                            </h1>
                            <BsArrowDown className="downSvg" size={30}/>
                        </div>
                    </div>
                </div>
                </div>
            </section>
            </div>

        </div>
        </Layout>
    )
}

export default Home