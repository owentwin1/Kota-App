'use client'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { doc, setDoc ,addDoc,collection,getDocs,onSnapshot,query,where,deleteDoc } from "firebase/firestore"; 
import { db } from "../firebase";

function Loginscreen(props:{user:string,setuser:Dispatch<SetStateAction<string>>}) {
    const [state, setstate] = useState('login')
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [newusername, setnewusername] = useState('')
    const [newpassword, setnewpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')

    const login = async () => {
        
        const userRef = collection(db, "user");
        const q1 = query(userRef, where("username", "==", username), where("password", "==", password));
        const querySnapshot = await getDocs(q1);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        props.setuser(doc.data().username)
        });
    }

    const insertUser = async () => {
       if (newpassword == confirmpassword) {
        const docRef = await addDoc(collection(db, "user"), {
            username: newusername,
            password: newpassword,
          }).then(()=>{
            alert('the user has been inserted')
            props.setuser(newusername)
          });
       }else{
            alert('your password does not match')
       }
        
    }

    
  return (
    <div className=' flex justify-center mt-5'>
        {state == 'login' ? (
            <div className="w-full max-w-xs">
            <h1 className="block text-gray-700 text-center text-3xl font-bold mb-2" >
                    Login
            </h1>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='username' >
                    Username
                </label>
                <input value={username} onChange={(e)=>setusername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                </div>
                <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='password'>
                    Password
                </label>
                <input value={password} onChange={(e)=>setpassword(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                <p className="text-red-500 text-xs italic">Please enter a password.</p>
                </div>
                <div className="flex items-center justify-between">
                <button onClick={login} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Login
                </button>
                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#" onClick={()=>setstate('registration')}>
                    Registration
                </a>
                </div>
            </div>
            <p className="text-center text-gray-500 text-xs">
                &copy;2024 Acme Corp. All rights reserved.
            </p>
    </div>
        ):(
            <div className="w-full max-w-xs">
        <h1 className="block text-gray-700 text-center text-3xl font-bold mb-2" >
                Registration
        </h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='newusername' >
                Username
            </label>
            <input value={newusername} onChange={(e)=>setnewusername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newusername" type="text" placeholder="Username" />
            </div>
            <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='newpassword'>
                Password
            </label>
            <input value={newpassword} onChange={(e)=>setnewpassword(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="newpassword" type="password" placeholder="******************" />
            <p className="text-red-500 text-xs italic">Please enter a password.</p>
            </div>
            <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='confirmpassword'>
                Confirm Password
            </label>
            <input value={confirmpassword} onChange={(e)=>setconfirmpassword(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  id="confirmpassword" type="password" placeholder="******************" />
            <p className="text-red-500 text-xs italic">Please confirm the password.</p>
            </div>
            <div className="flex items-center justify-between">
            <button onClick={()=>insertUser()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Registration
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#" onClick={()=>setstate('login')}>
                Login
            </a>
            </div>
        </div>
        <p className="text-center text-gray-500 text-xs">
            &copy;2024 Acme Corp. All rights reserved.
        </p>
</div>
        )}
    
    </div>
  )
}

export default Loginscreen