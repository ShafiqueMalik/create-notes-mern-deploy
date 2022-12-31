import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Box } from '@mui/material';

export default function NoteEditor({ editorRef, value = "" }) {
  // const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <Box sx={{height:"200px"}}>
      <Editor 
        onInit={(evt, editor) => {
          editorRef.current = editor;
          setTimeout(()=>{
            var freeTiny = document.querySelector('.tox .tox-notifications-container');
            freeTiny.style.display = 'none';
          },10)
        }}
        initialValue={value}
        init={{
          height: 200,
          menubar: false,
          // plugins: [
          //   'advlist autolink lists link image charmap print preview anchor',
          //   'searchreplace visualblocks code fullscreen',
          //   'insertdatetime media table paste code help wordcount'
          // ],
          // toolbar: 'undo redo | formatselect | h1 h2 h3 h4 h5 h6  ' +
          //   'bold italic forecolor backcolor | alignleft aligncenter ' +
          //   'alignright alignjustify | bullist numlist outdent indent | ' +
          //   'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          toolbar_location: 'bottom',
          statusbar: false,
          plugins: 'paste',
          paste_webkit_styles: 'color font-size',
          paste_retain_style_properties: 'color font-size',


        }}
      />
    </Box>
  );
}
