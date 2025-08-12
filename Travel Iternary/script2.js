function openPlanPage() {
   
    var days = document.getElementById("days").value;
    var destination = document.getElementById("destination").value;
  
   
    var url = "plan.html?days=" + days + "&destination=" + destination;
  
   
    window.open(url, "_blank");
  }