import React, { useEffect } from "react";
import "../components/styles/notFound.css"
function NotFound(){
    useEffect(()=>{
        var n = 10;
        var l = document.querySelector(".count");
        window.setInterval(function(){
            document.querySelector("body").style.backgroundColor="rgb(0, 1, 17)"
          l.innerHTML = n;
          console.log(n)
          n--;
          if(n==0){
            document.querySelector(".BackBtn").click();
          }
        },1000);
    })

    return(
        <div className="Cont">
            <div className="Err">
            
            <h1 >404</h1>
            </div>
            <div className="Err2">
            <h2>PAGINA NO ENCONTRADA</h2>
            <h3>Regresando a principal en: <span className="count"></span></h3>
            <button className="BackBtn" onClick={()=>{
                window.open(window.location.origin,"_self")
            }}>Regresar</button>
            </div>
        </div>
    )
}

export default NotFound;