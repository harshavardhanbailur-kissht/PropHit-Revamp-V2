'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const FRICTION = 0.94;
const VELOCITY_THRESHOLD = 0.05;
const SENSITIVITY = 0.25;
const AUTO_ROTATE_SPEED = 0.02;
const MIN_ZOOM = 1.0;
const MAX_ZOOM = 3.0;
const ZOOM_STEP = 0.25;
const PITCH_LIMIT = 40;

interface PanoramicState {
  yaw: number;
  pitch: number;
  zoom: number;
  isDragging: boolean;
  isAutoRotating: boolean;
}

export function usePanoramicViewer(containerRef: React.RefObject<HTMLDivElement | null>, idleActive: boolean) {
  const [state, setState] = useState<PanoramicState>({
    yaw: 0,
    pitch: 0,
    zoom: 1.0,
    isDragging: false,
    isAutoRotating: false,
  });

  const velocityRef = useRef({ x: 0, y: 0 });
  const dragStartRef = useRef({ x: 0, y: 0, yaw: 0, pitch: 0 });
  const lastPointerRef = useRef({ x: 0, y: 0, time: 0 });
  const rafRef = useRef<number | null>(null);
  const autoRotateRafRef = useRef<number | null>(null);
  const pinchStartRef = useRef<{ dist: number; zoom: number } | null>(null);
  const stateRef = useRef(state);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  stateRef.current = state;

  const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
  const wrapYaw = (y: number) => ((y % 360) + 360) % 360;

  // Momentum animation loop
  const animateMomentum = useCallback(() => {
    const vx = velocityRef.current.x * FRICTION;
    const vy = velocityRef.current.y * FRICTION;
    velocityRef.current = { x: vx, y: vy };

    if (Math.abs(vx) < VELOCITY_THRESHOLD && Math.abs(vy) < VELOCITY_THRESHOLD) {
      velocityRef.current = { x: 0, y: 0 };
      rafRef.current = null;
      return;
    }

    setState(prev => ({
      ...prev,
      yaw: wrapYaw(prev.yaw + vx),
      pitch: clamp(prev.pitch + vy, -PITCH_LIMIT, PITCH_LIMIT),
    }));

    rafRef.current = requestAnimationFrame(animateMomentum);
  }, []);

  // Auto-rotate loop
  useEffect(() => {
    if (idleActive && !state.isDragging && !prefersReducedMotion.current) {
      const rotate = () => {
        setState(prev => ({
          ...prev,
          yaw: wrapYaw(prev.yaw + AUTO_ROTATE_SPEED),
          isAutoRotating: true,
        }));
        autoRotateRafRef.current = requestAnimationFrame(rotate);
      };
      autoRotateRafRef.current = requestAnimationFrame(rotate);
    } else {
      if (autoRotateRafRef.current) {
        cancelAnimationFrame(autoRotateRafRef.current);
        autoRotateRafRef.current = null;
      }
      if (state.isAutoRotating) {
        setState(prev => ({ ...prev, isAutoRotating: false }));
      }
    }
    return () => {
      if (autoRotateRafRef.current) {
        cancelAnimationFrame(autoRotateRafRef.current);
      }
    };
  }, [idleActive, state.isDragging, state.isAutoRotating]);

  // Pointer handlers
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    velocityRef.current = { x: 0, y: 0 };

    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      yaw: stateRef.current.yaw,
      pitch: stateRef.current.pitch,
    };
    lastPointerRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };

    setState(prev => ({ ...prev, isDragging: true }));
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!stateRef.current.isDragging) return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const zoomFactor = stateRef.current.zoom;

    const newYaw = wrapYaw(dragStartRef.current.yaw - dx * (SENSITIVITY / zoomFactor));
    const newPitch = clamp(
      dragStartRef.current.pitch + dy * (SENSITIVITY * 0.6 / zoomFactor),
      -PITCH_LIMIT,
      PITCH_LIMIT
    );

    const now = Date.now();
    const dt = Math.max(now - lastPointerRef.current.time, 1);
    velocityRef.current = {
      x: -(e.clientX - lastPointerRef.current.x) * (SENSITIVITY / zoomFactor) / Math.max(dt / 16, 1),
      y: (e.clientY - lastPointerRef.current.y) * (SENSITIVITY * 0.6 / zoomFactor) / Math.max(dt / 16, 1),
    };
    lastPointerRef.current = { x: e.clientX, y: e.clientY, time: now };

    setState(prev => ({ ...prev, yaw: newYaw, pitch: newPitch }));
  }, []);

  const onPointerUp = useCallback(() => {
    setState(prev => ({ ...prev, isDragging: false }));

    if (prefersReducedMotion.current) {
      velocityRef.current = { x: 0, y: 0 };
      return;
    }

    const speed = Math.sqrt(velocityRef.current.x ** 2 + velocityRef.current.y ** 2);
    if (speed > VELOCITY_THRESHOLD) {
      rafRef.current = requestAnimationFrame(animateMomentum);
    }
  }, [animateMomentum]);

  // Wheel zoom
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    setState(prev => ({
      ...prev,
      zoom: clamp(prev.zoom + delta, MIN_ZOOM, MAX_ZOOM),
    }));
  }, []);

  // Touch pinch zoom
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const getDistance = (t1: Touch, t2: Touch) =>
      Math.sqrt((t2.clientX - t1.clientX) ** 2 + (t2.clientY - t1.clientY) ** 2);

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        pinchStartRef.current = {
          dist: getDistance(e.touches[0], e.touches[1]),
          zoom: stateRef.current.zoom,
        };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinchStartRef.current) {
        e.preventDefault();
        const dist = getDistance(e.touches[0], e.touches[1]);
        const ratio = dist / pinchStartRef.current.dist;
        const newZoom = clamp(pinchStartRef.current.zoom * ratio, MIN_ZOOM, MAX_ZOOM);
        setState(prev => ({ ...prev, zoom: newZoom }));
      }
    };

    const onTouchEnd = () => {
      pinchStartRef.current = null;
    };

    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [containerRef]);

  // Keyboard controls
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          setState(prev => ({ ...prev, yaw: wrapYaw(prev.yaw - 5) }));
          e.preventDefault();
          break;
        case 'ArrowRight':
          setState(prev => ({ ...prev, yaw: wrapYaw(prev.yaw + 5) }));
          e.preventDefault();
          break;
        case 'ArrowUp':
          setState(prev => ({ ...prev, pitch: clamp(prev.pitch + 3, -PITCH_LIMIT, PITCH_LIMIT) }));
          e.preventDefault();
          break;
        case 'ArrowDown':
          setState(prev => ({ ...prev, pitch: clamp(prev.pitch - 3, -PITCH_LIMIT, PITCH_LIMIT) }));
          e.preventDefault();
          break;
        case '+':
        case '=':
          setState(prev => ({ ...prev, zoom: clamp(prev.zoom + ZOOM_STEP, MIN_ZOOM, MAX_ZOOM) }));
          break;
        case '-':
          setState(prev => ({ ...prev, zoom: clamp(prev.zoom - ZOOM_STEP, MIN_ZOOM, MAX_ZOOM) }));
          break;
      }
    };

    el.addEventListener('keydown', handleKeyDown);
    return () => el.removeEventListener('keydown', handleKeyDown);
  }, [containerRef]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (autoRotateRafRef.current) cancelAnimationFrame(autoRotateRafRef.current);
    };
  }, []);

  // Control functions
  const zoomIn = useCallback(() => {
    setState(prev => ({ ...prev, zoom: clamp(prev.zoom + ZOOM_STEP, MIN_ZOOM, MAX_ZOOM) }));
  }, []);

  const zoomOut = useCallback(() => {
    setState(prev => ({ ...prev, zoom: clamp(prev.zoom - ZOOM_STEP, MIN_ZOOM, MAX_ZOOM) }));
  }, []);

  const resetView = useCallback(() => {
    setState(prev => ({ ...prev, yaw: 0, pitch: 0, zoom: 1.0 }));
    velocityRef.current = { x: 0, y: 0 };
  }, []);

  return {
    state,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onWheel,
    },
    controls: {
      zoomIn,
      zoomOut,
      resetView,
    },
  };
}
