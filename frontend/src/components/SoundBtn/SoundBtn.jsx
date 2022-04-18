import React, {useState, useEffect} from 'react'
import './styles.css'
import { GiSpeaker, GiMusicalNotes } from 'react-icons/gi'

const useAudio = url => {
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
      <span className={'sound-btn'} onClick={toggle}> {playing ? <GiMusicalNotes size={35} /> : <GiSpeaker size={35} />} </span>
  )
}

export default SoundBtn