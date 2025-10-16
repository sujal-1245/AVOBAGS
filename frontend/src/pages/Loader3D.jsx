// Loader3D.jsx
import React, { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import blueborderSuitcase from '../../public/assets/blueborderSuitcase.json'

export default function Loader3D({ onFinish }) {
  const containerRef = useRef()

  useEffect(() => {
    if (!containerRef.current) return

    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: blueborderSuitcase,
    })

    const timer = setTimeout(() => {
      anim.destroy()
      onFinish && onFinish()
    }, 3000)

    return () => {
      clearTimeout(timer)
      anim.destroy()
    }
  }, [onFinish])

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div ref={containerRef} className="w-48 h-48" />
      <div className="absolute bottom-10 text-center text-black/80 tracking-widest text-sm font-light">
        Loading AVOBAGS...
      </div>
    </div>
  )
}
