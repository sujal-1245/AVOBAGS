import React, { useState } from 'react'
import LandingPage from '../LandingPage'
import Loader3D from '../Loader3D'
import Home from '../Home'

const NewHome = () => {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Loader3D onFinish={() => setLoading(false)} bg="black" />}
      {!loading && <LandingPage />}
      <Home />
    </>
  )
}

export default NewHome
