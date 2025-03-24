//fetch 
//bydefault the method is get 


//post
async function main(){
    const response=await fetch("https://jsonplaceholder.typicode.com/posts",{
        method:"PUT/POST/DELETE",
        body:{
              name:"ssas"
        },
        headers:{
            "Authorization":"Bearer 123",
        }
    });
}

async function getData2() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/1"); // Await the response
        const json = await response.json(); // Parse response as JSON
        console.log(json); // Log the data
    } catch (error) {
        console.error(error); // Error handling
    }
}

// Call the functions
getData1();
getData2();


// POST request using Fetch API
// Function to post data using Fetch API - Promise version
function postData1() {
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST", // Specify the method as POST
        body: JSON.stringify({
            title: "Hi", 
            body: "bar",
            userId: 1,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8", // Set content type
            "Authorization": "Bearer my token", // Set Authorization header
        },
    })
        .then(response => response.json()) // Parse the response as JSON
        .then(json => console.log(json)) // Log the response data
        .catch(error => console.error(error)); // Error handling
}

async function main() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'User-Agent': 'undici-stream-example',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
    // returns something like:
    // { title: 'foo', body: 'bar', userId: 1, id: 101 }
  }


//AXIOS
const axios=require("axios");
async function main(){
    const response=await axios.get("https://jsonplaceholder.typicode.com/posts",{
        body:{

        },
        headers:{

        }
    }
       
    );
    // no need to change into json format
    console.log(response.data.todos.length);
}

function getData1() {
    axios.get("https://jsonplaceholder.typicode.com/todos/1")
        .then((response) => console.log(response.data))
        .catch((error) => console.error(error));
}

// Function to fetch data using axios library - Async/Await version
async function getData2() {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

// Call the functions
getData1();
getData2();


// POST request using axios
// Function to post data using axios library - Promise version
function postData1() {
    axios.post("https://jsonplaceholder.typicode.com/posts", {
        title: "Hi",
        body: "bar",
        userId: 1
    }, {
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": "Bearer my token"
        }
    })
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error));
}

// Function to post data using axios library - Async/Await version
async function postData2() {
    try {
        /*
        const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
            title: "Hello",
            body: "bar",
            userId: 1
        }, {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer my token"
            }
        });
        */
        const response = await axios({
            url: "https://jsonplaceholder.typicode.com/posts",
            method: "POST",
            data: {
                title: "Hello",
                body: "bar",
                userId: 1
            },
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer my token"
            }   
        });

        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

// Call the functions
postData1();
postData2();
