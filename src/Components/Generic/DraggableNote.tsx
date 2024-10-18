'use client'

import { SimpleMarkdown } from '@arubiku/react-markdown'
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../ThemeContext'
import { GetLang, Language } from '../Lang/LangSys'
import { PortfolioLocals } from '../Portfolio/PortfolioLang'


export interface Note {
  id: number
  content: string
  position: { x: number; y: number }
}

interface DraggableBackgroundNotesProps {
  initialNotes: Note[]
  clientLang: [Language, (lang: Language) => void];
  contentRef: React.RefObject<HTMLDivElement>;
}

export default function DraggableBackgroundNotes({ initialNotes, clientLang,contentRef }: DraggableBackgroundNotesProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const updateNotePosition = (id: number, x: number, y: number) => {
    setNotes(prevNotes => prevNotes.map(note => 
      note.id === id ? { ...note, position: { x, y } } : note
    ))
  }

  return (
    <div className="fixed inset-0 pointer-events-none">
      {notes.map((note) => (
        <DraggableNote
          key={note.id}
          note={note}
          updatePosition={updateNotePosition}
          windowSize={windowSize}
          clientLang={clientLang}
          contentRef={contentRef}
        />
      ))}
    </div>
  )
}

interface DraggableNoteProps {
  note: Note
  updatePosition: (id: number, x: number, y: number) => void
  windowSize: { width: number; height: number }
  clientLang: [Language, (lang: Language) => void];
  contentRef: React.RefObject<HTMLDivElement>;
}

function DraggableNote({ note, updatePosition, windowSize,clientLang ,contentRef}: DraggableNoteProps) {
  const x = useMotionValue(note.position.x)
  const y = useMotionValue(note.position.y)
  const { theme, } = useTheme()
  const noteRef = React.useRef<HTMLDivElement>(null);
  //set the original position of the note , note.position is the percentage of the screen
  useEffect(() => {
    x.set(note.position.x * window.innerWidth / 100)
    y.set(note.position.y * window.innerHeight / 100)
  }, [window.innerWidth, window.innerHeight])
  useEffect(() => {
    const unsubscribeX = x.onChange(latest => {
      updatePosition(note.id, latest, y.get())
    })
    const unsubscribeY = y.onChange(latest => {
      updatePosition(note.id, x.get(), latest)
    })

    return () => {
      unsubscribeX()
      unsubscribeY()
    }
  }, [note.id, x, y, updatePosition])

  const rotateZ = useTransform(x, [0, 100], [-5, 5]);
  const scale = useTransform(y, [0, 100], [0.95, 1.05]);
  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const contentRect = contentRef.current?.getBoundingClientRect();
    if (!contentRect || !noteRef.current) return;

    const noteRect = noteRef.current.getBoundingClientRect();

    // Calculate percentages
    const newPosition = {
      x: (info.point.x / window.innerWidth) * 100,
      y: (info.point.y / window.innerHeight) * 100,
    };

    // Apply boundaries
    newPosition.x = Math.max(0, Math.min(newPosition.x, 99 - (noteRect.width / window.innerWidth * 100)));
    newPosition.y = Math.max(0, Math.min(newPosition.y, 99 - (noteRect.height / window.innerHeight * 100)));

    // Check if the note overlaps with the content area
    if (
      (newPosition.x * window.innerWidth / 100) < contentRect.right &&
      ((newPosition.x + (noteRect.width / window.innerWidth * 100)) * window.innerWidth / 100) > contentRect.left &&
      (newPosition.y * window.innerHeight / 100) < contentRect.bottom &&
      ((newPosition.y + (noteRect.height / window.innerHeight * 100)) * window.innerHeight / 100) > contentRect.top
    ) {
      if ((newPosition.x * window.innerWidth / 100) < contentRect.left) {
        newPosition.x = (contentRect.left / window.innerWidth) * 100 - (noteRect.width / window.innerWidth * 100) - 1;
      } else {
        newPosition.x = (contentRect.right / window.innerWidth) * 100 + 1;
      }
    }
    // Update the position and scale to the original size
    x.set(newPosition.x*window.innerWidth / 100);
    y.set(newPosition.y*window.innerHeight / 100);

  };
  const dragConstraints = {
    left: 0,
    top: 0,
    right: Math.max(0, windowSize.width),  // Assuming note width is 200px
    bottom: Math.max(0, windowSize.height ) // Assuming note height is 100px
  }

  return (
    <motion.div
    drag
      onDragEnd={(event, info) => handleDrag(event, info)}
      ref={noteRef}
      dragMomentum={false}
      dragElastic={1}
      style={{
        x,
        y,
        rotateZ,
        scale
      }}
      className="duration-200 animate-fadeIn transition-colors absolute bg-yellow-100 dark:text-neutral-800 dark:bg-[#66CCFF] p-2 rounded shadow-md cursor-move pointer-events-auto"
    >
    
        <SimpleMarkdown className="text-sm p"ctexTclass="" content={GetLang(clientLang[0],note.content,PortfolioLocals)}  theme={theme} />
    </motion.div>
  )
}