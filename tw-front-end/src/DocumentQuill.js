import React, { Component } from 'react';
import { useState } from 'react';
import ReactQuill from 'react-quill';



export default function DocumentQuill() {
    const [value, setValue] = useState("");
    return  <ReactQuill theme="snow" value={value} onChange={setValue} />;
}