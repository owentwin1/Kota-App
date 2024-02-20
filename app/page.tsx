'use client'
import Image from "next/image";
import Loginscreen from "./Loginscreen";
import { useEffect, useState } from "react";
import Homescreen from "./Homescreen";

export default function Home() {
  const [user, setuser] = useState('')
  const [username, setusername] = useState(null)
  useEffect(() => {
    
  }, [user])
  
  
  return (
    <div>
      {user != '' ? (<Homescreen user = {user} />):(<Loginscreen user = {user} setuser= {setuser} />)}
      
    </div>
  );
}
