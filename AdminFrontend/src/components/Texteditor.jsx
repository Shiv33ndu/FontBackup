import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles

const TextEditor = ({
  onContentChange,
}) => {

  const template = `<p style='box-sizing: inherit; margin: 16px 0px; color: rgb(21, 21, 21); font-family: Roboto, "Segoe UI", -apple-system, BlinkMacSystemFont, Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'><strong style="box-sizing: inherit; font-weight: bold;">License</strong>: Free for personal use.</p>
  <br>
  <p style='box-sizing: inherit; margin: 16px 0px; color: rgb(21, 21, 21); font-family: Roboto, "Segoe UI", -apple-system, BlinkMacSystemFont, Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'>This is a&nbsp;<strong style="box-sizing: inherit; font-weight: bold;">preview font for testing</strong>, you can purchase its full version at&nbsp;<a href="https://www.creativefabrica.com/product/morgena/ref/1095569/" target="_blank" rel="nofollow" style="box-sizing: inherit; background-color: transparent; text-decoration: none; color: rgb(107, 10, 228); font-weight: bold;">https://www.creativefabrica.com/product/morgena/ref/1095569/</a>.
  </p>
  <br>
  <p style='box-sizing: inherit; margin: 16px 0px; color: rgb(21, 21, 21); font-family: Roboto, "Segoe UI", -apple-system, BlinkMacSystemFont, Arial, Helvetica, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;'>Contact&nbsp;<a href="mailto:ourflawless@gmail.com" rel="nofollow" style="box-sizing: inherit; background-color: transparent; text-decoration: none; color: rgb(107, 10, 228); font-weight: bold;">ourflawless@gmail.com</a> for commercial use.</p>`

  const [value, setValue] = useState(template);

  const handleChange = (content, delta, source, editor) => {
    setValue(content);
    onContentChange(content);
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'color', 'background', 'align'
  ];

  return (
    <div className='mb-24 mt-10'>
      <ReactQuill
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        theme="snow"
        style={{ height: '300px', width: '600px' }}
        placeholder='Write a description about the Font Family....'
      />
    </div>
  );
};

export default TextEditor;
