function toggleDescription() {
    const description = document.getElementById("description");
    const title = document.getElementById("game-title");
    const button1 = document.getElementById("button1");
    const button2 = document.getElementById("button2");
    const arrow = document.getElementById("toggle-arrow");

    if (description.style.display === "none") {
        description.style.display = "block";
        title.style.display = "block";
        button1.style.display = "inline";
        button2.style.display = "inline";
        arrow.innerHTML = "&#8593;"; // Mũi tên lên
    } else {
        description.style.display = "none";
        title.style.display = "none";
        button1.style.display = "none";
        button2.style.display = "none";
        arrow.innerHTML = "&#8595;"; // Mũi tên xuống
    }
}