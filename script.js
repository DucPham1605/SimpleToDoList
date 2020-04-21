let tasks;

const render = (data) => {
	console.log("render")
	const list = document.getElementById("list")
	list.innerHTML = data.map((task,index)=>{
		return `<li id="${task.id}">${task.name} <button onClick="updateData(this)">Update</button> <button onClick="deleteData(this)">Delete</button></li>`
		}).join("")
}

const getData = () => {
	axios.get("http://localhost:3000/tasks")
	.then(response=>{
		let tasks = response.data
		render(tasks)
	})
}

const saveData = () => {
	const inputTask = document.getElementById("inputTask")

	axios.post("http://localhost:3000/tasks",{
		name: `${inputTask.value}`
	})
	.then(response=>{
		console.log(response)
		getData()
	})
	.catch(error=>console.log(error))

	inputTask.value = ""
}

const deleteData = element => {
	const query = parseInt(element.parentNode.id)

	axios.delete(`http://localhost:3000/tasks/${query}`)
	.then(response=>{
		console.log(response)
		getData()
	})
	.catch(error=>console.log(error))
}

const updateData = element => {
	const query = parseInt(element.parentNode.id)
	const updateValue = prompt("Re-write your task here")

	axios.put(`http://localhost:3000/tasks/${query}`,{
		name: `${updateValue}`
	})
	.then(response=>{
		getData()
	})
	.catch(err=>console.log(err)) 
}

getData()

//create,update,delete
