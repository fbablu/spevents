import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import PohelaFalgunScene from "./PohelaFalgunScene";



interface ModelSlideshowProps {
  photos: {
    src: string;
    id: string;
    createdAt: string;
  }[];
  hideUI?: boolean;
}


const OpeningSequence = () => {
  
}


// This is the pohela falgun model (which uses the scene)
const PohelaFalgunModelSlideshow: React.FC<ModelSlideshowProps> = ({ photos }) => {


  return (
    <div></div>
  );
};





export default PohelaFalgunModelSlideshow;
