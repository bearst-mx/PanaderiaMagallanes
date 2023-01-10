import {db} from "./firebaseConfig"
import{collection,getDocs,getDoc,query,doc,addDoc,deleteDoc,updateDoc} from "firebase/firestore"
// import { async } from "@firebase/util"
export const getPic= async()=>{
    const result= await getDocs(query(collection(db,"products")))
    return result
}