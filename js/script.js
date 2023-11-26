const buttonGetJoke = document.getElementById('fetchJoke');
let containerItems = document.getElementById('jokeList');
const buttonDeleteItem = document.getElementById('deleteItem');
const buttonDeleteAllItem = document.getElementById('deleteAllJokes');

let listJokes = [];
let index;

//Función para eliminar todos los ítems en el DOM y en el localStorage
const deleteAllJokes = () => {
    containerItems.innerHTML = '';
    localStorage.clear();
}

//Función para eliminar ítem (joke)
const deleteJoke = (event) => { 

    //Recorremos el array listJokes
    listJokes.forEach(li => {
        if(event.target.id === li.idJoke) {
            index = listJokes.findIndex(x => x.idJoke == event.target.id);
            listJokes.splice(index, 1);
        }
    });

    //Eliminamos del DOM el ítem seleccionado
    let itemSelect = document.getElementById(event.target.id);
    itemSelect.parentNode.removeChild(itemSelect);

    //Limpiamos el localStorage y guardamos el array sin el nuevo elemento
    localStorage.clear();
    localStorage.setItem("jokes", JSON.stringify(listJokes));
}

//Función para obtener ítem (joke)
const getJoke = () => {
    fetch('https://api.chucknorris.io/jokes/random')
    .then(response => {
        if(!response.ok){
            throw new Error('La solicitud ha fallado')
        }
        return response.json();
    })
    .then(data => {

        //Añadimos nuevo array con un objeto que contiene ID + value del chiste
        listJokes.push(
            joke = {
            idJoke : data.id,
            valueJoke : data.value,
            }
        );

        //Añadimos / actualizamos el array en el localStorage
        localStorage.setItem("jokes", JSON.stringify(listJokes));

        //Mostramos elementos en el DOM
        containerItems.innerHTML += `
            <li id=${data.id}>
                ${data.value}
                <button id=${data.id} type="text" onclick="deleteJoke(event)">Eliminar chiste</button>
            </li>
        `;
    })
    .catch((error) => console.error('Error:', error));
}

buttonGetJoke.addEventListener('click', () => {
    getJoke();
});