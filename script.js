let receiptNumber = Number(localStorage.getItem("receiptNumber")) || 1001;

let donations = JSON.parse(localStorage.getItem("donations")) || [];

function showDonations(list = donations) {

    const donationList = document.getElementById("donationList");

    donationList.innerHTML = "";

    let total = 0;

    list.forEach(function(donation) {

        total += Number(donation.amount);

        donationList.innerHTML += `
            <tr>
                <td>${donation.receipt}</td>
                <td>${donation.name}</td>
                <td>₹${donation.amount}</td>
                <td>${donation.payment}</td>
            </tr>
        `;
    });

    document.getElementById("totalAmount").textContent = total;
    document.getElementById("dashboardTotal").textContent = total;

document.getElementById("dashboardDonors").textContent = donations.length;

document.getElementById("dashboardReceipts").textContent = donations.length;
}

document.getElementById("donationForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;
    const amount = document.getElementById("amount").value;
    const address = document.getElementById("address").value;
    const payment = document.getElementById("payment").value;

    const donation = {
        receipt: receiptNumber,
        name: name,
        mobile: mobile,
        amount: amount,
        address: address,
        payment: payment
    };

    donations.push(donation);

    localStorage.setItem("donations", JSON.stringify(donations));

    receiptNumber++;

    localStorage.setItem("receiptNumber", receiptNumber);

    document.getElementById("receipt").innerHTML = `
        <div class="receipt-box">

            <h2>🙏 Ganesh Utsav 2026 🙏</h2>

            <h3>Donation Receipt</h3>

            <hr>

            <p><b>Receipt No:</b> ${donation.receipt}</p>

            <p><b>Name:</b> ${name}</p>

            <p><b>Mobile:</b> ${mobile}</p>

            <p><b>Amount:</b> ₹${amount}</p>

            <p><b>Address:</b> ${address}</p>

            <p><b>Payment:</b> ${payment}</p>

            <hr>

            <h3>🙏 Thank You For Your Donation 🙏</h3>

            <button class="print-btn" onclick="window.print()">
                🖨️ Print Receipt
            </button>

        </div>
    `;

    this.reset();

    showDonations();
});

document.getElementById("search").addEventListener("input", function() {

    const searchText = this.value.toLowerCase();

    const filtered = donations.filter(function(donation) {

        return donation.name.toLowerCase().includes(searchText);

    });

    showDonations(filtered);
});

showDonations();
function login() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {

        document.getElementById("loginBox").style.display = "none";
        document.getElementById("mainApp").style.display = "block";

    } else {

        document.getElementById("loginMessage").textContent =
            "❌ Wrong Username or Password";
    }
}
function exportCSV() {

    if (donations.length === 0) {
        alert("❌ Abhi koi donation record nahi hai.");
        return;
    }

    let csv = "Receipt No,Name,Mobile,Amount,Address,Payment\n";

    donations.forEach(function(donation) {

        csv += `${donation.receipt},${donation.name},${donation.mobile},${donation.amount},"${donation.address}",${donation.payment}\n`;

    });

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "Ganesh_Utsav_Donations.csv";

    link.click();

    URL.revokeObjectURL(url);
}