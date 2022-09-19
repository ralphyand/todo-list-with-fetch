import React, { useState, useEffect } from "react";

const Tasklist = () => {
	const [task, setTask] = useState("");

	const [listOfTasks, setListOfTasks] = useState([]);
	const handleTask = (e) => {
		if (e.key === "Enter") {
			if (task !== "") {
				CreateTask();
				setTask(" ");
			} else {
				alert("Rellena el campo vacio");
			}
		}
	};

	const DeleteTarea = (nombre) => {
		confirm("¿ Estas seguro que deseas eliminar esta tarea ?");
		const auxTarea = listOfTasks.filter((item) => {
			if (nombre !== item.label) return item;
		});

		setListOfTasks(auxTarea);
		UpDateTask(auxTarea);
	};
	const UpDateTask = (listTasks) => {
		const requestOptions = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(listTasks),
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/alesanchezr",
			requestOptions
		)
			.then((resp) => resp.json())
			.then((data) => console.log(data));
	};

	const CreateUser = () => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({}),
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/alesanchezr",
			requestOptions
		)
			.then((resp) => resp.json())
			.then((data) => console.log(data));
	};

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alesanchezr")
			.then((resp) => resp.json())
			.then((data) => setListOfTasks(data))
			.catch((error) => {
				console.log(error);
				CreateUser();
			});
	}, []);

	const CreateTask = () => {
		const newTodoList = [...listOfTasks, { label: task, done: false }];
		setListOfTasks(newTodoList);
		UpDateTask(newTodoList);
	};

	return (
		<>
			<div className="container justify-content-center text-center mt-5">
				<h1>
					TodoList whit React <i className="fab fa-react fa-lg"></i>
				</h1>
				<input
					value={task}
					type="text"
					className="form-control"
					placeholder="Enter a task"
					aria-label="Username"
					aria-describedby="basic-addon1"
					onChange={(e) => setTask(e.target.value)}
					onKeyDown={handleTask}
				/>
				<div id="listContainer" className="container my-2 py-4">
					{listOfTasks.map((item, index) => (
						<div className="border-bottom mt-2" key={index}>
							<h3>
								{item.label}{" "}
                                
								<button  
                                
									type="button"
									className="btn btn-secondary btn-sm ms-2 pe-2"
									onClick={() => DeleteTarea(item.label)}>
									
                                    <i class="fas fa-trash-alt">  </i>

								</button> 
							</h3>
						</div>
					))}
					<div className="footer pt-2">
						<h5>
							Tienes {listOfTasks.length} {""}Tareas Pendientes
						</h5>
					</div>
				</div>
			</div>
			;
		</>
	);
};

export default Tasklist;
