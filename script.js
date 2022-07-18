const country = document.querySelector('select');
const date = document.querySelector('#date');
const submit = document.querySelector('button');
const holidayTitle = document.querySelector('.holiday-title');
const holidayDesc = document.querySelector('.holiday-description');


const holiday = async () => {
    let countryId = country.value;
    let day = date.value.slice(0,2);
    let month = date.value.slice(3,5);
    let year = date.value.slice(6);
    
    const response = await fetch(`https://calendarific.com/api/v2/holidays?api_key=57d6d80a6a2c45e46583ff2577b957a5e0856bfa&country=${countryId}&year=${year}&month=${month}&day=${day}`);
    if(response.status === 200){
        const data = await response.json();
        return data;
    } else {
        throw new Error('Could not fetch the data...')
    }
}

submit.addEventListener('click', e => {
    holiday()
        .then(data => {
            const holiday = data.response.holidays;
            for(i = 0; i < holiday.length; i++ ){
                const name = holiday[i].name;
                const description = holiday[i].description;
                holidayTitle.style.display = "block";
                holidayTitle.innerText = name;
                holidayDesc.style.display = "block";
                holidayDesc.innerText = description;
            }
            console.log(holiday)
        })
});

