'use client'

import dynamic from 'next/dynamic'

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false,
})

export default function AnimatedCursorOverlay() {
  return (
  <div className="hidden md:block">
            <AnimatedCursor
             
            innerSize={8} 
            outerSize={35} 
            innerScale={2} 
            outerScale={2} 
            outerAlpha={0} 
            showSystemCursor={false}
            innerStyle={{ backgroundColor: "white", }} 
            outerStyle={{
              border: '3px solid white',
            }} />
          </div>
  )
}
