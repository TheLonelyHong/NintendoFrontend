import React from 'react';
import { motion } from 'framer-motion';

const AnimatePage = (props) => {
  return (
    <motion.section
            initial={{opacity:0}}
            animate={{opacity:1 , transition:{duration:0.5}}}
            exit={{opacity:0 , transition:{duration:0.5}}}
    >
        {props.children}
    </motion.section>
  )
}

export default AnimatePage