$(document).ready(function() {
  // Getting references to the name input and author container, as well as the table body
  var nameInput = $("#coin-name");
  var coinList = $("tbody");
  var coinContainer = $(".coin-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("submit", "#add-coin-form", handleCoinFormSubmit);
  $(document).on("click", ".delete-coin", handleDeleteButtonPress);

  // Getting the intiial list of Authors
  getCoins();

  // A function to handle what happens when the form is submitted to create a new Author
  function handleCoinFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    insertCoin({
      name: nameInput
        .val()
        .trim()
    });
  }

  // A function for creating an author. Calls getAuthors upon completion
  function insertCoin(coinData) {
    $.post("/api/coins", coinData)
      .then(getCoins);
  }

  // Function for creating a new list row for authors
  function createCoinRow(coinData) {
    var newTr = $("<tr>");
    newTr.data("coin", coinData);
    newTr.append("<td>" + coinData.name + "</td>");
    newTr.append("<td> " + coinData.Posts.length + "</td>");
    newTr.append("<td><a href='/blog?coin_id=" + coinData.id + "'>Go to Posts</a></td>");
    newTr.append("<td><a href='/cms?coin_id=" + coinData.id + "'>Create a Post</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-coin'>Delete Coin</a></td>");
    return newTr;
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getCoins() {
    $.get("/api/coins", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createCoinRow(data[i]));
      }
      renderCoinList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of authors to the page
  function renderCoinList(rows) {
    coinList.children().not(":last").remove();
    coinContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      coinList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("coin");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/coins/" + id
    })
    .done(getCoins);
  }
});
