
export const fadeInScaleConf = {
  variant: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  transition: { duration: 0.8 },
};

export const slideInLeftConf = {
  variant: {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  },
  transition: { duration: 0.8 },
};

export const slideInRightConf = {
  variant: {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  },
  transition: { duration: 0.8 },
};

export const bounceConf = {
  variant: {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  },
  transition: { type: "spring", stiffness: 500, damping: 25 },
};

export const rotateInConf = {
  variant: {
    hidden: { opacity: 0, rotate: -45 },
    visible: { opacity: 1, rotate: 0 },
  },
  transition: { duration: 0.8 },
};

export const zoomInConf = {
  variant: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  },
  transition: { duration: 0.8 },
};

export const flipInConf = {
  variant: {
    hidden: { opacity: 0, rotateY: -90 },
    visible: { opacity: 1, rotateY: 0 },
  },
  transition: { duration: 0.6 },
};

export const wiggleConf = {
  variant: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, rotate: [0, 3, -3, 3, -3, 0] },
  },
  transition: { duration: 1 },
};

export const staggeredConf = {
  variant: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  transition: {
    staggerChildren: 0.2,
    duration: 0.8,
  },
};

export const customEasingConf = {
  variant: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  transition: {
    duration: 0.8,
    ease: [0.6, -0.05, 0.01, 0.99], // Custom cubic-bezier curve
  },
};

export const slideFadeConf = {
    variant: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    transition: { duration: 0.8, ease: "easeInOut" },
  };

export const diagonalSlideConf = {
    variant: {
      hidden: { opacity: 0, x: -100, y: -100 },
      visible: { opacity: 1, x: 0, y: 0 },
    },
    transition: { duration: 1 },
  };

  export const swingInConf = {
    variant: {
      hidden: { opacity: 0, rotate: -30, transformOrigin: "top center" },
      visible: { opacity: 1, rotate: 0, transformOrigin: "top center" },
    },
    transition: { duration: 0.8, ease: "easeOut" },
  };
  export const skewInConf = {
    variant: {
      hidden: { opacity: 0, skewX: 20 },
      visible: { opacity: 1, skewX: 0 },
    },
    transition: { duration: 0.8 },
  };
  export const pulseConf = {
    variant: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: [1, 1.1, 1] },
    },
    transition: { duration: 1, repeat: Infinity, repeatType: "reverse" },
  };
  export const waveConf = {
    variant: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: [0, -10, 0, 10, 0] },
    },
    transition: { duration: 1.2, ease: "easeInOut" },
  };
  export const popInConf = {
    variant: {
      hidden: { opacity: 0, scale: 0.5 },
      visible: { opacity: 1, scale: [1, 1.2, 1] },
    },
    transition: { duration: 0.8, ease: "easeOut" },
  };
  export const rippleConf = {
    variant: {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
    },
    transition: { duration: 1, ease: [0.17, 0.67, 0.83, 0.67] },
  };
  export const hoverLiftConf = {
    variant: {
      hidden: { y: 0 },
      visible: { y: -10 },
    },
    transition: { duration: 0.3, ease: "easeOut" },
  };
  export const jellyConf = {
    variant: {
      hidden: { opacity: 0, scale: 0.5 },
      visible: {
        opacity: 1,
        scale: [1, 1.25, 0.9, 1.15, 1],
      },
    },
    transition: { duration: 1 },
  };
  export const blurInConf = {
    variant: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
    transition: { duration: 0.8 },
  };
  export const expandFadeConf = {
    variant: {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
    },
    transition: { duration: 0.8 },
  };
    