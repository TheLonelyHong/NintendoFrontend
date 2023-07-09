import React from 'react';
import { motion } from 'framer-motion';


const titleVariant = {
      offscreen:{
          opacity:0
      },
      onscreen:{
          opacity:1,
          transition:{
              type:"tween",
              duration:1
          }
      }
};


const Title = () => {
  return (
    <motion.div 
      className='title-container'
      initial="offscreen"
      whileInView="onscreen"
      viewport={{amount:0.8}}
    >
            <motion.h4 
              className='title-box'
              variants={titleVariant}
            >
                 <span className='styled-red'>nintendo</span> , your perfect choice of handheld gaming console
            </motion.h4>
    </motion.div>
  )
}

export default Title