import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Toolbar from './Toolbar';
import Underline from '@tiptap/extension-underline';

interface Props{
  content:string,
  setContent:any
}

const TipTap:React.FC<Props> = ({content, setContent}) => {
  const editor = useEditor({
    extensions:[
      StarterKit, Underline
    ],
    editorProps:{
      attributes:{
        class:"flex flex-col px-4 py-3 justify-start items-start w-full gap-3 font-medium pt-4 outline-none min-h-[500px] text-xl"
      },
    },
    onUpdate: ({editor}) => {
      setContent(editor.getHTML())
    }
  })

  return (
    <div className='mt-8'>
        <Toolbar content={content} editor={editor} />
        <EditorContent style={{whiteSpace:"pre-line"}} editor={editor} content={content} />
    </div>
  )
}

export default TipTap;
