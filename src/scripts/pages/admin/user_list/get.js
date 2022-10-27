const getUserListCallback = (data) => {
  const res = JSON.parse(data);
  const sentData = JSON.parse(res["data"]);

  if (res["status"] === 200) {
    let content = `
            <div id="user-list-table" class="header-list">
                <h3 class="list-left">Name</h3>
                <h3 class="list-center">Username</h3>
                <h3 class="list-right">Email</h3>
            </div> 
        `;

    sentData["rows"].forEach((item) => {
      content += `
            <div class="user-list-table">
                <p class="list-left">${item["name"]}</p>
                <p class="list-center">${item["username"]}</p>
                <p class="list-right">${item["email"]}</p>
            </div>
            `;
    });
    document.getElementById("pagination-content").innerHTML = content;

    // var listTable = document.getElementById('list-table');
    // var tbody = listTable.getElementsByTagName('tbody')[0];
    // tbody.innerHTML = sentData["rows"];

    var pageNumber = parseInt(sentData["page_number"]);
    var pageTotal = parseInt(sentData["page_total"]);

    document.getElementById("page-info").innerHTML = `Page ${pageNumber} of ${pageTotal}`;

    var prevButton = document.getElementById("pagination-prev-button");
    var nextButton = document.getElementById("pagination-next-button");

    if (pageNumber === 1) {
      prevButton.onclick = null;
      prevButton.disabled = true;
    } else {
      prevButton.disabled = false;
      prevButton.onclick = () => getUserList(pageNumber - 1);
    }

    if (pageNumber === pageTotal) {
      nextButton.disabled = true;
    } else {
      nextButton.disabled = false;
      nextButton.onclick = () => getUserList(pageNumber + 1);
    }
  } else {
    alert(res["message"]);
  }

  return;
};

const getUserList = (pageNumber = 1) => {
  try {
    const formData = new FormData();
    formData.append("page_number", pageNumber);
    request("POST", "/api/admin/user_list.php", formData, getUserListCallback);
    return;
  } catch (err) {
    alert(err);
  }
};

window.onload = getUserList(1);
