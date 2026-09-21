const sports = {

    "Basketball": {
        fee: 2000,
        ages: ["U-14", "U-17"]
    },

    "Football": {
        fee: 2000,
        ages: ["U-14", "U-17"]
    },

    "Swimming Relay": {
        fee: 2000,
        ages: ["U-11", "U-14", "U-17"]
    },

    "Swimming Individual": {
        fee: 500,
        ages: ["U-11", "U-14", "U-17"]
    },

    "Badminton Singles": {
        fee: 500,
        ages: ["U-11", "U-14", "U-17"]
    },

    "Badminton Doubles": {
        fee: 1000,
        ages: ["U-11", "U-14", "U-17"]
    },

    "Table Tennis Singles": {
        fee: 500,
        ages: ["U-14", "U-17"]
    },

    "Table Tennis Doubles": {
        fee: 1000,
        ages: ["U-14", "U-17"]
    },

    "Volleyball": {
        fee: 2000,
        ages: ["U-14", "U-17"]
    },

    "Chess": {
        fee: 300,
        ages: ["U-11", "U-14", "U-17"]
    }

};


const sportsContainer =
    document.getElementById("sportsContainer");


const summaryBody =
    document.getElementById("summaryBody");


const totalAmount =
    document.getElementById("totalAmount");


/* CREATE SPORTS */

Object.entries(sports).forEach(
    ([sport, data], sportIndex) => {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "event-selector";


        wrapper.innerHTML = `

            <div class="event-title">

                <label class="sport-checkbox">

                    <input
                        type="checkbox"
                        class="sport-toggle"
                        data-sport="${sport}"
                    >

                    <span class="custom-checkbox"></span>

                    <div>

                        <strong>${sport}</strong>

                        <small>
                            ₹${data.fee.toLocaleString("en-IN")}
                        </small>

                    </div>

                </label>

            </div>


            <div
                class="age-options"
                id="ages-${sportIndex}"
            >

                <p>
                    Select categories and quantity:
                </p>

                ${data.ages.map(age => `

                    <div class="age-row">

                        <label>

                            <input
                                type="checkbox"
                                class="age-checkbox"
                                data-sport="${sport}"
                                data-age="${age}"
                            >

                            <span>
                                ${age}
                            </span>

                        </label>


                        <input
                            type="number"
                            min="1"
                            value="1"
                            disabled
                            class="quantity-input"
                            data-sport="${sport}"
                            data-age="${age}"
                        >

                    </div>

                `).join("")}

            </div>

        `;


        sportsContainer.appendChild(wrapper);

    }
);



/* SPORT TOGGLE */

document
    .querySelectorAll(".sport-toggle")
    .forEach(toggle => {

        toggle.addEventListener("change", () => {

            const sport =
                toggle.dataset.sport;


            const container =
                toggle.closest(".event-selector");


            const ageOptions =
                container.querySelector(".age-options");


            ageOptions.classList.toggle(
                "visible",
                toggle.checked
            );


            if (!toggle.checked) {

                container
                    .querySelectorAll(".age-checkbox")
                    .forEach(cb => {

                        cb.checked = false;

                    });


                container
                    .querySelectorAll(".quantity-input")
                    .forEach(input => {

                        input.disabled = true;

                    });

            }


            updateSummary();

        });

    });



/* AGE CHECKBOX */

document
    .querySelectorAll(".age-checkbox")
    .forEach(checkbox => {

        checkbox.addEventListener("change", () => {

            const sport =
                checkbox.dataset.sport;

            const age =
                checkbox.dataset.age;


            const quantity =
                document.querySelector(
                    `.quantity-input[data-sport="${sport}"][data-age="${age}"]`
                );


            quantity.disabled =
                !checkbox.checked;


            updateSummary();

        });

    });



/* QUANTITY */

document
    .querySelectorAll(".quantity-input")
    .forEach(input => {

        input.addEventListener(
            "input",
            updateSummary
        );

    });



/* SUMMARY */

function updateSummary() {

    summaryBody.innerHTML = "";

    let total = 0;

    let rowNumber = 1;

    let hasEvents = false;


    document
        .querySelectorAll(".age-checkbox:checked")
        .forEach(checkbox => {

            hasEvents = true;


            const sport =
                checkbox.dataset.sport;

            const age =
                checkbox.dataset.age;


            const quantityInput =
                document.querySelector(
                    `.quantity-input[data-sport="${sport}"][data-age="${age}"]`
                );


            const quantity =
                Math.max(
                    1,
                    parseInt(quantityInput.value) || 1
                );


            const fee =
                sports[sport].fee;


            const amount =
                fee * quantity;


            total += amount;


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${rowNumber}</td>

                <td>${sport}</td>

                <td>${age}</td>

                <td>${quantity}</td>

                <td>
                    ₹${fee.toLocaleString("en-IN")}
                </td>

                <td>
                    ₹${amount.toLocaleString("en-IN")}
                </td>

            `;


            summaryBody.appendChild(row);

            rowNumber++;

        });



    if (!hasEvents) {

        summaryBody.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="empty-row"
                >
                    No events selected yet.
                </td>

            </tr>

        `;

    }


    totalAmount.textContent =
        `₹${total.toLocaleString("en-IN")}`;

}



document
    .getElementById("registrationForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const selectedEvents = [];

        document
            .querySelectorAll(".age-checkbox:checked")
            .forEach(checkbox => {

                const sport = checkbox.dataset.sport;
                const age = checkbox.dataset.age;

                const quantity =
                    parseInt(
                        document.querySelector(
                            `.quantity-input[data-sport="${sport}"][data-age="${age}"]`
                        ).value
                    ) || 1;

                selectedEvents.push({
                    sport: sport,
                    age: age,
                    quantity: quantity,
                    rate: sports[sport].fee,
                    amount: quantity * sports[sport].fee
                });

            });

        if (selectedEvents.length === 0) {
            alert("Please select at least one sport and age category.");
            return;
        }

        const registration = {
            school: document.getElementById("schoolName").value,
            teacher: document.getElementById("teacherName").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            description: document.getElementById("description").value,
            events: selectedEvents,
            total: selectedEvents.reduce((sum, e) => sum + e.amount, 0)
        };

        localStorage.setItem("registrationData", JSON.stringify(registration));


        window.location.assign("review.html");
    });
