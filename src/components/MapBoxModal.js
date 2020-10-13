import React, { useRef, useEffect } from 'react'
import mapBox from 'mapbox-gl'

mapBox.accessToken = 'pk.eyJ1IjoidGVocHNhbG1pc3QiLCJhIjoiY2tjOG1qYWI1MGU0eDJ0bXA4eW9oMWJheiJ9.mbn1UUudizfymnvIOvdCmg'

export const MapBoxModal = ({ className = '', style = {}, address, zip }) => {
  const elRef = useRef()
  const mapRef = useRef(null)

  useEffect(() => {
    if (elRef.current) {
      mapRef.current = new mapBox.Map({
        container: elRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-90, 40],
        zoom: 10
      })

      setTimeout(() => {
        mapRef.current.panTo([-180, 40])
      }, 2000)

      return () => mapRef.current?.remove?.()
    }
  }, [elRef?.current])

  return <div className='h-screen w-screen fixed top-0 left-0 z-50 flex-center'>
    <div className='w-full h-full md:h-2/3vh md:w-2/3' ref={elRef}></div>
  </div>
}
