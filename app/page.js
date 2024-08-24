import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./Navbar";

export default function Home() {
  return <>

  <Navbar />
  
  <div style={{marginTop: '33vh'}}>
    <h1 style={{textAlign: 'center', fontSize: '50px', color: 'green'}}>AI Rate My Professor</h1>
  </div>
  
  </>
}
