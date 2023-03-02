const loadPhone = (searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhone(data.data, dataLimit))
}

const displayPhone = (phones, dataLimit) =>{
    // console.log(phones);
    const phoneContainer = document.getElementById('card-container');
    phoneContainer.innerHTML = '';

    // display 6 phone only and add show all button
    const showAllDiv = document.getElementById('show-all');
    if(dataLimit && phones.length > 6){
        phones = phones.slice(0, 6);
        showAllDiv.classList.remove('d-none')
    }else{
        showAllDiv.classList.add('d-none')
    }

    // display error text when no Phone Found
    const errorText = document.getElementById('error-text');
    if(phones.length === 0){
        errorText.classList.remove('d-none');
    }else{
        errorText.classList.add('d-none');
    }

    phones.forEach(phone => {
        // console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML =`
        <div class="card h-100 p-2">
        <img src="${phone.image}" class="card-img-top p-3 img-fluid" alt="...">
           <div class="card-body">
               <h5 class="card-title">${phone.phone_name}</h5>
               <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
               <!-- Button trigger modal -->
                 <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                 Details
               </button>
           </div>
        </div>
        `
        phoneContainer.appendChild(phoneDiv)
    });
    // stop loading
    loadingSpinner(false);
}



// ------------common function
const processing = (dataLimit) =>{
    // start loading
    loadingSpinner(true);

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText); 
    loadPhone(searchText, dataLimit);
}



// ---------------button click search field
const searchPhoneShow = () =>{
    processing(6);
}
// -------------------input field work when press enter
document.getElementById('search-field').addEventListener('keypress', function(e){
    
    if(e.key === 'Enter'){
        processing(6);
    }
})

// ------------------show all button
document.getElementById('showAllBtn').addEventListener('click', function(){
    processing();
})




const loadingSpinner = isLoading =>{
    const showLoading = document.getElementById('loading');
    if(isLoading){
        showLoading.classList.remove('d-none')
    }else{
        showLoading.classList.add('d-none')
    }
}


const loadPhoneDetails = (id) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = phone =>{
    console.log(phone);
    const title = document.getElementById('exampleModalLabel');
    title.innerText = `
    ${phone.name}
    `;
    const detailsDiv = document.getElementById('detailsDiv');
    detailsDiv.innerHTML = `
    <img src="${phone.image}" alt="">
    <p>Release Date: ${phone.releaseDate}</p>
    `
}


loadPhone('iphone');