import React,{useState,useEffect} from "react";
import LogoImg from "../assets/img/logo/magallanesWhite.png"
function Loader(){
const [loading,setLoading]=useState(false);
useEffect(()=>{
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
            document.querySelector(".charge").style.right="100vw"
            setTimeout(() => {
                // document.querySelector(".charge").style.display="none !important"
                document.querySelectorAll(".charge").forEach(e=>{
                    e.style.display="none"
                })
                console.log("cerrado")
            }, 500);
        }, 1000);
    },[])
    return(

        <div className="charge">
            <img src={LogoImg} alt="panaderia magallanes logo" width="100%"/>
        </div>
    )
}
export default Loader;