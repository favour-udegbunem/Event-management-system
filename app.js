let localData = localStorage.getItem('attendeeRecords');
let attendeeRecords = !localData ? [] : JSON.parse(localData);
let btnAddAtendees = document.getElementById('btn-box');

btnAddAtendees.addEventListener('click', () => {
    let nameInput = document.getElementById('input');
    let name = nameInput.value.trim().toUpperCase();
    let expression = /^[a-zA-Z ]*$/
    if(name == ""){
        alert('input a name')
    } else if (!expression.test(name)) {
        nameInput.style.borderColor = 'red';
    } else{
        nameInput.style.borderColor = 'green';

    } let attenders = attendeeRecords.find(m => m.name.toUpperCase() == name);
        if (attenders) {
            alert(`Attendee: ${name} record already exist`)
        } else {
            let attendeeRecord = {  
                name,
                id: 'ATT/000' + (attendeeRecords.length + 1),
                age: {}
            };

            attendeeRecords.push(attendeeRecord);
            updateLocalStorage();
            alert('added successfully');
            nameInput.value = ""
        }
});

// Search of an attendees
let btnSearchAtendees = document.getElementById('btn');

btnSearchAtendees.addEventListener('click', () => {
    let searchinput = document.getElementById('input-1');
    let search = searchinput.value.trim().toUpperCase();
    let expression = /^[a-zA-Z ]*$/
    let name_1 = search;
    let id = 'ATT/000' + (attendeeRecords.length + 1);
    if(!expression.test(search)){
        searchinput.style.borderColor = 'red'
    }else{
        searchinput.style.borderColor = 'green'
    }
    if(search == ""){
        let resp = `<ul>
        <li>${search}: No result found...</li>
    </ul>`;
    document.getElementById('response').innerHTML = resp;
    } else{
        let attenders = attendeeRecords.find(m => m.name.toUpperCase() == search);
        if(!search){
            searchinput.style.borderColor = 'red'
        document.getElementById('response').innerHTML = resp;
        } else{
            let resp = `<ul>
            <li>${attenders.name} - ${attenders.id}: added already</li>
        </ul>`;
        document.getElementById('response').innerHTML = resp;
        }
    }
});

// Format and display all attendees:
// Create a function listAttendees that formats the list of attendees into a single string, separating names by commas (,) and adds "Attendees:" at the start of the list.

  // Get the modal
  let modal = document.getElementById("myModal");
  let listBtn = document.getElementById("myBtn");
  let span = document.getElementsByClassName("close")[0];
  listBtn.onclick = function(){
    modal.style.display = "block";
  }
  span.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

listBtn.addEventListener('click', () =>{
    let list = `<ul>`;
    attendeeRecords.forEach((attenders, index) =>{
        list += `<li>${attenders.name} - ${attenders.id}</li>`
    });
    list += `</ul>`;
    document.getElementById(`response-1`).innerHTML = list;
});

// Remove attendee

let btnRemove = document.getElementById('btn-bol');

btnRemove.addEventListener('click', () => {
    let input_3 = document.getElementById('input-3').value.trim().toUpperCase();
    let resp_3 = '';
    if(input_3 == ''){
        document.getElementById('response-3').innerHTML = resp_3;
        document.getElementById('response').innerHTML = '';
        document.getElementById('response-1').innerHTML = '';
        document.getElementById('response-2').innerHTML = '';
        } else {
            attendeeRecords.forEach((attenders, index) => {
                if (attenders.name.toUpperCase().includes(input_3) || attenders.id.toUpperCase().includes(input_3))
                    attendeeRecords.splice(index, 1);
                let resp_3 = `<p>Attendee removed successfully!</p>`
                document.getElementById('response-3').innerHTML = resp_3;
            });
        }
});

// For Local Storage
function updateLocalStorage() {
    localStorage.setItem('attendeeRecords', JSON.stringify(attendeeRecords));
};