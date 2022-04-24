import React, { useContext, useEffect } from 'react';
import  noteContext  from '../context/notes/noteContext';


const About = () => {
    const contextDetail = useContext(noteContext);
    useEffect(() => {
        contextDetail.updateData();
    
    //   return () => {
    //     second
    //   }
    }, []);
    
  return (
    <div>
      This is About! {contextDetail.state.name}. He is in class {contextDetail.state.class}.
    </div>
  )
}

export default About
