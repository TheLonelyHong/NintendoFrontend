import React from 'react';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import { motion } from 'framer-motion';

const mottoVariant = {
        offscreen:{
                opacity:0,
                y:-100,
        },
        onscreen:{
                opacity:1,
                y:0,
                transition:{
                        type:"spring",
                        duration:0.3,
                        stiffness:100,
                        damping:100,
                        bounce:0.5
                }
        }
}

const Motto = () => {
  return (
    <motion.section
        className='motto-container'
        initial="offscreen"
        whileInView="onscreen"
        viewport={{amount:0}}
    >
        <h2 className='text-center underline color-red'>Services</h2>
            <div 
                className='motto-flexbox p-3'
            >
                    <motion.div 
                        className='motto-item-1 border-right order-1-grid'  
                        variants={mottoVariant}
                    >
                        <p 
                            className='motto-text'
                        > Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                           labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                           nisi ut aliquip ex ea commodo consequat. </p>
                    </motion.div>
                    <div className='motto-item-2'>
                        <div className='motto-icon order-2-grid'>
                            <LocalShippingIcon className='icons-motto'/>
                            <h4 className='color-red'>Delivery</h4>
                        </div>
                    </div>
            </div>
            <div className='motto-flexbox p-3 '>
                    <motion.div 
                        className='motto-item-1 order-1 border-2'
                        variants={mottoVariant}
                    >
                        <p className='motto-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                           labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                           nisi ut aliquip ex ea commodo consequat. </p>
                    </motion.div>
                    <div className='motto-item-2'>
                        <div className='motto-icon order-reverse'>
                            <Diversity1Icon className='icons-motto'/>
                            <h4 className='color-red'>Friendly</h4>
                        </div>
                    </div>
            </div>
            <div className='motto-flexbox p-3'>
                    <motion.div 
                        className='motto-item-1 border-right order-1-grid'
                        variants={mottoVariant}
                    >
                        <p className='motto-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                           labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                           nisi ut aliquip ex ea commodo consequat. </p>
                    </motion.div>
                    <div className='motto-item-2'>
                        <div className='motto-icon order-2-grid'>
                            <VideogameAssetIcon className='icons-motto'/>
                            <h4 className='color-red'>Games</h4>
                        </div>
                    </div>
            </div>
    </motion.section>
  )
}

export default Motto