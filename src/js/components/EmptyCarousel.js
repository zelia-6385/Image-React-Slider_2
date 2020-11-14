import React from 'react'

function EmptyCarousel() {
  return (
    <div className="card" style={{ height: '250px' }}>
      No content
    </div>
  )
}

export default React.memo(EmptyCarousel)
