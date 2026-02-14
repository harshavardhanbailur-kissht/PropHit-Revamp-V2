'use client';

import { useCallback, useRef } from 'react';
import { usePanoramicViewer } from '@/hooks/usePanoramicViewer';
import { useIdleTimer } from '@/hooks/useIdleTimer';
import type { PanoramicScene } from '@/lib/panoramicData';
import CompassRose from './CompassRose';
import PanoramicControls from './PanoramicControls';
import HotspotMarker from './HotspotMarker';

interface PanoramicViewerProps {
  scene: PanoramicScene;
  isActive: boolean;
}

export default function PanoramicViewer({ scene, isActive }: PanoramicViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resetTimer, isIdle } = useIdleTimer(5000);

  const { state, handlers, controls } = usePanoramicViewer(containerRef, isIdle && isActive);

  // Wrap pointer handlers to reset idle timer
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    resetTimer();
    handlers.onPointerDown(e);
  }, [resetTimer, handlers]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    handlers.onPointerMove(e);
  }, [handlers]);

  const onPointerUp = useCallback(() => {
    resetTimer();
    handlers.onPointerUp();
  }, [resetTimer, handlers]);

  const onWheel = useCallback((e: React.WheelEvent) => {
    resetTimer();
    handlers.onWheel(e);
  }, [resetTimer, handlers]);

  // Calculate panoramic image transform
  // Image is 3x wide for seamless looping, centered on the middle copy
  const imageScale = state.zoom;
  const containerWidth = containerRef.current?.clientWidth ?? 1200;
  const containerHeight = containerRef.current?.clientHeight ?? 800;

  // Map yaw (0-360) to translateX. Image covers 360° across its full width.
  // We use 3 copies, so total width = imageWidth * 3 * scale relative to container
  const baseImageWidth = containerWidth * 3; // 3x container = 360° coverage per copy
  const totalWidth = baseImageWidth * 3; // 3 copies for seamless wrap

  const yawFraction = state.yaw / 360;
  const translateX = -(yawFraction * baseImageWidth) - baseImageWidth; // start at middle copy
  const translateY = -(state.pitch / 80) * containerHeight * 0.3; // pitch maps to vertical offset

  // Hotspot screen position calculation
  const getHotspotScreen = (hotYaw: number, hotPitch: number) => {
    let relativeYaw = hotYaw - state.yaw;
    if (relativeYaw > 180) relativeYaw -= 360;
    if (relativeYaw < -180) relativeYaw += 360;

    const fov = 120 / state.zoom;
    const visible = Math.abs(relativeYaw) < fov / 2;

    const screenX = (relativeYaw / fov) * containerWidth + containerWidth / 2;
    const relativePitch = hotPitch - state.pitch;
    const screenY = -(relativePitch / (fov * 0.6)) * containerHeight + containerHeight / 2;

    return { screenX, screenY, visible };
  };

  return (
    <div
      ref={containerRef}
      className={`panoramic-viewport ${state.isDragging ? 'panoramic-viewport--dragging' : ''}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onWheel={onWheel}
      role="application"
      aria-label="360 degree panoramic viewer. Drag to look around, scroll to zoom."
      aria-roledescription="panoramic viewer"
      tabIndex={0}
    >
      {/* Panoramic image (3 copies for seamless loop) */}
      <div
        className="panoramic-image-wrapper"
        style={{
          width: totalWidth,
          height: containerHeight * 1.5,
          transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${imageScale})`,
        }}
      >
        {[0, 1, 2].map((i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={scene.imageUrl}
            alt=""
            draggable={false}
            style={{
              position: 'absolute',
              left: i * baseImageWidth,
              top: 0,
              width: baseImageWidth,
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ))}
      </div>

      {/* Hotspots */}
      {scene.hotspots.map((hotspot) => {
        const pos = getHotspotScreen(hotspot.yawDeg, hotspot.pitchDeg);
        return (
          <HotspotMarker
            key={hotspot.id}
            hotspot={hotspot}
            screenX={pos.screenX}
            screenY={pos.screenY}
            visible={pos.visible}
          />
        );
      })}

      {/* Vignette overlay */}
      <div className="panoramic-vignette" />

      {/* Gold corner frames */}
      <div className="panoramic-frame-corner panoramic-frame-corner--tl" />
      <div className="panoramic-frame-corner panoramic-frame-corner--tr" />
      <div className="panoramic-frame-corner panoramic-frame-corner--bl" />
      <div className="panoramic-frame-corner panoramic-frame-corner--br" />

      {/* Drag hint (shown briefly on load) */}
      <div className="panoramic-drag-hint">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3" />
        </svg>
        <span>Drag to explore</span>
      </div>

      {/* Compass */}
      <CompassRose bearing={state.yaw} />

      {/* Controls */}
      <PanoramicControls
        zoom={state.zoom}
        onZoomIn={controls.zoomIn}
        onZoomOut={controls.zoomOut}
        onResetView={controls.resetView}
        isAutoRotating={state.isAutoRotating}
      />
    </div>
  );
}
