import { useEffect, useRef } from 'react';

/*
 * React adaptation of Inspira UI's Floating Card interaction:
 * https://github.com/unovue/inspira-ui/blob/main/app/components/inspira/ui/floating-card/FloatingCard.vue
 * Motion is implemented with a lightweight pointer spring for this React/Vite portfolio.
 */
export default function InspiraFloatingCard({ children, className = '', rotateDepth = 8, translateDepth = 9 }) {
  const rootRef = useRef(null);
  const surfaceRef = useRef(null);
  const glareRef = useRef(null);
  const frameRef = useRef(0);
  const stateRef = useRef({ x:0, y:0, tx:0, ty:0, scale:1, ts:1, z:0, tz:0, glare:0, tg:0, active:false });

  useEffect(() => {
    const root = rootRef.current;
    const surface = surfaceRef.current;
    const glare = glareRef.current;
    if (!root || !surface || !glare) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    let alive = true;
    const tick = () => {
      if (!alive) return;
      const s = stateRef.current;
      s.x += (s.tx - s.x) * .12;
      s.y += (s.ty - s.y) * .12;
      s.scale += (s.ts - s.scale) * .13;
      s.z += (s.tz - s.z) * .13;
      s.glare += (s.tg - s.glare) * .15;
      surface.style.transform = `translate3d(${s.x*translateDepth}px,${-s.y*translateDepth}px,${s.z}px) rotateX(${-s.y*rotateDepth}deg) rotateY(${s.x*rotateDepth}deg) scale(${s.scale})`;
      glare.style.opacity = String(s.glare);
      glare.style.background = `radial-gradient(circle at ${(s.x+.5)*100}% ${(s.y+.5)*100}%, rgba(207,207,207,.24) 0%, rgba(207,207,207,.1) 25%, transparent 72%)`;
      if (s.active || Math.abs(s.x)>.001 || Math.abs(s.y)>.001 || Math.abs(s.scale-1)>.001 || Math.abs(s.z)>.1 || s.glare>.01) frameRef.current = requestAnimationFrame(tick);
      else frameRef.current = 0;
    };
    const wake = () => { if (!frameRef.current) frameRef.current = requestAnimationFrame(tick); };
    const move = e => {
      if (e.pointerType === 'touch') return;
      const r = root.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const s = stateRef.current;
      s.tx = (e.clientX-r.left)/r.width-.5;
      s.ty = (e.clientY-r.top)/r.height-.5;
      s.active = true;
      wake();
    };
    const enter = e => {
      if (e.pointerType === 'touch') return;
      Object.assign(stateRef.current,{ts:1.025,tz:16,tg:.7,active:true});
      wake();
    };
    const leave = () => {
      Object.assign(stateRef.current,{tx:0,ty:0,ts:1,tz:0,tg:0,active:false});
      wake();
    };
    root.addEventListener('pointermove',move,{passive:true});
    root.addEventListener('pointerenter',enter,{passive:true});
    root.addEventListener('pointerleave',leave,{passive:true});
    return () => { alive=false; cancelAnimationFrame(frameRef.current); root.removeEventListener('pointermove',move); root.removeEventListener('pointerenter',enter); root.removeEventListener('pointerleave',leave); };
  }, [rotateDepth, translateDepth]);

  return <div ref={rootRef} className={`inspired-float ${className}`}>
    <div ref={surfaceRef} className="inspired-float__surface">
      {children}
      <div ref={glareRef} className="inspired-float__glare" aria-hidden="true" />
    </div>
  </div>;
}
