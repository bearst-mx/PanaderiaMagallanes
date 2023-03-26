import React, { useEffect, useState } from "react";
import Layaout from "../components/Layout";
import "../components/styles/panaderia.css"
import Skeleton,{SkeletonTheme} from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import LogoImg from "../assets/img/logo/magallanesBlack.png"
import PanPrueba from "../assets/img/pan.jpg"
import Masonry from 'react-masonry-css'
import {storage,db} from "../firebase/firebaseConfig"
import { collection, getDocs } from "firebase/firestore";
import {getPic} from "../firebase/getPic"
// import { async } from "@firebase/util";

// import useLocoScroll from "../hooks/useLocoScroll";
// const citiesRef = collection(db, "products");


function Panaderia(){
    const [loading,setLoading]=useState(true);
    const [pics,setPics]=useState(null);
    const getPicData= async()=>{
        const pic=await getPic();
        setPics(pic.docs)
    }
    
    var colorBg=['#84b6f4','#f7cae4','#f9d99a','#dcd9f8','#bae0f5','#d3bcf6','#ff9c9c']
    const randomBgColor=()=>{
        const c=Math.floor(Math.random() * colorBg.length);
        // console.log(colorBg[c])
        return(colorBg[c])
    }
    useEffect(()=>{
        
        getPicData();
        document.querySelector(".NavIcon").src=LogoImg;
        document.querySelector(".menuIcon").style.color="black"
        document.querySelectorAll(".SocialIconB").forEach((a)=>{
            a.style.color="black"
        })
        setTimeout(() => {
            setLoading(false)
        }, 8000);
    },[])
    const SkLoader=()=>{
        return(
            <Layaout>
                <SkeletonTheme baseColor="rgba(255, 255, 255, 0.200)" highlightColor="rgba(255, 255, 255, 0.100)" >
                <div className="gridContainer" style={{
                marginTop:"20vh"
            }}>
                    <Skeleton height="30vh" style={{
                    backgroundColor:"#BBCDE5"
                    }}/>
                    <Skeleton height="30vh" style={{
                    backgroundColor:"#A1C8D0"
                    }}/>
                    <Skeleton height="30vh" style={{
                    backgroundColor:"#D8BCDE"
                    }}/>
            </div>
            </SkeletonTheme>
            </Layaout>
        )
    }

    if(loading){
        return(SkLoader())
    }
    else{
    const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
    };


    return(
        <Layaout>
        
        <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        style={{
                marginTop:"20vh",
                padding:"10vw",
                paddingTop:"0"
            }}
            >
            {
                pics &&pics.map(p=><div style={{
                    backgroundColor:randomBgColor(),
                    padding:"40px"
                }}
                key={p.id.toUpperCase()}
                ><p>{p.id.toUpperCase()}</p><img style={{
                    width:"100%",
                    margin:"auto"
                }} key={p.id} src={p.data().url}/></div>)
            }
        </Masonry>

        </Layaout>
    )
    }
}
export default Panaderia