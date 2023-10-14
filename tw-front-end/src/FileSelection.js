import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';



export default function FileSelection() {
	const [fileList, setFileList] = useState([]);
	const [fileName, setFileName] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
	async function fetchData() {
		try {
		const response = await fetch('http://localhost:8000/user_file');
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const values = await response.json();
		setFileList(values);
		} catch (error) {
		console.error('Error fetching data:', error);
		}
	}

	fetchData();
	}, []);

	let handleAddingFile = async function(){
		if(fileName == ""){
			alert("FILE NAME CAN'T BE BLANK!")
			return;
		}	  

		try{
			const url = "http://localhost:8000/user_file.json";
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({user_file: {name: fileName, content: ""}})
			});

			if(response.ok) {
				alert("Successfully uploaded " + fileName);
				window.location.reload();
			} else {
				// Handle HTTP error responses
				const errorData = await response.json();
				alert("Failed to create file: " + errorData.name.join(", "));
			}
		} catch (error){
			console.log(error);
			alert("COULD NOT CREATE FILE! " + error);
		}
	}

	let result = null;
	if (fileList) {
	result = fileList.map(file => <Button className='file-select' key={file.id} onClick={() => {navigate('/' + file.id)}}>{file.name}</Button>);
	} else {
	result = [];
	}

	return (
		<div>
			<Modal show={true}>
				<Modal.Header>
				<Modal.Title>File Name</Modal.Title>
				</Modal.Header>
				<Form.Control onChange={(e) => {setFileName(e.target.value)}}></Form.Control>
			</Modal>
			<Button onClick={handleAddingFile}>Add new File</Button>
			<hr/>
			<div className='file-list'>
			{result}
			</div>
		</div>
	);
}
