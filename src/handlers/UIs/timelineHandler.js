const thisWeek = () => {

    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    function getbigestSunPassed() { // lay ve ngay chu nhat gan nhat
        let curDay = new Date().getDay();
        let intDate = new Date() * 1 - (1000 * 60 * 60 * 24 * curDay); // ngay hien tai tru di so ngay da qua, tinh tu chu nhat gan nhat
        let bigestSun = new Date(intDate);
        return bigestSun;
    }

    function get6nextdays(day) { // lay ve ngay chi dinh va 6 ngay tiep theo
        let arr = [];
        arr.push(new Date(day)); // the first element of array is latest sunday for default.
        let dayConvert = new Date(day) * 1; // type converting from date to number.
        for (let i = 1; i <= 6; i++) {
            /**
             * 1 ngay 
             * = 24 (h) 
             * = 24 * 60 (m) 
             * = 24 * 60 * 60 (s) 
             * = 24 * 60 * 60 * 1000 (ms)
             */
            let index = 1000 * 24 * 60 * 60 * i; // i la he so, sau bao nhieu ngay thi tuong ung voi bay nhieu i
            let dayi = new Date(dayConvert + index) // tinh ra ngay sau ngay input
            arr.push(dayi);
        }

        arr = arr.map((item) => {
            return {
                date: new Date(item).getDate(),
                day: days[new Date(item).getDay()],
                isCurrent: new Date().getDate() == item.getDate() ? true : false
            }
        })

        return arr;
    }

    // new Date(value: number, string, date): Date;
    /**
     * Doi tuong Date, khi chay doc lap se co chuc nang nhu 1 ham, nhan vao 1 so, chuoi hoac 1 other date
     * va tra ve 1 date
     */

    return get6nextdays(getbigestSunPassed());

}

function calendarHeaderHandler() {
    let calendarHeader = document.getElementsByClassName('calendar-header')[0];
    thisWeek().forEach((ele) => {
        // header handler
        let dayHeader = document.createElement('div');
        dayHeader.className += ele.isCurrent ? 'day-header current-day' : 'day-header';

        let dayName = document.createElement('div');
        dayName.className += 'day-name';
        dayName.innerHTML = ele.day

        let dayNumber = document.createElement('div');
        dayNumber.className += 'day-number';
        dayNumber.innerHTML = ele.date

        dayHeader.appendChild(dayName);
        dayHeader.appendChild(dayNumber);

        // dashboard handler
        calendarHeader.appendChild(dayHeader);
    })
}


function clocking() {
    let timeColumn = document.getElementsByClassName('time-column')[0];
    let aDay = timeColumn.clientHeight;
    let time = new Date();
    let aHour = aDay / 24;

    return aHour * time.getHours() + (aHour / 60 * time.getMinutes()) + (aHour / 3600 * time.getSeconds());
}


function calendarGridHandler() {
    let calendarGrid = document.getElementsByClassName('calendar-grid')[0];

    // create timeline HTML element node
    let currentTimeLine = document.createElement('div');
    currentTimeLine.className += 'current-time-line';

    // create marker HTML element node
    let marker = document.createElement('div');
    marker.className += 'current-time-marker';

    currentTimeLine.appendChild(marker);

    // set marker posotion for default
    currentTimeLine.setAttribute('style', `top: ${clocking()}px`);

    // every single millisecond, reset marker posotion
    setInterval(() => {
        currentTimeLine.setAttribute('style', `top: ${clocking()}px`);
    }, 10);

    // loop days of week and append day collumns
    thisWeek().forEach((ele, index) => { // indexes are days of the week, begin at 0 (sunday).
        let dayColumn = document.createElement('div');
        dayColumn.className += 'day-column';

        if (ele.isCurrent) dayColumn.appendChild(currentTimeLine);

        let scrollTop = 0;

        // bat su kien scroll de lay chieu cao phan noi dung da scrool doc
        calendarGrid.addEventListener('scroll', (event) => {
            scrollTop = event.target.scrollTop
        })

        dayColumn.addEventListener('click', (event) => {

            let oneHour = event.target.clientHeight / 24 // 1h = allday / 24 (all day = day column height = event.target.clientHeight)
            let clientY = event.clientY + scrollTop /// vi tri click
            let offsetTop = event.target.offsetTop /// khoang cach tu phan tu duoc chon den top-page
            
            // get hour value when click each other position on day column.
            let hourChoosed = Math.floor((clientY - offsetTop) / oneHour);
            let hourInput = document.getElementById('startHour');
            hourInput.value = hourChoosed;
            
            // get day value when click into day column.
            let dayChoosed = document.getElementsByClassName('day-radio')[index];
            dayChoosed.checked = true;            

            let modalOverlay = document.getElementsByClassName('modal-create')[0];

            modalOverlay.className = 'modal-create modal-overlay';

        })

        // dashboard handler
        calendarGrid.appendChild(dayColumn);
    })
}

// DOM handler
export function timelineHandler() {
    calendarHeaderHandler();
    calendarGridHandler();
}