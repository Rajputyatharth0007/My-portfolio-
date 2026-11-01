import React from 'react';

/**
 * Lightweight CSS 3D environment for the full-page portfolio backdrop.
 * No WebGL, external assets, or additional dependencies required.
 */
export default function CinematicArchitecture() {
  return (
    <div className="cinematic-architecture-bg" aria-hidden="true">
      <div className="architecture-atmosphere" />
      <div className="architecture-camera">
        <div className="architecture-world">
          <div className="architecture-horizon" />
          <div className="architecture-building building-left">
            <i /><i /><i /><i /><i />
          </div>
          <div className="architecture-building building-right">
            <i /><i /><i /><i /><i />
          </div>
          <div className="architecture-portal portal-back">
            <i className="portal-top" />
            <i className="portal-side portal-side-left" />
            <i className="portal-side portal-side-right" />
            <i className="portal-bottom" />
          </div>
          <div className="architecture-portal portal-mid">
            <i className="portal-top" />
            <i className="portal-side portal-side-left" />
            <i className="portal-side portal-side-right" />
            <i className="portal-bottom" />
          </div>
          <div className="architecture-portal portal-front">
            <i className="portal-top" />
            <i className="portal-side portal-side-left" />
            <i className="portal-side portal-side-right" />
            <i className="portal-bottom" />
          </div>
          <div className="architecture-floor" />
          <div className="architecture-light light-blue" />
          <div className="architecture-light light-rose" />
        </div>
      </div>
      <div className="architecture-vignette" />
      <style>{`
        .cinematic-architecture-bg {
          --arch-blue: 0, 123, 167;
          --arch-rose: 255, 45, 149;
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
          isolation: isolate;
          background: #0A0A0A;
          contain: paint;
        }
        .architecture-atmosphere,
        .architecture-vignette,
        .architecture-camera {
          position: absolute;
          inset: 0;
        }
        .architecture-atmosphere {
          z-index: 1;
          background:
            radial-gradient(ellipse at 50% 38%, rgba(255,255,255,.055), transparent 36%),
            radial-gradient(ellipse at 14% 44%, rgba(var(--arch-blue),.13), transparent 34%),
            radial-gradient(ellipse at 87% 56%, rgba(var(--arch-rose),.075), transparent 34%),
            linear-gradient(180deg, #0A0A0A 0%, #0d1012 52%, #08090a 100%);
        }
        .architecture-camera {
          z-index: 2;
          perspective: 1100px;
          perspective-origin: 50% 46%;
          overflow: hidden;
          opacity: .82;
          mask-image: linear-gradient(to bottom, transparent 0%, #000 13%, #000 78%, transparent 100%);
        }
        .architecture-world {
          position: absolute;
          width: min(120vw, 1500px);
          height: min(100vh, 1050px);
          min-height: 680px;
          left: 50%;
          top: 48%;
          transform-style: preserve-3d;
          transform: translate(-50%, -50%) scale(1.02);
          animation: architecture-camera-drift 42s ease-in-out infinite alternate;
        }
        .architecture-horizon {
          position: absolute;
          left: 15%; right: 15%; top: 27%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(210,225,230,.16), transparent);
          box-shadow: 0 0 48px 14px rgba(var(--arch-blue),.08);
        }
        .architecture-building {
          position: absolute;
          top: 13%;
          width: 28%;
          height: 58%;
          opacity: .48;
          transform-style: preserve-3d;
          background: repeating-linear-gradient(180deg, transparent 0 34px, rgba(210,225,230,.10) 35px, transparent 36px);
          border-top: 1px solid rgba(220,230,235,.13);
          border-bottom: 1px solid rgba(220,230,235,.08);
        }
        .architecture-building::before,
        .architecture-building::after {
          content: "";
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(90deg, transparent 0 42px, rgba(210,225,230,.10) 43px, transparent 44px);
        }
        .architecture-building::after {
          transform: translateZ(-55px);
          opacity: .55;
        }
        .architecture-building i {
          position: absolute;
          top: 0; bottom: 0; width: 1px;
          background: linear-gradient(180deg, transparent, rgba(220,230,235,.16), transparent);
        }
        .architecture-building i:nth-child(1) { left: 12%; }
        .architecture-building i:nth-child(2) { left: 31%; }
        .architecture-building i:nth-child(3) { left: 50%; }
        .architecture-building i:nth-child(4) { left: 69%; }
        .architecture-building i:nth-child(5) { left: 88%; }
        .building-left { left: -2%; transform: rotateY(24deg) translateZ(-100px); }
        .building-right { right: -2%; transform: rotateY(-24deg) translateZ(-100px); }
        .architecture-portal {
          position: absolute;
          left: 50%;
          top: 24%;
          transform-style: preserve-3d;
          border: 0;
          filter: drop-shadow(0 0 18px rgba(0,0,0,.6));
        }
        .architecture-portal i { position: absolute; display: block; }
        .portal-back {
          width: 36%; height: 47%;
          transform: translateX(-50%) translateZ(-260px) scale(.82);
          opacity: .35;
        }
        .portal-mid {
          width: 50%; height: 61%;
          transform: translateX(-50%) translateZ(-110px) scale(.92);
          opacity: .48;
        }
        .portal-front {
          width: 66%; height: 74%;
          transform: translateX(-50%) translateZ(20px);
          opacity: .62;
        }
        .portal-top, .portal-bottom {
          left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(224,235,240,.32), rgba(var(--arch-blue),.38), rgba(224,235,240,.25), transparent);
          box-shadow: 0 0 18px rgba(var(--arch-blue),.12);
        }
        .portal-top { top: 0; }
        .portal-bottom { bottom: 0; opacity: .55; }
        .portal-side {
          top: 0; bottom: 0; width: 1px;
          background: linear-gradient(180deg, transparent, rgba(225,235,240,.34) 18%, rgba(225,235,240,.12) 78%, transparent);
        }
        .portal-side-left { left: 0; }
        .portal-side-right { right: 0; }
        .architecture-floor {
          position: absolute;
          left: -15%; right: -15%;
          top: 61%; height: 64%;
          transform: rotateX(72deg) translateZ(-90px);
          transform-origin: top center;
          background:
            linear-gradient(rgba(205,220,228,.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(205,220,228,.10) 1px, transparent 1px);
          background-size: 76px 76px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,.8), transparent 86%);
          opacity: .3;
        }
        .architecture-light {
          position: absolute;
          width: 32%; height: 24%;
          border-radius: 50%;
          filter: blur(75px);
          opacity: .3;
          transform: translateZ(-180px);
        }
        .light-blue { left: 8%; top: 39%; background: rgba(var(--arch-blue),.24); }
        .light-rose { right: 7%; top: 48%; background: rgba(var(--arch-rose),.13); }
        .architecture-vignette {
          z-index: 3;
          background:
            linear-gradient(90deg, rgba(10,10,10,.68), transparent 24%, transparent 76%, rgba(10,10,10,.68)),
            linear-gradient(180deg, rgba(10,10,10,.52), transparent 26%, rgba(10,10,10,.22) 68%, #0A0A0A 100%),
            radial-gradient(ellipse at center, transparent 28%, rgba(0,0,0,.35) 100%);
        }
        @keyframes architecture-camera-drift {
          0% { transform: translate(-50%, -50%) scale(1.02) rotateX(1deg) rotateY(-1.2deg); }
          50% { transform: translate(calc(-50% - 1.2%), calc(-50% + .7%)) scale(1.075) rotateX(-.5deg) rotateY(1deg); }
          100% { transform: translate(calc(-50% + 1%), calc(-50% - .5%)) scale(1.04) rotateX(1deg) rotateY(-.8deg); }
        }
        @media (max-width: 680px) {
          .architecture-camera { perspective: 850px; opacity: .56; }
          .architecture-world { width: 165vw; min-height: 620px; }
          .architecture-building { opacity: .32; }
          .portal-front { width: 78%; }
          .architecture-floor { background-size: 54px 54px; opacity: .2; }
          .architecture-vignette {
            background: linear-gradient(180deg, rgba(10,10,10,.42), transparent 32%, rgba(10,10,10,.24) 70%, #0A0A0A 100%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .architecture-world { animation: none !important; transform: translate(-50%, -50%) scale(1.03); }
        }
      `}</style>
    </div>
  );
}
