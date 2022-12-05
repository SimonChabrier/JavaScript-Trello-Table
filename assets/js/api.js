const api = {

init: () => {
    console.log('data init');
    
    //? API FETCH EXEMPLES
    // https://github.com/SimonChabrier/bikeManagementSystem/blob/main/public/assets/js/inventoryForm.js
},

//* LECTURE DES DONNEES
getCards: () => {
    // APi fetch cards
},

getColumns: async () => {
    //const location = window.location.origin;
    const endPoint = '/api/tasks';
    //const apiRootUrl = location + endPoint;
    const apiRootUrl = 'https://127.0.0.1:8000' + endPoint;

    let fetchOptions = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache'
    };
    try {
        response = await fetch(apiRootUrl, fetchOptions);
        data = await response.json();
    } catch (error){
        console.log(error);
    }
    console.log(data);
    tpl.setColumnTemplate(data);

    app.handleDragAndDrop();
    app.handleDeleteCard();
    app.handleCountBackLogCards();
    app.handleChangeCardColor();
    app.handleDesableCheckBoxOnEmptyCard();
    app.handleTaskDone();
    app.handleDisableDragOnActiveInputs();
    app.handleHideColorsBtnsOnDoneCards();
    app.handleGetColumnName();
    
},

//* OK
// TODO mettre la colonne backlog en BDD avec un id
postCard: async () => {
    //APi call POST
    const cardData = { 
        "task_title": "",
        "task_content": "",
        "task_done": false,
        "column_number": "0",
        "card_number": "",
        "card_color": "card--color--default",
        "textarea_height": "150"
    };

        const response = await fetch('https://127.0.0.1:8000/api/column/1/task', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(cardData)
        });
     
       const data = await response.json( );
     
       // now do whatever you want with the data  
        console.log(data);
},

//* OK
postColumn: async () => {     
    console.log('postColumns');


    const newColumn = document.getElementById('columns_container').lastChild;
    const newColumnNumber = newColumn.getAttribute('column_number');

    // Préparer le stockage des données
    // 3 - Envoyer les données au serveur
    const columnData = { 
        "column_name": "",
		"column_number": parseInt(newColumnNumber),
    };

        const response = await fetch('https://127.0.0.1:8000/api/column', {
            method: 'POST', 
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(columnData)
        });
     
       const data = await response.json( );
     
       // now do whatever you want with the data  
        console.log(data);
},

//* OK Manque la mise à jour du numéro de carte quand on les déplace il prend toujours la valeur 1
patchCard: async (cardId, title, content, done, column_number, card_number, card_color, textarea_height, columnId) => {         
    //APi call PUT

    done == null ? done = false : done = true;
    card_color == null ? card_color = 'card--color--default' : card_color = card_color;
    textarea_height == null ? textarea_height = '150' : textarea_height = textarea_height.replace('px', '');

    const cardData = { 
        "task_title": title,
        "task_content": content,
        "task_done": done,
		"column_number": column_number,
        "card_number": card_number,
        "card_color": card_color,
        "textarea_height": textarea_height,
    };
    console.log(columnId);
    // premier id = id de la colonne et le deuxième id = id de la carte
    // le param converter côté serveur permet de convertir l'id de la colonne et id de la carte
    // pour mettre à jour la relation oneToMany entre la carte et la colonne
    const response = await fetch('https://127.0.0.1:8000/api/' + columnId + '/task/' + cardId, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
    });

    const data = await response.json( );
    // now do whatever you want with the data  
    console.log(data);
},

//* OK
patchColumn: async (id) => {   
    console.log('patchColumn');                 
    //APi call PUT
    const columnData = { 
        column_name: 'Nouveau titre',
    };

    const response = await fetch('https://127.0.0.1:8000/api/column/' + id, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(columnData)
    });

    const data = await response.json( );
    // now do whatever you want with the data  
    console.log(data);
},

//* OK
deleteCard: async (id) => {                               
    //APi call DELETE
    await fetch('https://127.0.0.1:8000/api/task/' + id, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: null
    })
    .then(response => {
        return response.json( )
    })
    .then(data => 
        console.log(data) 
    ); 
},

//* OK
deleteColumns: async (id) => {                                          
    // APi call DELETE
    await fetch('https://127.0.0.1:8000/api/column/' + id, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: null
    })
    .then(response => {
        return response.json( )
    })
    .then(data => 
        console.log(data) 
    );
},

}   

document.addEventListener('DOMContentLoaded', api.init);