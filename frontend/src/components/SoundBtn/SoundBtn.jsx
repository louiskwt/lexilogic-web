import React, {useState, useEffect} from 'react'
import './styles.css'
import { GiSpeaker, GiMusicalNotes } from 'react-icons/gi'

const useAudio = url => {
    // console.log('fired')
    // console.log(url)
    const [audio] = useState(new Audio(url))
    const [playing, setPlaying] = useState(false)

    const toggle = () => setPlaying(!playing)

    useEffect(() => {
        playing ? audio.play() : audio.pause()
    })

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false))
        return () => {
            audio.addEventListener('ended', () => setPlaying(false))
        }
    })

    return [playing, toggle]
}

const SoundBtn = ({ url }) => {
    const [playing, toggle] = useAudio(url)

  return (
      <div className={'sound-btn'} onClick={toggle}> {playing ? <GiMusicalNotes size={28} /> : <GiSpeaker size={28} />} </div>
  )
}

export default SoundBtn