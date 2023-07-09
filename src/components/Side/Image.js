import React, { useState } from 'react';
import { motion } from 'framer-motion';

const transition = {
        type:"spring",
        damping:25,
        stiffness:120
};

const Image = ({img}) => {

    const [ isOpen , setIsOpen ] = useState(false);

  return (
    <div className={`image-container ${isOpen ? "open" : "" }`}>
            <motion.div
                animate={{opacity:isOpen ? 1 : 0}}
                transition={transition}
                className={`${isOpen ? "shade" : ""}`}
                onClick={() => setIsOpen(false)}
            />
            <motion.img
                src={`${img}`}
                alt='no img loaded'
                onClick={() => setIsOpen(!isOpen)}
                layout={transition}
                className={`${isOpen ? "contain" : "" }`}
            />
    </div>
  )
}

export default Image