import { motion, type HTMLMotionProps } from 'framer-motion';

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
  /** Vertical offset in px the content rises from. */
  y?: number;
}

/** Fades content up once when it first enters the viewport. */
export function Reveal({ delay = 0, y = 16, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.45, delay, ease: [0.21, 0.6, 0.35, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
