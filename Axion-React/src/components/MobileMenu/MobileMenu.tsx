import React, { useEffect, useRef } from "react";
import { Cancel, Logo } from "../../assets";
import { motion, AnimatePresence } from "framer-motion";
import MenuList from "./MenuList";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<Props> = ({ isOpen, onClose }) => {
  const startX = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      startX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (startX.current !== null) {
        const currentX = e.touches[0].clientX;
        const diff = startX.current - currentX;
        if (diff > 50) {
          onClose();
          startX.current = null;
        }
      }
    };

    const menu = menuRef.current;
    if (menu) {
      menu.addEventListener("touchstart", handleTouchStart);
      menu.addEventListener("touchmove", handleTouchMove);
    }

    return () => {
      if (menu) {
        menu.removeEventListener("touchstart", handleTouchStart);
        menu.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [onClose]);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-Black opacity-50 h-screen"
            onClick={onClose}
          />

          <motion.div
            ref={menuRef}
            className="absolute right-0 top-0 h-screen w-8/12 bg-White shadow-lg p-6 flex flex-col gap-4"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <main className="flex flex-col gap-5">
              <div className="flex flex-row justify-between items-center">
                <img src={Logo} alt="logo" className="w-[4rem] rounded-md"/>
                <button onClick={onClose} className="-mr-5">
                  <img src={Cancel} alt="cancel" className="w-[15px]"/>
                </button>
              </div>
              <>
               <MenuList onClicks={handleLinkClick}/>
              </>
            </main>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
