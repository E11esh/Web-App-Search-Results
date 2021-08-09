//<--Ellesh Keloth-->
'use strict'


// TASK - 1 : Call the Posts api 

const API_URL = ' https://jsonplaceholder.typicode.com/posts';
let datanotLoaded = true;
// variable 'raw' stores all data of first API GET call,
let raw;
// async funciton to get data
async function getapi(url, searchText) {
  
   // Storing response
   const response = await fetch(url);
  
  // Storing users data in form of JSON
  let users = await response.json();
  if (response) {
    statusLoading();
  }
   // Categorizing and adding prop category
  users.forEach(user => {
  if(user["id"]%3==0&&user["id"]%5==0)
    user.category ="Magic";
  else if(user["id"]%3==0&&user["id"]%5!=0)
    user.category = "Third";
  else 
    user.category = "Fifth";
  });  
    // Listing in Tab
   raw = users;
   show(users, searchText);
}
// Function to define innerHTML for HTML table
function show(data, searchText) {
  let i =1;
  let tab = 
      `<tr class="headRow">
        <th >  </th>
        <th >  </th>
        <th class="headCol">Category</th>
        <th class="headCol">ID</th>
        <th class="headCol">Title</th>
        <th   >Body</th>
       </tr>`;
  
  // Loop to access all rows 
    let classin="color";
    for (let r of data) {
        if(r.category=="Magic"){
        // console.log(r);
        //Adding row alternating colors
        if(classin=="color") 
          classin='plain';
        else classin="color";
          
        // Adding span tag for coloring searchText
        let arrayTitle = r.title.split(searchText);
        let arrayBody = r.body.split(searchText);
        let newTitle, newBody;
        
        if(arrayTitle.length>1)
          for(let i=0; i<arrayTitle.length;i++){
            if(i!=arrayTitle.length-1)
                newTitle+= arrayTitle[i]+`<span class='heilightText'>${searchText}</span>`;
            else newTitle+= arrayTitle[i];
            }
        else 
          newTitle = r.title;
        
        if(arrayBody.length>1)    
          for(let i=0; i<arrayBody.length;i++){
            if(i!=arrayBody.length-1)
                newBody+= arrayBody[i]+`<span class='heilightText'>${searchText}</span>`;
            else newBody+= arrayBody[i];
            }
        else
            newBody = r.body;    

        tab += `<tr class=${classin} id=${"r"+String(i++)}> 
        <td><span style="display:inline-block" onclick="this.parentNode.parentNode.style.display = 'none';"> &emsp;&#128465; </span></td>
        <td><span onclick="this.parentNode.parentNode.style.display = 'none';"> <img src="hide.jfif" width='15px' heigh='15px' style="display:inline-block">&emsp;</span></td>
        <td>${r.category}</td>
        <td>${r.id}&emsp; </td>
        <td>${newTitle}&emsp;</td>
        <td>${newBody}&emsp;</td>           
        </tr>`;
      }
  }
  // Setting innerHTML as tab variable
  document.getElementById("results").innerHTML = tab;
}

function statusLoading(){
  setTimeout( function(){
  document.getElementById('status').innerHTML = 'Loading.';}, 500);
  setTimeout( function(){
    document.getElementById('status').innerText = 'Loading..';}, 500);
  setTimeout( function(){
      document.getElementById('status').innerText = 'Loading...';}, 500);
  hideloader()
}

function hideloader() {
    document.getElementById('status').style.display = 'none';
    datanotLoaded =false;
}
// Shows all using Reset
function Reset(){
  getapi(API_URL,"");   
}

// Loading all to the page 
getapi(API_URL,"");


// User search request handler function
function search(){
  let searchText = document.getElementById("query").value;
  

  // Stroing searched key in cookies
  console.log(searchText);
  document.cookie = searchText;
  getapi(API_URL,searchText);
}



