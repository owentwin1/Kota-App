import React, { useEffect, useState } from 'react'
import { doc, setDoc ,addDoc,collection,getDocs,onSnapshot,query,where,deleteDoc } from "firebase/firestore"; 
import { db } from "../firebase";

function Homescreen(props:{user:string}) {
    const [id, setid] = useState('')
    const [img, setimg] = useState('')
    const [name, setname] = useState('')
    const [desc, setdesc] = useState('')
    const [qte, setqte] = useState('1')
    const [price, setprice] = useState('30')
    const [data, setdata] = useState([{
            id: '',
            img :  '' ,
            desc : '' ,
            name : '' ,
            qte :  '1',
            price :'0'
    }])
    const emptyField = () => {
        setid('')
        setimg('')
        setname('')
        setdesc('')
        setqte('')
        setprice('')
    }
    const completeField = (id:string,img: string,desc: string,name: string,qte: string,price: string) => {
        setid(id)
        setimg(img)
        setname(name)
        setdesc(desc)
        setqte(qte)
        setprice(price)
    }

    const deleteDocument = async (id:string) => {
        await deleteDoc(doc(db, "kota", id))
        .then(() => { alert("Entire Document has been deleted successfully.") }) 
        .catch(error => { console.log(error); })
    }

    const updateField = async (id:string) => {
        const docRef = doc(db, "kota", id );
        setDoc(docRef, {
            img :  img ,
            desc : desc ,
            name : name ,
            qte :  parseInt(qte) ,
            price :parseInt(price)
           })
        .then(() => {
            emptyField()
            alert("the kota food has been updated");
        })
        .catch(error => {
            console.log(error);
        })
    }

    const insertKotaFood = async () => {
        
         const docRef = await addDoc(collection(db, "kota"), {
           
            img :  img ,
            desc : desc ,
            name : name ,
            qte :  parseInt(qte) ,
            price :parseInt(price)
           }).then(()=>{
            emptyField()
             alert('the Food has been inserted')
           });
       
     }

     useEffect(() => {
            const q = query(collection(db, "kota"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const kota : any = [];
            querySnapshot.forEach((doc) => {
                kota.push({id:doc.id,...doc.data()});
            });
            setdata(kota)
            });

            console.log(data)
     }, [])
     

  return (
    <div>
        <div className='flex justify-end shadow-lg'>
                <h1 className='bg-green-400 text-white font-bold p-3 m-2 shadow-md rounded-full'>{props.user}</h1>
        </div>
    <div className=' flex justify-between mt-5 '>
        <div className='grid grid-cols-3 gap-4 max-h-96' >
        {data.map((element,index) => (
                
                <div className='p-4 bg-gray-200 ml-5' key={index}>
                    <img className='w-60' src={element?.img} alt='img' />
                    <h1 className='underline font-bold mt-3'>{element?.name}</h1>
                    <h4 className='text-gray-600'>{element?.desc}</h4>
                    <div className='flex justify-between mt-1'>
                        <p>QTE : {element?.qte}</p>
                        <p>R {element?.price}</p>
                    </div>
                    <div className='flex justify-between mt-5'>
                    <svg onClick={()=>completeField(element.id,element.img,element.desc,element.name,element.qte,element.price)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
    
                    <svg onClick={()=> deleteDocument(element.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
    
    
                    </div>
                </div>
                
            
        ))}
        </div>

        <div className="w-full max-w-xs mr-10 mt-5">
            <h1 className="block text-gray-700 text-center text-3xl font-bold mb-2" >
                    Insert and Update Food
            </h1>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='username' >
                        Name
                    </label>
                    <input value={name} onChange={(e)=>setname(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="name" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='username' >
                        Img Url Adress
                    </label>
                    <input value={img} onChange={(e)=>setimg(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="img" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='username' >
                        Description
                    </label>
                    <input value={desc} onChange={(e)=>setdesc(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="desc" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='username' >
                        Qte
                    </label>
                    <input value={qte} onChange={(e)=>setqte((e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="qte" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='username' >
                        Price
                    </label>
                    <input value={price} onChange={(e)=>setprice((e.target.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="price" />
                </div>
                
                <div className="flex items-center justify-between">
                <button onClick={()=>{insertKotaFood()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Insert
                </button>
                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#" onClick={()=>{updateField(id)}}>
                    Update
                </a>
                </div>
            </div>
            
    </div>
    </div>
    </div>
  )
}

export default Homescreen