$(document).ready(function() {
    // Test for placeholder support
    $.support.placeholder = (function() {
      var i = document.createElement("input");
      return "placeholder" in i;
    })();
  
    // Hide labels by default if placeholders are supported
    if ($.support.placeholder) {
      $(".form-label").each(function() {
        $(this).addClass("js-hide-label");
      });
  
      // Code for adding/removing classes here
      $(".form-group")
        .find("input, textarea")
        .on("keyup blur focus", function(e) {
          // Cache our selectors
          var $this = $(this),
            $parent = $this.parent().find("label");
  
          switch (e.type) {
            case "keyup":
              {
                $parent.toggleClass("js-hide-label", $this.val() == "");
              }
              break;
            case "blur":
              {
                if ($this.val() == "") {
                  $parent.addClass("js-hide-label");
                } else {
                  $parent
                    .removeClass("js-hide-label")
                    .addClass("js-unhighlight-label");
                }
              }
              break;
            case "focus":
              {
                if ($this.val() !== "") {
                  $parent.removeClass("js-unhighlight-label");
                }
              }
              break;
            default:
              break;
          }
        });
    }
  
    let name = document.getElementById("name");
    let emailAddress = document.getElementById("email");
    let subject = document.getElementById("subject");
    let message = document.getElementById("message");
    let sentEmailAlert = document.getElementById("sentEmail");
  
    document.getElementById("sendEmail").addEventListener("click", function() {
      if (
        name.validity.valid &&
        emailAddress.validity.valid &&
        subject.validity.valid &&
        message.validity.valid
      ) {
        sentEmailAlert.style.color = "black";
  
        Email.send({
          Host: "smtp.gmail.com",
          Username: "mail.algorithme@gmail.com",
          Password: "algoalgo",
          To: "info@algorithme.co",
          From: "mail.algorithme@gmail.com",
          Subject: "ALGORITHME: " + subject.value,
          Body:
            "Interestants name: " +
            name.value +
            "<br>" +
            "Message : <br>" +
            message.value +
            "<br>Answer to: " +
            emailAddress.value
        })
          .then(message => console.log(message))
          .then((sentEmailAlert.innerHTML = "Message sent!"));
  
        name.value = "";
        emailAddress.value = ""; ///clearing up all text fields in email form after sending email
        subject.value = "";
        message.value = "";
      } else {
        sentEmailAlert.style.color = "red";
        sentEmailAlert.innerHTML =
          "Email NOT sent, remember to use all fields correctly";
      }
    });
  });
  