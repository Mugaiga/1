document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  var fullName = document.getElementById("fullName").value;
  var phoneNumber = document.getElementById("phoneNumber").value;

  // Generate a unique code (For simplicity, this example uses a random number)
  var uniqueCode = Math.floor(Math.random() * 1000000);

  // Send notification to Munakyalo Agrofresh
  sendNotification(fullName, phoneNumber, uniqueCode);
});

function sendNotification(fullName, phoneNumber, uniqueCode) {
  // Twilio API credentials
  var accountSid = 'your_twilio_account_sid';
  var authToken = 'your_twilio_auth_token';
  var twilioPhoneNumber = 'your_twilio_phone_number';

  // Phone number to send the notification to
  var recipientPhoneNumber = phoneNumber;

  // Message body
  var messageBody = `Hello ${fullName}, your unique code for Munakyalo Agrofresh is: ${uniqueCode}`;

  // Send notification using Twilio API
  $.ajax({
    url: 'https://api.twilio.com/2010-04-01/Accounts/' + accountSid + '/Messages.json',
    type: 'POST',
    data: {
      'To': recipientPhoneNumber,
      'From': twilioPhoneNumber,
      'Body': messageBody
    },
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Basic " + btoa(accountSid + ":" + authToken));
    },
    success: function(data) {
      console.log("Notification sent successfully!");
      alert("Registration successful! Your unique code has been sent to your phone number.");
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.error("Error sending notification:", errorThrown);
      alert("Registration successful! However, there was an error sending the notification. Please try again later.");
    }
  });
}
