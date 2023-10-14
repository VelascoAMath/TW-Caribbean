import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';



export default function DocumentQuill() {
    const { id } = useParams();
	const [didRequest, setDidRequest] = useState(false);

	let getInitialState = async function() {
		try{
			const url = "http://localhost:8000/user_file/" + id + ".json";
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if(response.ok) {
				const content = await response.json();
				return content.content;
			} else {
				return "";
			}
		} catch (error){
			return "";
		}
	}

    const [value, setValue] = useState("");
	if(!didRequest){
		getInitialState().then((value) => {setValue(value); setDidRequest(true)} );
	}
    // return  <ReactQuill theme="snow" value={value} onChange={setValue} />;

    let handleUpdatingContent = async function(){
		try{
			const url = "http://localhost:8000/user_file/" + id + ".json";
			const response = await fetch(url, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({user_file: {content: value}})
			});

			if(response.ok) {
				alert("Successfully saved!");
			} else {
				// Handle HTTP error responses
				const errorData = await response.json();
				alert("Failed to save: " + errorData.name.join(", "));
			}
		} catch (error){
			alert("COULD NOT SAVE! " + error);
		}
	}



    return(
    <div>
        <Button onClick={() => {handleUpdatingContent(); }}>Save</Button>
		<input type="text" className='notepad' value={value} onChange={(e) => {setValue(e.target.value)}}/>
    </div>
    );
}