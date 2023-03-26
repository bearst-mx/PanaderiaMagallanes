import React,{useState,useEffect} from 'react';
import { GrFormNext ,GrFormPrevious} from "react-icons/gr"

export const CalendarHeader = ({ onNext, onBack, dateDisplay ,numEvents,events}) => {
    useEffect(() => {
        console.log("los eventos dentro del calendar son: ",events)
    }, [events])
    


  return(
    <div id="header">
      <div id="monthDisplay"> 
        <button onClick={onBack} id="nextButton"><GrFormPrevious/></button>
        {dateDisplay}
        <button onClick={onNext} id="nextButton"><GrFormNext/></button>
        </div>
      {/* <div>
        <button onClick={onBack} id="backButton">Back</button>
        <button onClick={onNext} id="nextButton">Next</button>
      </div> */}
      <div>
        
        <div>
        <p className='evDivLaunch' style={{
          color:"gray",
          fontSize:"15px",
          marginRight:"5vw"
        }}>{numEvents} pedidos restantes</p>

        <div className='evDivCont'>
          <ul style={{
            textAlign:"left",
            paddingLeft:"2vw"
          }}>
            {
            events.map((ev) => 
            <li>

            {dateDisplay==new Date((ev.deliver)).toLocaleString('sp-MX',{month: 'long'}).toLowerCase() + " " +new Date((ev.deliver)).getFullYear()&&
            <li>
            <a className='LiEvClients' href="#" 
            // style={{
              
            //   // borderBottom:"2px solid "+"red"
            // }}
            
              style={
                ev.status=="entregado"?{
                  borderBottom:"2px solid green"
                }:ev.status=="por hacer"?{
                  borderBottom:"2px solid orange"
                }:{
                  borderBottom:"2px solid red"
                }
              }

            >{ev.client}</a>
            </li>
            }
            {/* {dateDisplay} */}
            </li>

            )
            }
            {/* {events.data} */}
            {/* {events.map(el=>{
              <li key={el.client}>
                {el.client}
              </li>
            })} */}
            {/* {events.map((el,i) => <li key={i}>{el.client}</li>)} */}
            {/* <li>{Ev[0].title}</li> */}
            {/* <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li> */}
          </ul>
        </div>
        </div>
        

      </div>
    </div>
  );
};
