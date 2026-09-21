const savedData = localStorage.getItem("registrationData");

console.log("SAVED DATA:", savedData);

if (!savedData) {

    alert("Registration information was not found.");

} else {

    const data = JSON.parse(savedData);


    /* SCHOOL DETAILS */

    document.getElementById("reviewSchool").textContent =
        data.school;

    document.getElementById("reviewTeacher").textContent =
        data.teacher;

    document.getElementById("reviewEmail").textContent =
        data.email;

    document.getElementById("reviewPhone").textContent =
        data.phone;


    /* EVENTS */

    const eventsContainer =
        document.getElementById("reviewEvents");

    eventsContainer.innerHTML = "";


    data.events.forEach(function(event) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${event.sport}</td>
            <td>${event.age}</td>
            <td>${event.quantity}</td>
            <td>₹${event.amount.toLocaleString("en-IN")}</td>
        `;

        eventsContainer.appendChild(row);

    });


    /* TOTAL */

    document.getElementById("reviewTotal").textContent =
        "₹" + data.total.toLocaleString("en-IN");

}


/* BACK TO EDIT */

function goBack() {

    window.location.href = "register.html";

}


/* PROCEED TO PAYMENT */

function confirmRegistration() {

    window.location.href = "payment.html";

}
