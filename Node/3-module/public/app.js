console.log("App loaded ...");

document.addEventListener("click", (event) => {
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id;

        // console.log(id);
        remove(id).then(() => {
            // event.target.parantNode.remove(); // может не сработать
            event.target.closest("li").remove();
        });
    } else if (event.target.dataset.type === "edit") {
        const id = event.target.dataset.id;
        const editNote = window.prompt("Введите новое название");

        if (editNote) {
            edit(id, {
                id: "" + id,
                title: editNote,
            }).then(() => location.reload());
        }
    }
});

async function remove(id) {
    await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, note) {
    await fetch(`/${id}`, {
        method: "PUT",
        body: JSON.stringify(note),
        headers: {
            "Content-Type": "application/json",
        },
    });
}
