import { motion, PanInfo, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { GetLang, Language } from '../Lang/LangSys';
import { PortfolioLocals } from '../Portfolio/PortfolioLang';
import SimpleMarkdown from '../SimpleMarkdown/SimpleMarkdown';

export interface Note {
  id: number;
  content: string;
  position: { x: number; y: number };
}

interface DraggableNoteProps {
  note: Note;
  notes: Note[];
  contentRef: React.RefObject<HTMLDivElement>;
  onPositionUpdate: (id: number, newPosition: { x: number; y: number }) => void;
  clientLang: [Language, (lang: Language) => void];
}

const DraggableNote: React.FC<DraggableNoteProps> = ({ note, notes, contentRef, onPositionUpdate , clientLang }) => {
  const controls = useAnimation();
  const noteRef = useRef<HTMLDivElement>(null);
  const [lang, setLang] = clientLang;
  const x = useMotionValue(note.position.x);
  const y = useMotionValue(note.position.y);

  const rotateZ = useTransform(x, [0, 100], [-5, 5]);
  const scale = useTransform(y, [0, 100], [0.95, 1.05]);

  useEffect(() => {
    x.set(note.position.x);
    y.set(note.position.y);
  }, [note.position, x, y]);

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const newX = (info.point.x / window.innerWidth) * 100;
    const newY = (info.point.y / window.innerHeight) * 100;
    note.position.x=newX;
    note.position.y=newY;
    onPositionUpdate(note.id, { x: note.position.x, y: note.position.y });
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const contentRect = contentRef.current?.getBoundingClientRect();
    if (!contentRect || !noteRef.current) return;

    const noteRect = noteRef.current.getBoundingClientRect();

    // Calculate percentages
    const newPosition = {
      x: (info.point.x / window.innerWidth) * 100,
      y: (info.point.y / window.innerHeight) * 100,
    };

    // Apply boundaries
    newPosition.x = Math.max(0, Math.min(newPosition.x, 95 - (noteRect.width / window.innerWidth * 100)));
    newPosition.y = Math.max(0, Math.min(newPosition.y, 95 - (noteRect.height / window.innerHeight * 100)));

    // Check for collisions with other notes
    notes.forEach((otherNote) => {
      if (otherNote.id !== note.id) {
        const distanceX = Math.abs(newPosition.x - otherNote.position.x);
        const distanceY = Math.abs(newPosition.y - otherNote.position.y);

        if (distanceX < 10 && distanceY < 5) {
          if (newPosition.x > otherNote.position.x) {
            newPosition.x += 5;
          } else {
            newPosition.x -= 5;
          }

          if (newPosition.y > otherNote.position.y) {
            newPosition.y += 2.5;
          } else {
            newPosition.y -= 2.5;
          }
        }
      }
    });

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

    controls.start({
      x: `${newPosition.x}vw`,
      y: `${newPosition.y}vh`,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    });

    onPositionUpdate(note.id, newPosition);
  };

  return (
    <motion.div
      ref={noteRef}
      drag
      dragMomentum={false}
      dragElastic={0.1}
      whileDrag={{ scale: 1.1, zIndex: 1 }}
      style={{
        x: `${note.position.x}vw`,
        y: `${note.position.y}vh`,
        rotateZ,
        scale
      }}
      animate={controls}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      className="duration-200 animate-fadeIn transition-colors absolute bg-yellow-100 dark:text-neutral-800 dark:bg-[#66CCFF] p-2 rounded shadow-md cursor-move"
      initial={false}
    >
      <motion.div
        animate={{ rotate: 0 }}
        transition={{ type: "spring", stiffness: 1000, damping: 30 }}
      >
        <SimpleMarkdown className="text-sm p"ctexTclass="" content={GetLang(lang,note.content,PortfolioLocals)} />
      </motion.div>
    </motion.div>
  );
};

export default DraggableNote;